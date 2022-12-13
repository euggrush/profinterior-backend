'use strict';

const Aliase = require(`../models/aliase`);
const {
  Op
} = require(`sequelize`);

class ProjectService {
  constructor(sequelize) {
    this._sequelize = sequelize;
    this._Project = sequelize.models.Project;
    this._Picture = sequelize.models.Picture;
    this._Category = sequelize.models.Category;
    this._User = sequelize.models.User;
  }

  async create(projectData) {
    let project = await this._Project.create(projectData);
    return project.get();
  }

  async drop(id) {
    const deletedRow = await this._Project.destroy({
      where: {
        id
      }
    });

    return !!deletedRow;
  }

  async findAll() {
    const include = [
      Aliase.CATEGORIES,
      Aliase.PHOTOS,
    ];
    const projects = await this._Project.findAll({
      include,
      order: [
        [`created_at`, `DESC`]
      ]
    });

    return projects;

  }

  async findOne(projectId) {
    const include = [
      Aliase.CATEGORIES,
      Aliase.PHOTOS,
    ];
    return await this._Project.findByPk(projectId, {
      include
    });
  }

  async findPage(searchText) {
    const include = [
      Aliase.CATEGORIES,
      Aliase.PHOTOS,
    ];
    const projects = await this._Project.findAll({
      where: {
        category_id: searchText.category_id
      },
      include
    });
    return projects;
  }


  async update(id, projectData) {
    const affectedRows = await this._Project.update(projectData, {
      where: {
        id,
      }
    });

    const updatedProject = await this._Project.findOne({
      where: {
        id
      }
    });

    await updatedProject.setCategories(projectData.categories);

    return !!affectedRows;
  }
}

module.exports = ProjectService;