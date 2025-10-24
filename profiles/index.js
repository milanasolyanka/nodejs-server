const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;

const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const { users } = require("./mockUsers");

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.json({ message: "I know no such user :(" });
  }

  if (!password === user.password) {
    return res.json({ message: "Your password is wrong :(" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.get("/", (req, res) => {
  console.log("Received a get request");
  res.send("Howdy, I am a server ;)");
});

app.get("/:id", (req, res) => {
  const profileId = req.params.id;
  console.log(`Received a get request for profile ID: ${profileId}`);
  res.send(`Howdy! You asked bout a person w profile id: ${profileId}`);
});

app.post("/:id", (req, res) => {
  const profileId = req.params.id;
  console.log(`Received a post request for profile ID: ${profileId}`);
  res.send(
    `Howdy, I jus received your POST request on a profile w id: ${profileId} ;)`
  );
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
