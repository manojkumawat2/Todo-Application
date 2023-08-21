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

User.doesEmailAlreadyExist = async (email) => {
    if (!email) {
        return Promise.resolve(false);
    }

    const user = await User.findOne({
        where: {
            email: email
        },
        attributes: ['id']
    });

    return Promise.resolve(!!user);
}

module.exports = User;