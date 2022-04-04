'use strict';

const {
  Router
} = require(`express`);

const route = new Router();

const {
  HttpCode
} = require(`../constants`);


module.exports = (app, pictureService, projectService) => {

  app.use(`/projects`, route);

  route.get(`/:projectId/pictures`, async (req, res) => {
    const {
      projectId
    } = req.params;

    const pictures = await pictureService.findOne(projectId);

    res.status(HttpCode.OK)
      .json(pictures);

  });
};