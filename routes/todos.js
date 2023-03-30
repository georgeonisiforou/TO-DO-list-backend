var express = require("express");
var router = express.Router();
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

const ToDo = require("../models/todoModel");

const createToDoSchema = Joi.object({
  text: Joi.string().min(3).max(30).required().label("TO-DO text"),
});

const updateTodoSchema = Joi.object({
  text: Joi.string().min(3).max(30).required().label("TO-DO text"),
  isCompleted: Joi.boolean().required().label("TO-DO isCompleted"),
});

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(20).required().label("Username"),
  password: Joi.string().required(),
});

//get all todos
router.get("/", async (req, res) => {
  const todos = await ToDo.find();
  res.json(todos);
});

//get by id
router.get("/:id", async (req, res) => {
  let singleTodo = await ToDo.findById(req.params.id);
  res.status(201).json(singleTodo);
});

//create new todo
router.post("/", async (req, res) => {
  const { value, error } = createToDoSchema.validate(req.body);

  if (error) {
    return res.status(404).json(error);
  }

  const newTodo = new ToDo({
    text: value.text,
    isCompleted: false,
  });

  await newTodo.save();
  const todos = await ToDo.find();
  return res.status(201).json(todos);
});

//update by id
router.put("/:id", async (req, res) => {
  const { value, error } = updateTodoSchema.validate(req.body);

  if (error) {
    return res.status(404).json(error);
  }

  const updatedTodo = {
    text: value.text,
    isCompleted: value.isCompleted,
  };

  await ToDo.findByIdAndUpdate(req.params.id, updatedTodo, {
    returnDocument: "after",
  });
  const todos = await ToDo.find();
  return res.status(201).json(todos);
});

//delete by id
router.delete("/:id", async (req, res) => {
  await ToDo.deleteOne({ _id: req.params.id });
  const todos = await ToDo.find();
  return res.status(201).json(todos);
});

module.exports = router;
