'use strict';

const {
  Router
} = require(`express`);

const cors = require("cors");

const route = new Router();

const {
  HttpCode
} = require(`../constants`);


module.exports = (app, pictureService) => {

  app.use(`/project-images`, route);

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

  route.get(`/:projectId/pictures`, async (req, res) => {
    const {
      projectId
    } = req.params;

    const pictures = await pictureService.findOne(projectId);

    res.status(HttpCode.OK)
      .json(pictures);

  });
};