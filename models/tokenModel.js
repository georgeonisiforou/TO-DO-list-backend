const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  user_id: mongoose.ObjectId,
  token: {
    type: String,
  },
  expire: Date,
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
