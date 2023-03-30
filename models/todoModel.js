const mongoose = require("mongoose");
const User = require("../models/userModel");

const todoSchema = new mongoose.Schema({
  text: String,
  isCompleted: Boolean,
  // user_id: { type: mongoose.ObjectId, ref: User },
  user_id: String,
});

const ToDo = mongoose.model("ToDo", todoSchema);

module.exports = ToDo;
