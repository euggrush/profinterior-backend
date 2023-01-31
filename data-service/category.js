'use strict';

const Aliase = require(`../models/aliase`);

class CategoryService {
  constructor(sequelize) {
    this._Project = sequelize.models.Project;
    this._Category = sequelize.models.Category;
    this._Picture = sequelize.models.Picture;
  }

  async create(categoryData) {
    return await this._Category.create(categoryData);
  };

  async drop(id) {
    const projects = await this._Project.findAll({
      where: {
        category_id: id
      }
    });

    projects.map((item) => {
      this._Picture.destroy({
        where: {
          project_id: item.id
        }
      })
    });

    await this._Project.destroy({
      where: {
        category_id: id
      },
      force: true
    });

    const deletedRow = await this._Category.destroy({
      where: {
        id
      },
      force: true
    }).catch((err) => {
      console.log(err);
    })

    return !!deletedRow;
  }
  async findAll() {
    const include = [
      Aliase.CATEGORY_IMAGES
    ];
    const categories = await this._Category.findAll({
      include
    });
    return categories;
  }
  async findOne(categoryId) {
    return this._Category.findByPk(categoryId);
  }
}

module.exports = CategoryService;