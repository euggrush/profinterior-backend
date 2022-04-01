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
    name: {
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
    // Picture,
    // Project
}) => {
    // User.hasMany(Project, {
    //     as: Aliase.PROJECTS,
    //     foreignKey: `user_id`
    // });
    // User.hasMany(Picture, {
    //     as: Aliase.PHOTOS,
    //     foreignKey: `user_id`
    // });
};

module.exports = {
    define,
    defineRelations
};