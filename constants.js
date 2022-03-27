'use strict';

// const FILE_SENTENCES_PATH = `./data/sentences.txt`;
// const FILE_TITLES_PATH = `./data/titles.txt`;
// const FILE_CATEGORIES_PATH = `./data/categories.txt`;
// const FILE_COMMENTS_PATH = `./data/comments.txt`;
// const DEFAULT_PORT = 3000;
// const FILENAME = `mocks.json`;
// const MAX_COMMENTS = 4;

// const MAX_ID_LENGTH = 6;
// const DEFAULT_COUNT = 1;
// const FILE_NAME = `mocks.json`;
// const DEFAULT_COMMAND = `--help`;
// const USER_ARGV_INDEX = 2;
const ExitCode = {
    success: 0,
    error: 1
};

// const SumRestrict = {
//   MIN: 1618066947,
//   MAX: 1623337347,
// };
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
    //   DEFAULT_COUNT,
    //   DEFAULT_COMMAND,
    //   FILE_NAME,
    //   FILE_SENTENCES_PATH,
    //   FILE_TITLES_PATH,
    //   FILE_CATEGORIES_PATH,
    //   FILE_COMMENTS_PATH,
    //   SumRestrict,
    //   USER_ARGV_INDEX,
    ExitCode,
    //   DEFAULT_PORT,
    //   FILENAME,
    //   MAX_ID_LENGTH,
    //   MAX_COMMENTS,
    HttpCode,
    API_PREFIX
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