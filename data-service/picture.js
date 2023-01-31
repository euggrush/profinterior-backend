'use strict';

class PictureService {
  constructor(sequelize) {
    this._Project = sequelize.models.Project;
    this._Picture = sequelize.models.Picture;
    this._CategoryImage = sequelize.models.CategoryImage;

  }

  async create(pictureData) {
    let picture = await this._Picture.create(pictureData);
    return picture.get();
  }

// CREATE CATEGORY IMAGE

  async createCategoryPicture(pictureData) {
    await this._CategoryImage.destroy({
      where: {
        category_id: pictureData.category_id
      }
    }).catch((err) => {
      console.log(err)
    });

    let picture = await this._CategoryImage.create(pictureData);
    return picture.get();
  }

// DELETE PROJECT IMAGE

  async drop(pictureId) {
    const deletedRows = await this._Picture.destroy({
      where: {
        id: pictureId
      }
    });
    return !!deletedRows;
  }

// FIND ALL PROJECT IMAGES

  async findAll() {
    return await this._Picture.findAll();
  }

// FIND PROJECT IMAGES OR IMAGES BY PROJECT

  async findOne(projectId, pictureId) {

    const pictures = await this._Picture.findAll();

    let projectPictures = [];
    if (!pictureId) {
      pictures.map((item) => {
        if (item.project_id == projectId) {
          projectPictures.push(item)
        }
      })
    } else {
      pictures.map((item) => {
        if (item.project_id == projectId) {
          if (item.id == pictureId) {
            projectPictures.push(item)
          }
        }
      })
    }
    return projectPictures;
  }
}

module.exports = PictureService;