require("dotenv").config();
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
    currentPort: PORT,
  });
});

app.use(express.static("client/build"));


const UserController = require("./controllers/userController")
app.use("/api/user", UserController);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// db.sequelize.sync({force: true}).then(function () {
  db.sequelize.sync().then(function () {
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  });