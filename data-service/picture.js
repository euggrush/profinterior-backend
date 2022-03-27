'use strict';

class PictureService {
  constructor(sequelize) {
    this._Project = sequelize.models.Project;
    this._Picture = sequelize.models.Picture;
  }

  async create(projectId, picture) {
    return await this._Picture.create({
      projectId,
      ...picture
    });
  }

  async drop(userId, projectId, pictureId) {
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
        id: pictureId
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