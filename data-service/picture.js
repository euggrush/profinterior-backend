'use strict';

class PictureService {
  constructor(sequelize) {
    this._Project = sequelize.models.Project;
    this._Picture = sequelize.models.Picture;
  }

  async create(pictureData) {
    let picture = await this._Picture.create(pictureData);
    return picture.get();
  }

  async drop(pictureId) {
    const deletedRows = await this._Picture.destroy({
      where: {
        id: pictureId
      }
    });
    return !!deletedRows;
  }

  async findAll() {
    return await this._Picture.findAll();
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