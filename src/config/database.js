// const mysql = require("mysql2");
const sequelize = require("sequelize");
require("dotenv").config();

const dbConnection = new sequelize.Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    dialect: "mysql",
    port: process.env.MYSQLPORT,
  }
);

module.exports = dbConnection;
