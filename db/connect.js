const { Client } = require("pg");
require("dotenv").config();

const config = {
  dev: {
    database: "jobby",
    user: "postgres",
    password: process.env.DATABASE_PASSWORD,
  },
  prod: {
    connectionString: process.env.DB_URL,
  },
};

module.exports = new Client(process.env.DB_URL ? config.prod : config.dev);
