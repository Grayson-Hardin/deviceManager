const express = require("express");
const _ = require("lodash");

const databaseFunctions = require("./db/database");
const personDatabaseFunctions = require("./db/personDatabase");

const app = express();
const port = 3001;
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/devices", async (req, res) => {
  const databaseCall = await databaseFunctions.retrieveRecords();

  const translateSnakeToCamel = camelCaseKeys(databaseCall);

  res.send(translateSnakeToCamel);
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

app.get("/devices/persons", async (req, res) => {
  const databaseCall = await personDatabaseFunctions.retrievePersonRecords();

  const translateSnakeToCamel = camelCaseKeys(databaseCall);

  res.send(translateSnakeToCamel);
});

app.get("/devices/:id", async (req, res) => {
  const databaseCall = await databaseFunctions.retrieveById(req.params.id);

  const translateSnakeToCamel = camelCaseKeys(databaseCall);

  res.send(translateSnakeToCamel);
});

app.delete("/devices", async (req, res) => {
  const id = req.body.id;
  await databaseFunctions.deleteEntry(id);

  res.status(204);
  res.send("Deleted");
});

app.post("/devices", async (req, res) => {
  await databaseFunctions.addEntry(
    req.body.firstName,
    req.body.lastName,
    req.body.deviceId,
    req.body.comments
  );

  res.status(201);
  res.send("Added");
});

app.post("/devices/person", async (req, res) => {
  await personDatabaseFunctions.addPerson(
    req.body.firstName,
    req.body.lastName
  );

  res.status(201);
  res.send("Added Person");
});

app.put("/devices", async (req, res) => {
  const databaseCall = await databaseFunctions.updateEntry(
    req.body.personId,
    req.body.deviceId,
    req.body.comments,
    req.body.id
  );

  const translateSnakeToCamel = camelCaseKeys(databaseCall);

  res.send(translateSnakeToCamel);
});

app.listen(port, () => {
  console.log("API Live");
});
