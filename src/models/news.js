const dbConnection = require("../config/database.js");
const { DataTypes } = require('sequelize');
// const sequelize = require('../sequelize');

const News = dbConnection.define("news",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    urlToImage: DataTypes.STRING,
    publishedAt: DataTypes.DATE,
    content: DataTypes.TEXT,
    category: DataTypes.STRING,
  },
  {
    freezeTableName: true, // Menambahkan opsi freezeTableName
    timestamps: false, // Menambahkan opsi timestamps
  }
);

module.exports = News;
