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

module.exports = {
  setUpConnection,
};
