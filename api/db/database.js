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

  const deleteEntry = await client.query(
    `DELETE FROM devices WHERE id = '${device_id}'`
  );

  return deleteEntry;
}
async function addEntry(firstName, lastName, deviceID, comments) {
  const client = await setUpConnection();

  const insertNewEntry = await client.query(
    `INSERT into devices values('${firstName}', '${lastName}', '${deviceID}', '${comments}');`
  );

  return insertNewEntry;
}


async function updateEntry(){
  const client = await setUpConnection();
  const updateEntry = await client.query(
      `UPDATE devices SET first_name='1', last_name='2', id='3', comments='4' WHERE id='0213'`
  );
  return updateEntry;
}
module.exports = { retrieveRecords, isEntryInDB, deleteEntry, addEntry, updateEntry };
