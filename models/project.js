"use strict";

const {
  DataTypes,
  Model
} = require(`sequelize`);
const Aliase = require(`./aliase`);

class Project extends Model {}

const define = (sequelize) => Project.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  createdAt: `created_at`,
  updatedAt: false,
  sequelize,
  modelName: `Project`,
  tableName: `projects`
});

const defineRelations = ({
  Picture,
  Category
}) => {
  Project.hasMany(Picture, {
    as: Aliase.PHOTOS,
    foreignKey: `project_id`,
    onDelete: `cascade`
  });
  Project.belongsTo(Category, {
    as: Aliase.CATEGORIES,
    foreignKey: 'category_id'
  });

};

module.exports = {
  define,
  defineRelations
};