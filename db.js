const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    dialect: "postgres",
    ssl: process.env.ENVIRONMENT === "production"
});

module.exports = sequelize;