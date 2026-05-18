const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  priority: {
    type: String,
    default: "low"
  },
  imageUrl: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("Task", taskSchema);
