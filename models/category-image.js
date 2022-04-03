"use strict";

const {
    DataTypes,
    Model
} = require(`sequelize`);
const Aliase = require(`./aliase`);

class CategoryImage extends Model {}

const define = (sequelize) => CategoryImage.init({
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: `CategoryImage`,
    tableName: `category_images`
});

const defineRelations = ({
    Category
}) => {
    CategoryImage.belongsTo(Category, {
        as: Aliase.CATEGORIES,
        foreignKey: `category_id`
    });
};

module.exports = {
    define,
    defineRelations
};