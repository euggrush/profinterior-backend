'use strict';

const {
  Router
} = require(`express`);

const route = new Router();

const {
  HttpCode
} = require(`../constants`);

const commentValidator = require(`../middlewares/comment-validator`);
const articleExist = require(`../middlewares/article-exists`);

module.exports = (app, articleService, commentService) => {

  app.use(`/articles`, route);

  route.get(`/comments`, async (req, res) => {
    const comments = await commentService.findAll();

    res.status(HttpCode.OK)
      .json(comments);
  });

  route.get(`/:articleId/comments`, [articleExist(articleService)], async (req, res) => {
    const {
      articleId
    } = req.params;

    const comments = await commentService.findOne(articleId);

    res.status(HttpCode.OK)
      .json(comments);

  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articleService)], async (req, res) => {
    const {
      articleId,
      commentId
    } = req.params;
    const deleted = await commentService.drop(articleId, commentId);

    if (!deleted) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deleted);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], async (req, res) => {
    const {
      articleId
    } = req.params;

    const comment = await commentService.create(articleId, req.body);

    if (!comment) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Not created`);
    }

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};