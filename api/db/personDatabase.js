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
async function deletePerson(person_id) {
  const client = await setupDatabaseFunctions.setUpConnection();

  await client.query(
    ` ALTER TABLE devices
  DROP CONSTRAINT fk_person
      , ADD  CONSTRAINT fk_person
  FOREIGN KEY(person_id) REFERENCES persons(person_id) ON DELETE CASCADE;`
  );

  await client.query(`DELETE FROM persons WHERE person_id = $1`, [person_id]);

  await client.end();
}

module.exports = {
  retrievePersonRecords,
  addPerson,
  deletePerson,
};
