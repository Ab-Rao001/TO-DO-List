require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/tasks", taskRoutes);
app.use("/upload", uploadRoutes);
mongoose.connect(
  "mongodb://127.0.0.1:27017/todoDB"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));
app.listen(5000, () => {
  console.log("Server running on port 5000");
});