const express = require("express");
const app = express();
const port = 3002;

const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

app.get("/secure", authCheck, (req, res) => {
  res.send(`Hello, my dear ${req.user.username}!`);
});

app.get("/", (req, res) => {
  console.log("Received a get request for /");
  res.send("Ahh, it will be a long story bout me ;)");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

function authCheck(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.send("You really should authorise first");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.send("You really should authorise first");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.send("Invalid token, please login again");
    }
    req.user = user;
    next();
  });
}
