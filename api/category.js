'use strict';

const {
  Router
} = require(`express`);

const cors = require("cors");

const {
  HttpCode
} = require(`../constants.js`);

const route = new Router();

const authenticateJwt = require(`../middlewares/authenticate-jwt`);
const isAdmin = require(`../middlewares/admin-only`);

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.use(cors({
    origin: true
  }));

  route.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  route.options('/', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
  });

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