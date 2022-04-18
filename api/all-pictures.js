'use strict';

const {
    Router
} = require(`express`);

const cors = require("cors");

const route = new Router();

const {
    HttpCode
} = require(`../constants`);

// const upload = require(`../middlewares/upload`);
const authenticateJwt = require(`../middlewares/authenticate-jwt`);
const isAdmin = require(`../middlewares/admin-only`);

// const cutPath = (arg1, arg2) => {
//     const path = arg1.substring(arg1.indexOf(arg2));
//     return path;
// };

module.exports = (app, pictureService) => {

    app.use(`/pictures`, route);

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
        const pictures = await pictureService.findAll();

        res.status(HttpCode.OK)
            .json(pictures);
    });
    route.delete(`/:pictureId`, authenticateJwt, isAdmin, async (req, res) => {
        const {
            pictureId
        } = req.params;

        const deleted = await pictureService.drop(pictureId);

        if (!deleted) {
            return res.status(HttpCode.NOT_FOUND)
                .send(`Not found`);
        }

        return res.status(HttpCode.OK)
            .json(deleted);
    });
};