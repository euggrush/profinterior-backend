'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../constants`);


const route = new Router();


module.exports = (app, projectService) => {

  app.use(`/projects`, route);

  route.get(`/`, async (req, res) => {
    try {
      const projects = await projectService.findAll();
      res.status(HttpCode.OK).json(projects);
    } catch (err) {
      console.error(err)
    }

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

  route.post(`/`, (req, res) => {
    const project = projectService.create(req.body);
    if (!project) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Not created`);
    }

    return res.status(HttpCode.CREATED)
      .json(project);
  });

  route.put(`/:projectId`, (req, res) => {
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

  route.delete(`/:projectId`, (req, res) => {
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