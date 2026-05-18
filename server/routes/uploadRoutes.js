const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dgsmr8olx";
const apiKey = process.env.CLOUDINARY_API_KEY || "545341736783529";
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || "task_upload";

if (apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

const uploadBufferSigned = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "task-board", resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

const uploadBufferUnsigned = async (buffer, originalname, mimetype) => {
  const formData = new FormData();
  const blob = new Blob([buffer], { type: mimetype || "image/jpeg" });
  formData.append("file", blob, originalname || "upload.jpg");
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Unsigned upload failed");
  }

  return data;
};

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  try {
    const result = apiSecret
      ? await uploadBufferSigned(req.file.buffer)
      : await uploadBufferUnsigned(
          req.file.buffer,
          req.file.originalname,
          req.file.mimetype
        );

    res.json({
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    const message = error.message || "Image upload failed";

    if (!apiSecret && message.toLowerCase().includes("preset")) {
      return res.status(500).json({
        error:
          'Create an unsigned upload preset named "task_upload" in Cloudinary (Settings → Upload → Upload presets), or add CLOUDINARY_API_SECRET to server/.env.',
      });
    }

    console.error("Cloudinary upload error:", error);
    res.status(500).json({ error: message });
  }
});

module.exports = router;
