var express = require("express");
var router = express.Router();

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
  res.send(todos.filter((todo) => todo.id == req.params.id));
});

router.post("/", (req, res) => {
  todos.push(req.body);
  res.send(todos);
});

router.put("/:id", (req, res) => {
  let editedTodo = todos.find((todo) => todo.id == req.params.id);
  let deletedToDo = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(deletedToDo, 1);
  editedTodo = req.body;
  todos.push(editedTodo);

  res.send(todos);
});

router.delete("/:id", (req, res) => {
  let deletedToDo = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(deletedToDo, 1);
  res.send(todos);
});

module.exports = router;
