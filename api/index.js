'use strict';

const {
    Router
} = require(`express`);
const category = require(`./category.js`);
const project = require(`./project.js`);
const picture = require(`./picture.js`);
const user = require(`./user.js`);
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
    picture(app, new ProjectService(sequelize), new PictureService(sequelize));
    user(app, new UserService(sequelize));
})();

module.exports = app;