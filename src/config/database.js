// const mysql = require("mysql2");
const sequelize = require("sequelize");
require("dotenv").config();

const dbConnection = new sequelize.Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

module.exports = dbConnection;
