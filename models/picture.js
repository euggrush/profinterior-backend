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
    Project
}) => {
    Picture.belongsTo(Project, {
        as: Aliase.PROJECTS,
        foreignKey: `project_id`
    });
};

module.exports = {
    define,
    defineRelations
};