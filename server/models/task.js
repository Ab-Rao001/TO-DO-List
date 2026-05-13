const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  priority: {
    type: String,
    default: "low"
  }
});

module.exports = mongoose.model("Task", taskSchema);