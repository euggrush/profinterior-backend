/* eslint-disable camelcase */
"use strict";

const {
    DataTypes,
    Model
} = require(`sequelize`);
const Aliase = require(`./aliase`);

class User extends Model {}

const define = (sequelize) => User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: `user`,
        allowNull: false
    }
}, {
    createdAt: `created_at`,
    updatedAt: false,
    sequelize,
    modelName: `User`,
    tableName: `users`
});

const defineRelations = ({
    Comment,
    Project
}) => {
    User.hasMany(Project, {
        as: Aliase.PROJECTS,
        foreignKey: `user_id`
    });
    User.hasMany(Comment, {
        as: Aliase.COMMENTS,
        foreignKey: `user_id`
    });
};

module.exports = {
    define,
    defineRelations
};