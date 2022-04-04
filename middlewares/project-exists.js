'use strict';

const {
    HttpCode
} = require(`../constants`);

module.exports = (service) => (req, res, next) => {
    const {
        projectId
    } = req.params;
    const project = service.findOne(projectId);

    if (!project) {
        return res.status(HttpCode.NOT_FOUND)
            .send(`Project with ${projectId} not found`);
    }

    return next();
};