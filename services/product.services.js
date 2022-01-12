const Boom = require('@hapi/boom');
const { Op } = require("sequelize");
const { models } = require('./../libs/sequelize');

class ProductService {
  constructor() {}

  async find(query) {
    const { offset, limit, price, price_min, price_max } = query;
    const options = {
      include: ['category'],
      where:{}
    };

    if (offset && limit) {
      options.offset = offset;
      options.limit = limit;
    }

    if(price){
      options.where.price = price;
    }

    if(price_min && price_max){
      const range = {
        [Op.between] : [price_min, price_max]
      }
      options.where.price = range;
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
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
