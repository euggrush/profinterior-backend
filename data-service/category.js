'use strict';

const Aliase = require(`../models/aliase`);

class CategoryService {
  constructor(sequelize) {
    this._Project = sequelize.models.Project;
    this._Category = sequelize.models.Category;
  }

  async create(categoryData) {
    const category = await this._Category.create(categoryData);
    return category;
  }
  async findAll() {
    const categories = await this._Category.findAll();
    return categories;
  }
  async findOne(categoryId) {
    return this._Category.findByPk(categoryId);
  }
  // async findPage(categoryId, limit, offset) {
  //   const include = [
  //     Aliase.CATEGORIES
  //   ];

  //   const projects = await this._Project.findAll({
  //     include
  //   });

  //   const projectsIdByCategory = [];

  //   projects.map((project) => {
  //     project.categories.map((category) => {
  //       if (category.id == categoryId) {
  //         projectsIdByCategory.push(project.id);
  //       }
  //     });
  //   });


  //   const {
  //     count,
  //     rows
  //   } = await this._Project.findAndCountAll({
  //     limit,
  //     offset,
  //     include: [
  //       Aliase.CATEGORIES,
  //     ],
  //     where: {
  //       id: projectsIdByCategory
  //     },
  //     distinct: true
  //   });

  //   return {
  //     count,
  //     projectsByCategory: rows
  //   };
  // }
}

module.exports = CategoryService;