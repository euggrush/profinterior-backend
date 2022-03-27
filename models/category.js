"use strict";

const {
    DataTypes,
    Model
} = require(`sequelize`);
const Aliase = require(`./aliase`);

class Category extends Model {}

const define = (sequelize) => Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: `Category`,
    tableName: `categories`
});

const defineRelations = ({
    Project
}) => {
    Category.belongsToMany(Project, {
        through: Aliase.PROJECT_CATEGORIES,
        as: Aliase.PROJECTS,
        foreignKey: `category_id`
    });
};

module.exports = {
    define,
    defineRelations
};