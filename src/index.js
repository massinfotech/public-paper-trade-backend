const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const strategyController = require("./controller/strategycontroller");
const portfolioCotroller = require("./controller/portfoliocotroller");
const tradeController = require("./controller/tradecontroller");
const healthController = require("./controller/healthcontroller");

const dataProvider = require("./dataprovidercontroller/index");
const port = process.env.PORT || 3000;
const enable_dataapi = process.env.ENABLE_DATAAPI || "true";
const conn_string = process.env.DBCONNECTIONSTRING;

app.use(express.json());
//app.use(express.urlencoded({extended : true}));
app.use(cors());

console.log("process.env.PORT:", process.env.PORT);
console.log("port:", port);

app.use(helmet());

// app.use("/", (req, res, next) => {
//   next();
// });
app.use("/strategy", strategyController);
app.use("/portfolio", portfolioCotroller);
app.use("/trade", tradeController);
app.use("/health", healthController);
if (enable_dataapi == "true") {
  app.use("/data", dataProvider);
} else {
  app.use("/data", (req, res) => {
    res.status(404).json({ error: "Data endpoint is disabled" });
  });
}

app.use("/", express.static("public"));

if (conn_string) {
  mongoose.connect(
    conn_string,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (x) => {
      console.log("Service Started...");
    }
  );
} else {
  console.error("Empty connnection string!");
}

//app.use(require("./route"));
app.listen(port, function () {});
