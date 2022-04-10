'use strict';

const {
    Router
} = require(`express`);

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

    app.use(`/pictures`, route);

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

    route.post(`/`, authenticateJwt, isAdmin, upload.single(`upload`), async (req, res) => {
        const meta = req.body.meta;
        const file = req.file;
        const projectId = JSON.parse(meta).project_id

        const pictureData = {
            path: file ? cutPath(file.path, `/upload`) : ``,
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
};