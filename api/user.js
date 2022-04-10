/* eslint-disable camelcase */
'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../constants`);

const passwordUtils = require(`../lib/password`);
const makeTokens = require(`../middlewares/jwt-helper`);
const refreshTokenService = require(`../middlewares/refresh-token-service`);

const route = new Router();

const ErrorAuthMessage = {
  EMAIL: `Электронный адрес не существует`,
  PASSWORD: `Неверный пароль`
};

module.exports = (app, service) => {
  app.use(`/user`, route);

  route.get(`/`, async (req, res) => {
    const users = await service.findAll();
    res.status(HttpCode.OK)
      .json(users);
  });

  route.post(`/`, async (req, res) => {
    const data = req.body;

    data.password_hash = await passwordUtils.hash(data.password);

    const result = await service.create(data);

    delete result.password_hash;

    res.status(HttpCode.CREATED)
      .json(result);
  });

  route.post(`/auth`, async (req, res) => {
    const {
      email,
      password
    } = req.body;
    const user = await service.findByEmail(email);

    if (!user) {
      res.status(HttpCode.UNAUTHORIZED).send(ErrorAuthMessage.EMAIL);
      return;
    }

    const passwordIsCorrect = await passwordUtils.compare(password, user.password_hash);

    if (passwordIsCorrect) {
      delete user.password_hash;
      const {
        accessToken,
        refreshToken
      } = makeTokens({
        user
      });

      await refreshTokenService.add(refreshToken);

      res.status(HttpCode.OK).json({
        user,
        accessToken,
        // refreshToken
      });
    } else {
      res.status(HttpCode.UNAUTHORIZED).send(ErrorAuthMessage.PASSWORD);
    }
  });
};