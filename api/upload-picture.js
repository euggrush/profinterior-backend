'use strict';

const {
  Router
} = require(`express`);

const cors = require("cors");

const route = new Router();

const {
  HttpCode
} = require(`../constants`);

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage
});

// const upload = require(`../middlewares/upload`);
const uploadToOracle = require(`../middlewares/upload-bucket`);
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

  // UPLOAD PROJECT PICTURE

  route.post(`/`, authenticateJwt, isAdmin, upload.single(`upload`), uploadToOracle, async (req, res) => {
    const meta = req.body.meta;
    const file = req.fileInfo.filename;
    const projectId = JSON.parse(meta).project_id

    const pictureData = {
      path: file ? cutPath(file, `/img`) : ``,
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

  // UPLOAD CATEGORY PICTURE

  route.post(`/category-picture`, authenticateJwt, isAdmin, upload.single("upload"), uploadToOracle, async (req, res) => {

    const meta = req.body.meta;
    const file = req.fileInfo.filename;
    const categoryId = JSON.parse(meta).category_id;

    const pictureData = {
      path: file ? cutPath(file, `/img`) : ``,
      category_id: categoryId
    };

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