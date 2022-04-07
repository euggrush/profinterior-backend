'use strict';

class UserService {
  constructor(sequelize) {
    this._User = sequelize.models.User;
  }

  findAll() {
    return this._User.findAll();
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

  async findByEmail(email) {
    const user = await this._User.findOne({
      where: {
        email
      }
    });
    return user && user.get();
  }
}

module.exports = UserService;