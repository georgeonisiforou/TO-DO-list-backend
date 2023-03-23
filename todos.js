var express = require("express");
var router = express.Router();
const Joi = require("joi");

const createToDoSchema = Joi.object({
  id: Joi.number(),
  text: Joi.string().min(3).max(30).required().label("TO-DO text"),
  isCompleted: Joi.boolean(),
});

let todos = [
  { id: 1, text: "Shop groceries", isCompleted: false },
  { id: 2, text: "Go to the cinema", isCompleted: false },
  { id: 3, text: "Buy gift for friend", isCompleted: true },
];

// function isLoggedIn(req, res, next) {
//   if (req.headers.authorization === "Bearer test") {
//     next();
//   } else {
//     res.status(401).send("Unauthorized");
//   }
// }

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
}

router.get(
  "/",

  (req, res) => {
    res.send(todos);
    next();
  },
  errorHandler
);

router.get("/:id", (req, res) => {
  res.status(200).json(todos.filter((todo) => todo.id == req.params.id));
});

router.post("/", (req, res) => {
  const { error, value } = createToDoSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  todos.push(value);
  return res.status(201).json(todos);
});

router.put("/:id", (req, res) => {
  const { error, value } = createToDoSchema.validate(req.body);
  // let editedTodo = todos.find((todo) => todo.id == req.params.id);
  // console.log(editedTodo);
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
  // editedTodo = req.body;
  todos.push(value);

  return res.status(201).json(todos);
});

router.delete("/:id", (req, res) => {
  let deletedToDo = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(deletedToDo, 1);
  res.send(todos);
});

module.exports = router;
