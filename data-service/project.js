'use strict';

const Aliase = require(`../models/aliase`);

class ProjectService {
  constructor(sequelize) {
    this._sequelize = sequelize;
    this._Project = sequelize.models.Project;
    this._Picture = sequelize.models.Picture;
    this._Category = sequelize.models.Category;
    this._User = sequelize.models.User;
  }

  async create(projectData) {
    const project = await this._Project.create(projectData);
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
      // Aliase.CATEGORIES,
      Aliase.PHOTOS
    ];
    const projects = await this._Project.findAll({
      include
    });

    return projects.map((item) => item.get());
  }

  async findOne(projectId) {
    const include = [];
    include.push(Aliase.CATEGORIES, Aliase.PICTURES);
    return await this._Project.findByPk(projectId, {
      include
    });
  }

  async findPage(limit, offset) {
    const {
      count,
      rows
    } = await this._Project.findAndCountAll({
      limit,
      offset
    });
    return {
      count,
      projects: rows
    };
  }


  async update({
    id,
    project
  }) {
    const affectedRows = await this._Project.update(project, {
      where: {
        id,
        userId: project.userId
      }
    });

    const updatedProject = await this._Project.findOne({
      where: {
        id,
        userId: project.userId
      }
    });

    await updatedProject.setCategories(project.categories);

    return !!affectedRows;
  }
}

module.exports = ProjectService;