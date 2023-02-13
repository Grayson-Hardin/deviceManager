const express = require("express");
const databaseFunctions = require("../db/database");

const app = express();
const port = 3001;
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.post("/deviceManager", async (req, res) => {
  let databaseCall = await databaseFunctions.retrieveRecords();

  res.send(databaseCall);
});
app.listen(port, () => {
  console.log("API Live");
});
