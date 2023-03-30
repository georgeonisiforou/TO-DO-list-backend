const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: String,
  isCompleted: Boolean,
});

const ToDo = mongoose.model("ToDo", todoSchema);

module.exports = ToDo;
