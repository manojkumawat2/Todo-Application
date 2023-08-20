const { Sequelize } = require("sequelize");

const db = 'todo';
const username = 'admin';
const password = '12345678';
const host = 'localhost';

const sequelize = new Sequelize(db, username, password, {
    host: host,
    dialect: 'mysql'
});

module.exports = sequelize;
