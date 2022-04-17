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

  async findOne(projectId) {
    const pictures = await this._Picture.findAll();
    let projectPictures = [];
    pictures.map((item) => {
      if (item.project_id == projectId) {
        projectPictures.push(item)
      }
    })
    return projectPictures;
  }

}

module.exports = PictureService;