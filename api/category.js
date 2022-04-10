'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../constants.js`);

const route = new Router();

const authenticateJwt = require(`../middlewares/authenticate-jwt`);
const isAdmin = require(`../middlewares/admin-only`);

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    try {
      const categories = await service.findAll();
      res.status(HttpCode.OK)
        .json(categories);
    } catch (err) {
      console.error(err)
    }
  });

  route.post(`/`, authenticateJwt, isAdmin, (req, res) => {
    const category = service.create(req.body);
    if (!category) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Not created`);
    }

    return res.status(HttpCode.CREATED)
      .json(category);
  });

  route.delete(`/:categoryId`, authenticateJwt, isAdmin, (req, res) => {
    const {
      categoryId
    } = req.params;
    const category = service.drop(categoryId);

    if (!category) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(category);
  });
};