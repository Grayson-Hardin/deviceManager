const deviceFunctions = require("./database");
const { Client } = require("pg");
let client;
beforeEach(async () => {
  client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "mysecretpassword",
    port: 5432,
  });

  await client.connect();

  await client.query(`DROP TABLE if exists devices;
    CREATE TABLE devices (first_name varchar(32), last_name varchar(32), id varchar(4), comments varchar(32));
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

it("should update entry in the database", async  () => {
  const currentRecords = await deviceFunctions.retrieveRecords();

  expect(currentRecords.rows[0]).toEqual({first_name: 'Grayson', last_name: 'Hardin', id: '0213', comments: 'misc'});

  await deviceFunctions.updateEntry()

  const newRecords = await deviceFunctions.retrieveRecords();

  expect(newRecords.rows[1]).toEqual({first_name: '1', last_name: '2', id: '3', comments: '4'})

})
