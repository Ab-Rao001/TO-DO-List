const express = require("express");
const Profile = require("../models/profile");
const router = express.Router();

// Get profile
router.get("/", async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: "default-user" });

    if (!profile) {
      profile = new Profile({ userId: "default-user" });
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// Update profile
router.put("/", async (req, res) => {
  try {
    const { name, email, avatar, bio } = req.body;

    let profile = await Profile.findOne({ userId: "default-user" });

    if (!profile) {
      profile = new Profile({ userId: "default-user" });
    }

    if (name) profile.name = name;
    if (email) profile.email = email;
    if (avatar) profile.avatar = avatar;
    if (bio) profile.bio = bio;

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Error updating profile" });
  }
});

module.exports = router;
