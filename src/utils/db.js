const { Sequelize } = require("sequelize");

const db = 'todo';
const username = process.env.DBUSERNAME ?? 'admin';
const password = process.env.DBPASSWORD ?? '12345678';
const host = process.env.DBHOST ?? 'localhost';

const sequelize = new Sequelize(db, username, password, {
    host: host,
    dialect: 'mysql'
});

module.exports = sequelize;
