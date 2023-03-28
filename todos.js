var express = require("express");
var router = express.Router();
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

const generateUniqueId = () => {
  let unique = uuidv4();
  todos.map((item) => {
    if (item.id === unique) {
      unique = uuidv4();
    }
  });
  return unique;
};

const createToDoSchema = Joi.object({
  text: Joi.string().min(3).max(30).required().label("TO-DO text"),
});

const getToDobyIdSchema = Joi.object({
  id: Joi.string().min(36).max(36).required().label("TO-DO id"),
});

const updateTodoSchema = Joi.object({
  text: Joi.string().min(3).max(30).required().label("TO-DO text"),
  isCompleted: Joi.boolean().required().label("TO-DO isCompleted"),
});

let todos = [
  { id: uuidv4(), text: "Shop groceries", isCompleted: false },
  { id: uuidv4(), text: "Go to the cinema", isCompleted: false },
  { id: uuidv4(), text: "Buy gift for friend", isCompleted: true },
];

router.get("/", (req, res) => {
  res.json(todos);
});

router.get("/:id", (req, res) => {
  const { error, value } = getToDobyIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json(error);
  }

  res.status(201).json(todos.filter((todo) => todo.id == value.id));
});

router.post("/", (req, res) => {
  const { error, value } = createToDoSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  todos.push({
    id: generateUniqueId(),
    text: value.text,
    isCompleted: false,
  });
  return res.status(201).json(todos);
});

router.put("/:id", (req, res) => {
  const { error, value } = updateTodoSchema.validate(req.body);
  let deletedToDo = todos.findIndex((todo) => todo.id == req.params.id);

  if (deletedToDo < 0) {
    return res
      .status(400)
      .json(`Item with id ${req.params.id} does not exist.`);
  }

  if (error) {
    return res.status(400).json(error);
  }
  todos.splice(deletedToDo, 1);
  todos.push({
    id: generateUniqueId(),
    text: value.text,
    isCompleted: value.isCompleted,
  });

  return res.status(201).json(todos);
});

router.delete("/:id", (req, res) => {
  let deletedToDo = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(deletedToDo, 1);
  res.json(todos);
});

module.exports = router;
