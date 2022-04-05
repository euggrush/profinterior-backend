'use strict';

const {
    Router
} = require(`express`);

const route = new Router();

const {
    HttpCode
} = require(`../constants`);

const upload = require(`../middlewares/upload`);

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

    route.post(`/`, upload.single(`upload`), async (req, res) => {
        // const picture = await pictureService.create(req.body);
        const meta = req.body.meta;
        const file = req.file;
        const projectId = JSON.parse(meta).project_id

        // console.log(projectId);
        // console.log(file);

        const pictureData = {
            path: file ? file.path : ``,
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