"use strict";

const PictureModel = require(`./picture`);
const ProjectModel = require(`./project`);
const CategoryModel = require(`./category`);
const UserModel = require(`./user`);


const define = (sequelize) => {
    const Picture = PictureModel.define(sequelize);
    const Project = ProjectModel.define(sequelize);
    const Category = CategoryModel.define(sequelize);
    const User = UserModel.define(sequelize);

    [CategoryModel, PictureModel, ProjectModel, UserModel].forEach(
        (model) => model.defineRelations({
            Picture,
            Project,
            Category,
            User
        }));

    return {
        Category,
        Picture,
        Project,
        User
    };
};

module.exports = define;