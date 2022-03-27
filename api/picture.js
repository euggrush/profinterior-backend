'use strict';

const {
  Router
} = require(`express`);

const route = new Router();

const {
  HttpCode
} = require(`../constants`);


module.exports = (app, pictureService) => {

  app.use(`/projects`, route);

  route.get(`/pictures`, async (req, res) => {
    const pictures = await pictureService.findAll();

    res.status(HttpCode.OK)
      .json(pictures);
  });

  route.get(`/:projectId/pictures`, async (req, res) => {
    const {
      projectId
    } = req.params;

    const pictures = await pictureService.findOne(projectId);

    res.status(HttpCode.OK)
      .json(pictures);

  });

  route.delete(`/:projectId/pictures/:pictureId`, async (req, res) => {
    const {
      projectId,
      pictureId
    } = req.params;
    const deleted = await pictureService.drop(projectId, pictureId);

    if (!deleted) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deleted);
  });

  route.post(`/:projectId/pictures`, async (req, res) => {
    const {
      projectId
    } = req.params;

    const picture = await pictureService.create(projectId, req.body);

    if (!picture) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Not created`);
    }

    return res.status(HttpCode.CREATED)
      .json(picture);
  });
};