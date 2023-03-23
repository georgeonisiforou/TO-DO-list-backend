var express = require("express");
var router = express.Router();

const catObj = [
  {
    name: "Denzel",
    age: 1,
    breed: "Domestic Longhair",
  },
];

const patsalou = {
  name: "Patsalou",
  age: 5,
  breed: "Tiger",
};

router.get("/", (req, res) => {
  res.send(catObj);
});

// router.get("/:cat", (req, res, next) => {
//   if (req.params.cat === "Denzel") {
//     res.send(catObj);
//   } else if (req.params.cat === "Patsalou") {
//     res.send(patsalou);
//   } else {
//     res.send("The cat you requested is unknown");
//   }
//   next();
// });

function isLoggedIn(req, res, next) {
  console.log(req.body);
  if (req.headers.authorization === "Bearer test") {
    console.log(req.headers);
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

router.get("/all", isLoggedIn, (req, res) => {
  res.write("Hi");
  res.write(" ");
  res.write(`${patsalou.name}`);
  res.send();
});

module.exports = router;
