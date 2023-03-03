const deviceFunctions = require("./personDatabase");
const { Client } = require("pg");

let client;

const graysonHardin = {
  id: 1,
  firstName: "Grayson",
  lastName: "Hardin",
  deviceId: "0213",
  comments: "misc",
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
    `DROP TABLE if exists devices;
    CREATE TABLE devices (id serial, device_id varchar(4), comments varchar(32));`
  );

  await client.query(
    `DROP TABLE if exists persons;
    CREATE TABLE persons (id serial, first_name varchar(32), last_name varchar(32), device_id varchar(4));`
  );

  await client.query(
    "insert into devices (device_id, comments) values($1, $2);",
    [graysonHardin.deviceId, graysonHardin.comments]
  );
  await client.query(
    "insert into devices (device_id, comments) values($1, $2);",
    [johnWick.deviceId, johnWick.comments]
  );

  await client.query(
    "insert into persons (first_name, last_name, device_id) values($1, $2, $3);",
    [graysonHardin.firstName, graysonHardin.lastName, graysonHardin.deviceId]
  );
  await client.query(
    "insert into persons (first_name, last_name, device_id) values($1, $2, $3);",
    [johnWick.firstName, johnWick.lastName, johnWick.deviceId]
  );
});
afterAll(async () => {
  await client.end();
});

it("should add a person to the person table in the database", async () => {
  const currentPersonRecords = await deviceFunctions.retrievePersonRecords();

  expect(currentPersonRecords.rows.length).toEqual(2);

  await deviceFunctions.addPerson("New Person", "New Person", "1234");

  const newPersonRecords = await deviceFunctions.retrievePersonRecords();

  expect(newPersonRecords.rows.length).toEqual(3);
});

it("should return all person records", async () => {
  const allPersonRecords = await client.query("SELECT * FROM persons");

  const actual = await deviceFunctions.retrievePersonRecords();

  expect(actual).toEqual(allPersonRecords);
});

it("should delete an entry from the person database", async () => {
  const allPersonRecords = await client.query("SELECT * FROM persons");

  expect(allPersonRecords.rows.length).toEqual(2);

  await deviceFunctions.deletePerson(1);

  const newPersonRecords = await client.query("SELECT * FROM persons");

  expect(newPersonRecords.rows.length).toEqual(1);
});
