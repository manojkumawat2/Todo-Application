const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Task = require("./task.model");

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'users',
});

User.hasMany(Task);
Task.belongsTo(User);

module.exports = User;