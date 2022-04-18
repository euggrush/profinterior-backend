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

  app.use(`/upload/img`, route);

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

  route.get(`/:pictureName`, async (req, res) => {
    const {
      pictureName
    } = req.params;
    const path = require('path');
    const fs = require('fs');
    const directoryPath = path.join(__dirname, '../upload/img');
    res.sendFile(`${directoryPath}/${pictureName}`);
  });
};