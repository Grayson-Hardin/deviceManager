const setupDatabaseFunctions = require("./setupDatabase");

async function retrieveById(deviceId) {
  const client = await setupDatabaseFunctions.setUpConnection();
  const query = await client.query(
    "SELECT * FROM devices as d INNER JOIN persons as p ON d.person_id = p.person_id WHERE d.id = $1",
    [deviceId]
  );

  return query.rows[0];
}

async function isEntryInDB(id) {
  const client = await setupDatabaseFunctions.setUpConnection();
  const query = await client.query(`SELECT * FROM devices WHERE id = $1`, [id]);

  if (query.rows[0] === undefined) {
    return false;
  }

  await client.end();

  return true;
}

async function retrieveRecords() {
  const client = await setupDatabaseFunctions.setUpConnection();
  const retrieveRecords = await client.query(
    "SELECT p.first_name, p.last_name, d.device_id, d.comments, d.id from persons as p JOIN devices as d ON p.person_id = d.person_id"
  );
  console.log(retrieveRecords);
  await client.end();

  return retrieveRecords;
}

async function deleteEntry(device_id) {
  const client = await setupDatabaseFunctions.setUpConnection();

  await client.query(`DELETE FROM devices WHERE id = $1`, [device_id]);

  await client.query(`DELETE FROM persons WHERE id = $1`, [device_id]);

  await client.end();
}

async function addEntry(firstName, lastName, deviceID, comments) {
  const client = await setupDatabaseFunctions.setUpConnection();

  await client.query(
    `INSERT into devices (device_id, comments, person_id) values($1, $2,(SELECT person_id FROM persons as p WHERE p.last_name  = 'Hardin'));`,
    [deviceID, comments]
  );

  await client.query(
    `INSERT into persons (first_name, last_name) values($1, $2);`,
    [firstName, lastName]
  );

  await client.end();
}

async function updateEntry(firstName, lastName, deviceID, comments, id) {
  const client = await setupDatabaseFunctions.setUpConnection();

  await client.query(
    `UPDATE devices SET device_id=$1,comments=$2 WHERE id=$3`,
    [deviceID, comments, id]
  );

  await client.query(
    `UPDATE persons SET first_name=$1, last_name=$2 WHERE id=$3`,
    [firstName, lastName, id]
  );

  await client.end();
}

module.exports = {
  retrieveRecords,
  isEntryInDB,
  deleteEntry,
  addEntry,
  updateEntry,
  retrieveById,
};
