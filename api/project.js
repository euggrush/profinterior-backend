'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../constants`);

const articleValidator = require(`../middlewares/article-validator`);

const route = new Router();


module.exports = (app, articleService) => {

  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const {limit, offset} = req.query;
    let articles;
    if (limit || offset) {
      articles = await articleService.findPage(limit, offset);
    } else {
      articles = await articleService.findAll();
    }
    res.status(HttpCode.OK).json(articles);
  });


  route.get(`/:articleId`, async (req, res) => {
    const {
      articleId
    } = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.post(`/`, (req, res) => {
    const article = articleService.create(req.body);
    if (!article) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Not created`);
    }

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, [articleValidator], (req, res) => {
    const {
      articleId
    } = req.params;

    const updated = articleService.update(articleId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }
    return res.status(HttpCode.OK)
      .send(updated);
  });

  route.delete(`/:articleId`, (req, res) => {
    const {
      articleId
    } = req.params;
    const article = articleService.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });
};