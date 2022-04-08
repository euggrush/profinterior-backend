'use strict';

const jwt = require(`jsonwebtoken`);
const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET
} = require(`../constants`);

module.exports = (tokenData) => {
    const accessToken = jwt.sign(tokenData, JWT_ACCESS_SECRET, {
        expiresIn: `85000s`
    });
    const refreshToken = jwt.sign(tokenData, JWT_REFRESH_SECRET);
    return {
        accessToken,
        refreshToken
    };
};