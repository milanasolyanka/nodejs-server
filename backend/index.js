const express = require("express");
const sequelize = require("./db");
const User = require("./user");

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

const start = async () => {
  let connected = false;
  while (!connected) {
    try {
      await sequelize.authenticate();
      connected = true;
      console.log("Database connected!");
    } catch (e) {
      console.log("Waiting for MySQL...");
      await new Promise((r) => setTimeout(r, 3000));
    }
  }

  await sequelize.sync({ force: true });
  app.listen(3000, () => console.log("Server started"));
};

start();
