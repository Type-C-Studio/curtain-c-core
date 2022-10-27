const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger");
const db = require("./models");

const users = require("./controllers/users.controller");
const jobs = require("./controllers/jobs.controller");

const app = express();
const PORT = process.env.PORT || 5000;
const pathApi = "/api";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(logger.requestLogger);

db.sequelize
  .sync() //{ force: true } reset database on save
  .then(() => {
    console.log("Synced db.");
    console.log("Enjoy !! 👾 🤖");
    console.log(`Curtain-c Server started... port ${PORT}`);
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// testing api
app.get(pathApi + "/", (req, res) => {
  res.json("Hello World form server Curtain-c");
});

// users api
{
  app.post(pathApi + "/users" + "/create", users.create);
  app.get(pathApi + "/users" + "/", users.findAll);
  app.get(pathApi + "/users" + "/:id", users.findOne);
  app.put(pathApi + "/users" + "/edit/:id", users.update);
  app.delete(pathApi + "/users" + "/delete/:id", users.delete);
}

// jobs api
{
  app.post(pathApi + "/jobs" + "/create", jobs.create);
  app.get(pathApi + "/jobs" + "/", jobs.findAll);
  app.get(pathApi + "/jobs" + "/:id", jobs.findOne);
  app.put(pathApi + "/jobs" + "/edit/:id", jobs.update);
  app.delete(pathApi + "/jobs" + "/delete/:id", jobs.delete);
}

// Run the server
app.listen(PORT, () => {
  console.log(`Curtain-c Server started... port ${PORT}`);
});
