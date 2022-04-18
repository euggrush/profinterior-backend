'use strict';

const {
    Router
} = require(`express`);
const category = require(`./category.js`);
const project = require(`./project.js`);
const picture = require(`./picture.js`);
const allPictures = require(`./all-pictures.js`);
const user = require(`./user.js`);
const uploadPicture = require(`./upload-picture.js`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const {
    CategoryService,
    ProjectService,
    PictureService,
    UserService
} = require(`../data-service`);

const app = new Router();

defineModels(sequelize);

(() => {
    category(app, new CategoryService(sequelize));
    project(app, new ProjectService(sequelize));
    picture(app, new PictureService(sequelize));
    allPictures(app, new PictureService(sequelize));
    uploadPicture(app, new PictureService(sequelize));
    user(app, new UserService(sequelize));
})();

module.exports = app;