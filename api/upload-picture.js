'use strict';

const {
  Router
} = require(`express`);

const cors = require("cors");

const route = new Router();

const {
  HttpCode
} = require(`../constants`);

const upload = require(`../middlewares/upload`);
const authenticateJwt = require(`../middlewares/authenticate-jwt`);
const isAdmin = require(`../middlewares/admin-only`);

const cutPath = (arg1, arg2) => {
  const path = arg1.substring(arg1.indexOf(arg2));
  return path;
};


module.exports = (app, pictureService) => {

  app.use(`/upload`, route);

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

  route.get(`/img/:pictureName`, async (req, res) => {
    const {
      pictureName
    } = req.params;
    const path = require('path');
    const fs = require('fs');
    const directoryPath = path.join(__dirname, '../upload/img');
    res.sendFile(`${directoryPath}/${pictureName}`);
  });

  route.post(`/`, authenticateJwt, isAdmin, upload.single(`upload`), async (req, res) => {
    const meta = req.body.meta;
    const file = req.file;
    const projectId = JSON.parse(meta).project_id

    const pictureData = {
      path: file ? cutPath(file.path, `/img`) : ``,
      project_id: projectId
    };
    try {
      const picture = await pictureService.create(pictureData);
      return res.status(HttpCode.CREATED)
        .json(picture);

    } catch (err) {
      console.log(err)
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Not created`);
    }
  });

  route.post(`/category-picture`, authenticateJwt, isAdmin, upload.single(`upload`), async (req, res) => {
    const meta = req.body.meta;
    const file = req.file;
    const categoryId = JSON.parse(meta).category_id

    const pictureData = {
      path: file ? cutPath(file.path, `/img`) : ``,
      category_id: categoryId
    };
    // console.log(pictureData)
    try {
      const picture = await pictureService.createCategoryPicture(pictureData);
      return res.status(HttpCode.CREATED)
        .json(picture);

    } catch (err) {
      console.log(err)
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Not created`);
    }
  });
};