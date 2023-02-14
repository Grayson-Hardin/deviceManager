const express = require("express");
const _ = require("lodash");

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

const camelCaseKeys = (obj) => {
  if (!_.isObject(obj)) {
    return obj;
  } else if (_.isArray(obj)) {
    return obj.map((v) => camelCaseKeys(v));
  }
  return _.reduce(
    obj,
    (r, v, k) => {
      return {
        ...r,
        [_.camelCase(k)]: camelCaseKeys(v),
      };
    },
    {}
  );
};

app.post("/deviceManager", async (req, res) => {
  let databaseCall = await databaseFunctions.retrieveRecords();

  const translateSnakeToCamel = camelCaseKeys(databaseCall);

  res.send(translateSnakeToCamel);
});

app.post("/deleteEntry", async (req, res) => {
  let id = req.body.id;
  await databaseFunctions.deleteEntry(id);
});
app.listen(port, () => {
  console.log("API Live");
});
