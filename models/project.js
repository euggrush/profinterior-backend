/* eslint-disable new-cap */
/* eslint-disable camelcase */
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
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  pictures: DataTypes.STRING(1000)
}, {
  createdAt: false,
  updatedAt: false,
  sequelize,
  modelName: `Project`,
  tableName: `projects`
});

const defineRelations = ({
  Comment,
  Category,
  User
}) => {
  Project.hasMany(Comment, {
    as: Aliase.PICTURES,
    foreignKey: `project_id`,
    onDelete: `cascade`
  });
  Project.belongsToMany(Category, {
    through: Aliase.PROJECT_CATEGORIES,
    as: Aliase.CATEGORIES,
    foreignKey: `project_id`
  });
  Project.belongsTo(User, {
    as: Aliase.USERS,
    foreignKey: `user_id`
  });
};

module.exports = {
  define,
  defineRelations
};