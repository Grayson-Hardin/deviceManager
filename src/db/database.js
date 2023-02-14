const { Client } = require("pg");

async function setUpConnection() {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "mysecretpassword",
    port: 5432,
  });

  await client.connect();
  return client;
}

async function isEntryInDB(id) {
  const client = await setUpConnection();
  const query = await client.query(`SELECT * FROM devices WHERE id = '${id}'`);

  if (query.rows[0] === undefined) {
    return false;
  }
  return true;
}

async function retrieveRecords() {
  const client = await setUpConnection();
  const retrieveRecords = await client.query("SELECT * FROM devices");

  await client.end();

  return retrieveRecords;
}

async function deleteEntry(device_id) {
  const client = await setUpConnection();

  client.query(`DELETE FROM devices WHERE id = '${device_id}'`);
  // return await client.query(`DELETE FROM devices WHERE id = '${device_id}'`);
}
module.exports = { retrieveRecords, isEntryInDB, deleteEntry };
