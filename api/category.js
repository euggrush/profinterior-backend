'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../constants.js`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    const categories = await service.findAll();
    res.status(HttpCode.OK)
      .json(categories);
  });

  route.get(`/:categoryId`, async (req, res) => {
    const {
      categoryId
    } = req.params;
    const {
      limit,
      offset
    } = req.query;

    const category = await service.findOne(categoryId);
    const projectsByCategory = await service.findPage(categoryId, limit, offset);

    res.status(HttpCode.OK)
      .json({
        category,
        projectsByCategory
      });
  });
};