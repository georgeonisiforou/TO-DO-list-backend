const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const router = express.Router();
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const Token = require("../models/tokenModel");
const randomToken = require("random-token");

const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required().label("Username"),
  password: Joi.string().required(),
});

router.post("/sign-up", async (req, res) => {
  try {
    const { value, error } = createUserSchema.validate(req.body);

    if (error) {
      return res.status(404).json(error);
    }
    // Check if the email is already in use
    let userExists = await User.findOne({ username: value.username });
    if (userExists) {
      res.status(401).json({ message: "Username is already in use." });
      return;
    }
    // Define salt rounds
    const saltRounds = 10;
    // Hash password
    bcrypt.hash(value.password, saltRounds, (err, hash) => {
      if (err) throw new Error("Internal Server Error");
      // Create a new user
      let user = new User({
        username: value.username,
        password: hash,
      });

      // Save user to database
      user.save().then(() => {
        res.json({ message: "User created successfully", user });
      });
    });
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    // Extract email and password from the req.body object
    const { value, error } = createUserSchema.validate(req.body);

    if (error) {
      return res.status(404).json(error);
    }
    // Check if user exists in database
    let user = await User.findOne({ username: value.username });
    if (!user) {
      return res.status(401).json({
        message: `There is no user with username ${value.username}. Please try with another username.`,
      });
    }
    // Compare passwords
    bcrypt.compare(value.password, user.password, (err, result) => {
      if (result) {
        return res.status(200).json({ message: "User Logged in Successfully" });
      }
      console.log(err);
      return res.status(401).json({ message: "Invalid Credentials" });
    });

    var newToken = randomToken(16);

    let token = new Token({
      user_id: user._id,
      token: newToken,
      expire: Date.now() + 1000 * 60,
    });

    token.save();
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.get("/sign-in", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.get("/sign-in/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
});

module.exports = router;
