const dbConnection = require("../config/database.js");
const { DataTypes } = require("sequelize");

const Comments = dbConnection.define(
  "comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    comment: DataTypes.TEXT,
    news_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "news",
        key: "id",
        onDelete: "CASCADE",
      },
    },
  },
  {
    freezeTableName: true, // Menambahkan opsi freezeTableName
    timestamps: true, // Menambahkan opsi timestamps
  }
);

module.exports = Comments;
