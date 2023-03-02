const deviceFunctions = require("./database");
const { Client } = require("pg");

let client;

const graysonHardin = {
  id: 1,
  firstName: "Grayson",
  lastName: "Hardin",
  deviceId: "0213",
  comments: "misc",
  person_id: 1,
};

const johnWick = {
  id: 2,
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
    `DROP TABLE if exists devices cascade;
    CREATE TABLE devices (id serial PRIMARY KEY, device_id varchar(4), comments varchar(32), person_id integer, CONSTRAINT fk_person FOREIGN KEY(person_id) REFERENCES  persons(person_id));`
  );

  await client.query(
    "insert into devices (device_id, comments, person_id) values($1, $2, (SELECT person_id FROM persons as p WHERE p.last_name  = 'Hardin'));",
    [graysonHardin.deviceId, graysonHardin.comments]
  );

  await client.query(
    "insert into devices (device_id, comments, person_id) values($1, $2, (SELECT person_id FROM persons as p WHERE p.last_name  = 'Wick'));",
    [johnWick.deviceId, johnWick.comments]
  );

  await client.query(
    `DROP TABLE if exists persons cascade;
    CREATE TABLE persons (person_id serial PRIMARY KEY , first_name varchar(32), last_name varchar(32), id serial);`
  );
  await client.query(
    "insert into persons (first_name, last_name) values($1, $2);",
    [graysonHardin.firstName, graysonHardin.lastName]
  );
  await client.query(
    "insert into persons (first_name, last_name) values($1, $2);",
    [johnWick.firstName, johnWick.lastName]
  );
});
afterAll(async () => {
  await client.end();
});

it("should return all records", async () => {
  const entireDBRecords = await client.query(
    "SELECT p.first_name, p.last_name, device_id, comments, d.id from persons as p JOIN devices as d ON p.person_id = d.person_id"
  );

  const actual = await deviceFunctions.retrieveRecords();

  expect(actual).toEqual(entireDBRecords);
});

it("should return false if id is not in db", async () => {
  const actual = await deviceFunctions.isEntryInDB(3);
  expect(actual).toEqual(false);
});

it("should return true if id is in db", async () => {
  const actual = await deviceFunctions.isEntryInDB(graysonHardin.id);

  expect(actual).toEqual(true);
});

it("should delete an entry from the database", async () => {
  const currentRecords = await deviceFunctions.retrieveRecords();

  expect(currentRecords.rows.length).toEqual(2);

  await deviceFunctions.deleteEntry(graysonHardin.id);

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

  const expectedId = graysonHardin.id;

  expect(currentRecords.rows.find((row) => row.id === expectedId)).toEqual({
    first_name: graysonHardin.firstName,
    last_name: graysonHardin.lastName,
    device_id: graysonHardin.deviceId,
    comments: graysonHardin.comments,
    id: graysonHardin.id,
  });

  await deviceFunctions.updateEntry("Walter", "White", "308", "New Mexico", 1);

  const newRecords = await deviceFunctions.retrieveRecords();

  expect(newRecords.rows.find((device) => device.id === expectedId)).toEqual({
    first_name: "Walter",
    last_name: "White",
    device_id: "308",
    comments: "New Mexico",
    id: 1,
  });
});

it("should return a single device when retrieveById is called", async () => {
  const actualValue = await deviceFunctions.retrieveById(graysonHardin.id);

  const expected = {
    id: graysonHardin.id,
    first_name: graysonHardin.firstName,
    last_name: graysonHardin.lastName,
    device_id: graysonHardin.deviceId,
    comments: graysonHardin.comments,
    person_id: graysonHardin.person_id,
  };

  expect(actualValue).toEqual(expected);
});
