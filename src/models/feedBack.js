const dbConnection = require("../config/database.js");
const { DataTypes } = require("sequelize");

const FeedBack = dbConnection.define("feedback", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: DataTypes.STRING,
    content: DataTypes.TEXT,
    },
    {
        freezeTableName: true, // Menambahkan opsi freezeTableName
        timestamps: true, // Menambahkan opsi timestamps
    }
);

module.exports = FeedBack;