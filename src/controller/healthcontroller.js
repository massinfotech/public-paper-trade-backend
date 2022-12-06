const express = require("express");
const healthController = express.Router();

healthController.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = healthController;
