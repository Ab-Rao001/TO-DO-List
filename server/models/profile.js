const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      default: "default-user",
    },
    name: {
      type: String,
      default: "User",
    },
    email: {
      type: String,
      default: "user@example.com",
    },
    avatar: {
      type: String,
      default: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%234a90e2"/%3E%3Ccircle cx="50" cy="35" r="15" fill="white"/%3E%3Cpath d="M 30 65 Q 30 55 50 55 Q 70 55 70 65 L 70 75 Q 70 85 50 85 Q 30 85 30 75 Z" fill="white"/%3E%3C/svg%3E',
    },
    bio: {
      type: String,
      default: "Task Manager Pro",
    },
    joinDate: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
