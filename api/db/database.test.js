const deviceFunctions = require("./database");
const { Client } = require("pg");

let client;

const graysonHardin = {
  firstName: "Grayson",
  lastName: "Hardin",
  deviceId: "0213",
  comments: "misc",
};

const johnWick = {
  firstName: "John",
  lastName: "Wick",
  deviceId: 0,
  comments: "yeah Im back",
};

beforeEach(async () => {
  client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "mysecretpassword",
    port: 5432,
  });

  await client.connect();

  await client.query(
    `DROP TABLE if exists devices;
    CREATE TABLE devices (first_name varchar(32), last_name varchar(32), id varchar(4), comments varchar(32));`
  );
  await client.query("insert into devices values($1, $2, $3, $4);", [
    graysonHardin.firstName,
    graysonHardin.lastName,
    graysonHardin.deviceId,
    graysonHardin.comments,
  ]);
  await client.query("insert into devices values($1, $2, $3, $4);", [
    johnWick.firstName,
    johnWick.lastName,
    johnWick.deviceId,
    johnWick.comments,
  ]);
});
afterAll(async () => {
  await client.end();
});

it("should return all records", async () => {
  const entireDBRecords = await client.query("SELECT * FROM devices");

  const actual = await deviceFunctions.retrieveRecords();

  expect(actual).toEqual(entireDBRecords);
});

it("should return false if first name is not in db", async () => {
  const actual = await deviceFunctions.isEntryInDB("Bob");
  expect(actual).toEqual(false);
});

it("should return false if device id is not in db", async () => {
  const actual = await deviceFunctions.isEntryInDB("asd12");

  expect(actual).toEqual(false);
});

it("should return true if device_id is in db", async () => {
  const actual = await deviceFunctions.isEntryInDB(graysonHardin.deviceId);

  expect(actual).toEqual(true);
});

it("should delete an entry from the database", async () => {
  const currentRecords = await deviceFunctions.retrieveRecords();

  expect(currentRecords.rows.length).toEqual(2);

  await deviceFunctions.deleteEntry("0");

  const newRecords = await deviceFunctions.retrieveRecords();
  expect(newRecords.rows.length).toEqual(1);
});

it("should add an entry to the database", async () => {
  const currentRecords = await deviceFunctions.retrieveRecords();

  expect(currentRecords.rows.length).toEqual(2);

  await deviceFunctions.addEntry("Frodo", "Baggins", 1, "Which way Gandalf?");

  const newRecords = await deviceFunctions.retrieveRecords();
  expect(newRecords.rows.length).toEqual(3);
});

it("should update entry in the database", async () => {
  const currentRecords = await deviceFunctions.retrieveRecords();

  const expectedId = graysonHardin.deviceId;
  expect(
    currentRecords.rows.find((device) => device.id === expectedId)
  ).toEqual({
    first_name: "Grayson",
    last_name: "Hardin",
    id: expectedId,
    comments: "misc",
  });

  await deviceFunctions.updateEntry("First", "Last", expectedId, "comments");

  const newRecords = await deviceFunctions.retrieveRecords();

  expect(newRecords.rows.find((device) => device.id === expectedId)).toEqual({
    first_name: "First",
    last_name: "Last",
    id: expectedId,
    comments: "comments",
  });
});

it("should return a single device when retrieveById is called", async () => {
  const actualValue = await deviceFunctions.retrieveById(
    graysonHardin.deviceId
  );

  expect(actualValue).toEqual(graysonHardin);
});
