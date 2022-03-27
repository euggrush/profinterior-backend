'use strict';

class PictureService {
  constructor(sequelize) {
    this._Project = sequelize.models.Project;
    this._Picture = sequelize.models.Picture;
  }

  async create(projectId, comment) {
    return await this._Picture.create({
      projectId,
      ...comment
    });
  }

  async drop(userId, projectId, commentId) {
    const projectByUser = await this._Project.findOne({
      where: {
        id: projectId,
        userId
      }
    });

    if (!projectByUser) {
      return !!projectByUser;
    }

    const deletedRows = await this._Picture.destroy({
      where: {
        id: commentId
      }
    });

    return !!deletedRows;
  }

  async findAll() {
    return await this._Picture.findAll({
      raw: true
    });
  }

  async findOne(id, projectId) {
    return await this._Picture.findOne({
      where: {
        id,
        projectId
      }
    });
  }

}

module.exports = PictureService;