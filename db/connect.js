const { Client } = require("pg");

const client = new Client({
  database: "jobby",
  user: "postgres",
  password: "1234",
});

module.exports = client;
