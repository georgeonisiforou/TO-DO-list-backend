const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
