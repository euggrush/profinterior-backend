"use strict";

const {
    DataTypes,
    Model
} = require(`sequelize`);
const Aliase = require(`./aliase`);

class Picture extends Model {}

const define = (sequelize) => Picture.init({
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: `Picture`,
    tableName: `pictures`
});

const defineRelations = ({
    Project,
    User
}) => {
    Picture.belongsTo(Project, {
        foreignKey: `article_id`
    });
    Picture.belongsTo(User, {
        as: Aliase.USERS,
        foreignKey: `user_id`
    });
};

module.exports = {
    define,
    defineRelations
};