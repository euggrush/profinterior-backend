'use strict';

const express = require(`express`);
// const cors = require("cors");

const {
    HttpCode,
    API_PREFIX,
    DEFAULT_PORT
} = require(`../constants`);
const routes = require(`../api`);
const {
    getLogger
} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);

const app = express();
const logger = getLogger({
    name: `api`
});

app.use(express.json());

app.use((req, res, next) => {
    logger.debug(`Request on route ${req.url}`);
    res.on(`finish`, () => {
        logger.info(`Response status code ${res.statusCode}`);
    });
    next();
});

app.use(API_PREFIX, routes);

// app.use(cors({
//     origin: true
// }));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

app.use((req, res) => {
    res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
    logger.error(`An error occured on processing request: ${err.message}`);
});

module.exports = {
    name: `--server`,
    async run(args) {
        try {
            logger.info(`Trying to connect to database...`);
            await sequelize.authenticate();
        } catch (err) {
            logger.error(`An error occured: ${err.message}`);
            process.exit(1);
        }
        logger.info(`Connection to database established`);
        const port = process.env.PORT || DEFAULT_PORT;

        try {
            app.listen(port, (err) => {
                if (err) {
                    return logger.error(`An error occurred on server creation: ${err.message}`);
                }

                return logger.info(`Listening to connections on ${port}`);
            });

        } catch (err) {
            logger.error(`An error occurred: ${err.message}`);
            process.exit(1);
        }
    }
};