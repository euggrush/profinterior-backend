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
    route.delete(`/:pictureId`, async (req, res) => {
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

    route.post(`/`, async (req, res) => {
        const picture = await pictureService.create(req.body);

        if (!picture) {
            return res.status(HttpCode.BAD_REQUEST)
                .send(`Not created`);
        }

        return res.status(HttpCode.CREATED)
            .json(picture);
    });
};