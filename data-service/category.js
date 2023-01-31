'use strict';

const Aliase = require(`../models/aliase`);

class CategoryService {
  constructor(sequelize) {
    this._Project = sequelize.models.Project;
    this._Category = sequelize.models.Category;
    this._Picture = sequelize.models.Picture;
    this._CategoryImage = sequelize.models.CategoryImage;
  }

  async create(categoryData) {
    return await this._Category.create(categoryData);
  };

  // DELETE CATEGORY

  async drop(id) {

    await this._Project.findAll({
      where: {
        category_id: id
      }
    }).then((resp) => {
      resp.map((item) => {
        this._Picture.destroy({
          where: {
            project_id: item.id
          }
        })
      });
    }).then(() => {
      this._Project.destroy({
        where: {
          category_id: id
        }
      })
    }).then(() => {
      this._CategoryImage.destroy({
        where: {
          category_id: id
        }
      })
    }).then(() => {
      this._Category.destroy({
        where: {
          id
        }
      })
    }).catch((err) => {
      console.log(err)
    });
    
    return `Deleted!`
  }

  // FIND ALL CATEGORIES

  async findAll() {
    const include = [
      Aliase.CATEGORY_IMAGES
    ];
    const categories = await this._Category.findAll({
      include
    });
    return categories;
  }

  // FIND ONE CATEGORY

  async findOne(categoryId) {
    return this._Category.findByPk(categoryId);
  }
}

module.exports = CategoryService;