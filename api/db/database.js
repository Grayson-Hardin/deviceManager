const { Client } = require("pg");

async function retrieveById(deviceId) {
  const client = await setUpConnection();
  const query = await client.query("SELECT * FROM devices WHERE id = $1", [
    deviceId,
  ]);

  return query.rows[0];
}

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
  const query = await client.query(`SELECT * FROM devices WHERE id = $1`, [id]);

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

  const deleteEntry = await client.query(`DELETE FROM devices WHERE id = $1`, [
    device_id,
  ]);

  return deleteEntry;
}
async function addEntry(firstName, lastName, deviceID, comments) {
  const client = await setUpConnection();

  const insertNewEntry = await client.query(
    `INSERT into devices (first_name, last_name, device_id, comments) values($1, $2, $3, $4);`,
    [firstName, lastName, deviceID, comments]
  );

  return insertNewEntry;
}

async function updateEntry(firstName, lastName, deviceID, comments, id) {
  const client = await setUpConnection();
  const updateEntry = await client.query(
    `UPDATE devices SET first_name=$1, last_name=$2, device_id=$3,comments=$4 WHERE id=$5`,
    [firstName, lastName, deviceID, comments, id]
  );
  return updateEntry;
}

module.exports = {
  retrieveRecords,
  isEntryInDB,
  deleteEntry,
  addEntry,
  updateEntry,
  retrieveById,
};
