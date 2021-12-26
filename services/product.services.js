const Boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ProductService {
  constructor() {}

  async find() {
    const products = await models.Product.findAll({
      include:['category']
    });
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id,{
      include:['category']
    });
    if (!product) throw Boom.notFound('This product id not exists');
    return product;
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return {
      response: true,
    };
  }
}

module.exports = ProductService;
