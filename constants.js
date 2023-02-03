'use strict';
const DEFAULT_PORT = 3020;
const DEFAULT_COMMAND = `--server`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
    success: 0,
    error: 1
};

const PRE_AUTH_REQUEST_URL = `https://objectstorage.ca-toronto-1.oraclecloud.com/p/jE02KCLipZSKqdPxfle5ABFxoo3kkhQaCZySIYDoeGA5vq21F6brBA1inVn0dds4/n/yzfveo9zjrvn/b/bucket-20230109-1321/o/`;

const HttpCode = {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400
};

const API_PREFIX = `/api`;

module.exports = {
    DEFAULT_COMMAND,
    USER_ARGV_INDEX,
    ExitCode,
    DEFAULT_PORT,
    HttpCode,
    API_PREFIX,
    PRE_AUTH_REQUEST_URL
};

module.exports.Env = {
    DEVELOPMENT: `development`,
    PRODUCTION: `production`
};

module.exports.HttpMethod = {
    GET: `GET`,
    POST: `POST`,
    PUT: `PUT`,
    DELETE: `DELETE`
};
module.exports.JWT_ACCESS_SECRET = `secret`;
module.exports.JWT_REFRESH_SECRET = `secret-refresh`;