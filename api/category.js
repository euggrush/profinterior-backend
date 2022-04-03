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
    try {
      const categories = await service.findAll();
      res.status(HttpCode.OK)
        .json(categories);
    } catch (err) {
      console.error(err)
    }
  });

  // route.get(`/:categoryId`, async (req, res) => {
  //   const {
  //     categoryId
  //   } = req.params;
  //   const {
  //     limit,
  //     offset
  //   } = req.query;

  //   const category = await service.findOne(categoryId);
  //   const projectsByCategory = await service.findPage(categoryId, limit, offset);

  //   res.status(HttpCode.OK)
  //     .json({
  //       category,
  //       projectsByCategory
  //     });
  // });

  route.post(`/`, (req, res) => {
    const caategory = service.create(req.body);
    if (!caategory) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Not created`);
    }

    return res.status(HttpCode.CREATED)
      .json(caategory);
  });
};