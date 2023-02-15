const deviceFunctions = require("../db/database");
const { Client } = require("pg");
let client;
beforeAll(async () => {
  client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "mysecretpassword",
    port: 5432,
  });

  await client.connect();

  await client.query(`DROP TABLE if exists devices;
    CREATE TABLE devices (firstName varchar(32), lastName varchar(32), id varchar(4), description varchar(32));
    insert into devices values('Grayson', 'Hardin', '0213', 'misc');
    insert into devices values('John', 'Wick', '0', 'yeah Im back');`);
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
  const actual = await deviceFunctions.isEntryInDB("0213");

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

// it("should delete entry from database first example", async () => {
//   const entireDBRecords = await client.query("SELECT * FROM devices");
//
//   await deviceFunctions.deleteEntry("0213");
//
//   const newDBRecords = await client.query("SELECT * FROM devices");
//
//   expect(entireDBRecords.rows[0]).not.toEqual(newDBRecords.rows[0]);
// });

// it("should delete entry from database second example", async () => {
//   const actual = await client.query("SELECT * FROM devices");
//
//   const entireDBRecords = await deviceFunctions.retrieveRecords();
//
//   expect(actual.rows[0]).toEqual(entireDBRecords);
//
//   await deviceFunctions.deleteEntry("0213");
//
//   expect(actual.rows[0]).not.toEqual(entireDBRecords);
// });

// it("should add entry to database", async () => {
//   const actual = await client.query("SELECT * FROM devices");
//
//   const entireDBRecords = await deviceFunctions.retrieveRecords();
//
//   expect(actual.rows[0]).toEqual(entireDBRecords);
//
//   await deviceFunctions.addEntry();
//
//   expect(actual);
// });
