'use strict';

const {
  Router
} = require(`express`);

const cors = require("cors");

const {
  HttpCode
} = require(`../constants`);

const route = new Router();

const authenticateJwt = require(`../middlewares/authenticate-jwt`);
const isAdmin = require(`../middlewares/admin-only`);

module.exports = (app, projectService) => {

  app.use(`/projects`, route);

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
    let projects = [];
    const query = req.query;
    if (Object.keys(query).length === 0) {
      projects = await projectService.findAll();

    } else {
      console.log(query);
      projects = await projectService.findPage(query);
    }
    res.status(HttpCode.OK).json(projects);
  });


  route.get(`/:projectId`, async (req, res) => {
    const {
      projectId
    } = req.params;
    const project = await projectService.findOne(projectId);

    if (!project) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${projectId}`);
    }

    return res.status(HttpCode.OK)
      .json(project);
  });

  route.post(`/`, authenticateJwt, isAdmin, (req, res) => {
    const project = projectService.create(req.body);
    if (!project) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Not created`);
    }
    return res.status(HttpCode.CREATED)
      .json(project);
  });

  route.put(`/:projectId`, authenticateJwt, isAdmin, (req, res) => {
    const {
      projectId
    } = req.params;

    const updated = projectService.update(projectId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${projectId}`);
    }
    return res.status(HttpCode.OK)
      .send(updated);
  });

  route.delete(`/:projectId`, authenticateJwt, isAdmin, (req, res) => {
    const {
      projectId
    } = req.params;
    const project = projectService.drop(projectId);

    if (!project) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(project);
  });
};