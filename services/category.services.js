const Boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id,{
      include:['products']
    });
    if(!category) throw Boom.notFound("this category id not exists");
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const response = await category.update(changes);
    return response;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { response: true };
  }

}

module.exports = CategoryService;
