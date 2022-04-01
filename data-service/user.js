'use strict';

class UserService {
  constructor(sequelize) {
    this._User = sequelize.models.User;
  }

  findAll() {
    return this._User.findAll();
  }
}

module.exports = UserService;