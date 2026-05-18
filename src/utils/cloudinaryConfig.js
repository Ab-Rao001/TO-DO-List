const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dgsmr8olx',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'task_upload',
  uploadUrl: import.meta.env.VITE_UPLOAD_URL || 'http://localhost:5000/upload',
};

export default cloudinaryConfig;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(cloudinaryConfig.uploadUrl, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Upload failed (${response.status})`);
  }

  if (!data.secure_url) {
    throw new Error('Upload succeeded but no image URL was returned');
  }

  return data.secure_url;
};
