'use strict';

const Aliase = require(`../models/aliase`);

class CategoryService {
  constructor(sequelize) {
    this._Project = sequelize.models.Project;
    this._Category = sequelize.models.Category;
  }

  async create(categoryData) {
    return await this._Category.create(categoryData);
  }
  async drop(id) {
    const deletedRow = await this._Category.destroy({
      where: {
        id
      }
    });

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