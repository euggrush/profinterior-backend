'use strict';

const server = require(`./server.js`);

const Cli = {
    [server.name]: server,
};

module.exports = {
    Cli
};