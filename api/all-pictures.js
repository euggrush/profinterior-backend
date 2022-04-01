'use strict';

const {
    Router
} = require(`express`);

const route = new Router();

const {
    HttpCode
} = require(`../constants`);


module.exports = (app, pictureService) => {

    app.use(`/pictures`, route);

    route.get(`/`, async (req, res) => {
        const pictures = await pictureService.findAll();

        res.status(HttpCode.OK)
            .json(pictures);
    });
};