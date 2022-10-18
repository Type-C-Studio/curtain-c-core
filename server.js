const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger");
const db = require("./models");

const customers = require("./controllers/customers.controller");

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

// customer api
{
  app.post(pathApi + "/customers" + "/create", customers.create);
  app.get(pathApi + "/customers" + "/", customers.findAll);
  app.get(pathApi + "/customers" + "/:id", customers.findOne);
  app.put(pathApi + "/customers" + "/edit/:id", customers.update);
  app.delete(pathApi + "/customers" + "/delete/:id", customers.delete);
}

// Run the server
app.listen(PORT, () => {
  console.log(`Curtain-c Server started... port ${PORT}`);
});
