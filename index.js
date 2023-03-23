var express = require("express");
var cors = require("cors");
var app = express();

var todos = require("./todos.js");

app.use(cors());

app.use(express.json());

app.use("/todoItems", todos);

app.get("/", (req, res) => {
  res.send("test");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found!</h1>");
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error" });
});

app.listen(3001);
