const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: String,
  isCompleted: Boolean,
  // user_id: mongoose.ObjectId,
});

const ToDo = mongoose.model("ToDo", todoSchema);

module.exports = ToDo;
