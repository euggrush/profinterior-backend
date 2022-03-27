'use strict';

class UserService {
  constructor(sequelize) {
    this._User = sequelize.models.User;
  }

  findAll() {
    const options = {
      order: [
        [`created_at`, `DESC`]
      ]
    };
    return this._User.findAll(options);
  }

  async create(userData) {
    let role;
    const users = await this._User.findOne({
      where: {
        role: `admin`
      }
    });
    if (users === null) {
      role = `admin`;
    } else {
      role = `user`;
    }
    userData.role = role;
    const user = await this._User.create(userData);
    return user.get();
  }
}

module.exports = UserService;