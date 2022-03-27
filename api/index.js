'use strict';

const {
    Router
} = require(`express`);
const category = require(`../api/category.js`);
const article = require(`../api/article.js`);
const search = require(`../api/search.js`);
const comment = require(`../api/comment.js`);
const allComments = require(`../api/all-comments.js`);
const user = require(`../api/user.js`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const {
    CategoryService,
    ArticleService,
    CommentService,
    UserService
} = require(`../data-service`);

const app = new Router();

defineModels(sequelize);

(() => {
    category(app, new CategoryService(sequelize));
    article(app, new ArticleService(sequelize));
    comment(app, new ArticleService(sequelize), new CommentService(sequelize));
    search(app, new SearchService(sequelize));
    allComments(app, new CommentService(sequelize));
    user(app, new UserService(sequelize));
})();

module.exports = app;