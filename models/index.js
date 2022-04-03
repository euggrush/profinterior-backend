"use strict";

const PictureModel = require(`./picture.js`);
const ProjectModel = require(`./project.js`);
const CategoryModel = require(`./category.js`);
const UserModel = require(`./user.js`);
const CategoryImageModel = require(`./category-image.js`)

const define = (sequelize) => {
    const Picture = PictureModel.define(sequelize);
    const Project = ProjectModel.define(sequelize);
    const Category = CategoryModel.define(sequelize);
    const User = UserModel.define(sequelize);
    const CategoryImage = CategoryImageModel.define(sequelize);

    [CategoryModel, PictureModel, ProjectModel, UserModel, CategoryImageModel].forEach(
        (model) => model.defineRelations({
            Picture,
            Project,
            Category,
            User,
            CategoryImage
        }));

    return {
        Category,
        Picture,
        Project,
        User,
        CategoryImage
    };
};

module.exports = define;