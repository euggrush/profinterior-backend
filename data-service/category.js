'use strict';

const Aliase = require(`../models/aliase`);

class CategoryService {
  constructor(sequelize) {
    this._Project = sequelize.models.Project;
    this._Category = sequelize.models.Category;
  }

  async findAll() {
    console.error(`aaaqqq111`)
    return this._Category.findAll();
  }
  async findOne(categoryId) {
    return this._Category.findByPk(categoryId);
  }
  async findPage(categoryId, limit, offset) {
    const include = [
      Aliase.CATEGORIES
    ];

    const projects = await this._Project.findAll({
      include
    });

    const projectsIdByCategory = [];

    projects.map((project) => {
      project.categories.map((category) => {
        if (category.id == categoryId) {
          projectsIdByCategory.push(project.id);
        }
      });
    });


    const {
      count,
      rows
    } = await this._Project.findAndCountAll({
      limit,
      offset,
      include: [
        Aliase.CATEGORIES,
      ],
      where: {
        id: projectsIdByCategory
      },
      distinct: true
    });

    return {
      count,
      projectsByCategory: rows
    };
  }
}

module.exports = CategoryService;