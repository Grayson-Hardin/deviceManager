const setupDatabaseFunctions = require("./setupDatabase");

async function addPerson(firstName, lastName) {
  const client = await setupDatabaseFunctions.setUpConnection();

  await client.query(
    `INSERT into persons(first_name, last_name) values($1, $2)`,
    [firstName, lastName]
  );

  await client.end();
}

async function retrievePersonRecords() {
  const client = await setupDatabaseFunctions.setUpConnection();

  const retrievePersons = await client.query("SELECT * from persons");

  await client.end();

  return retrievePersons;
}

module.exports = {
  retrievePersonRecords,
  addPerson,
};
