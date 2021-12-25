const faker = require('faker');
const Boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  async find() {
    //
    const response = await models.Product.findAll();
    return response;
  }

  async findOne(productId) {
    const product = this.products.find((item) => item.id === productId);
    if (!product) {
      throw Boom.notFound('Product not found');
    }

    if (product.isBlock) {
      throw Boom.conflict('Product is block');
    }

    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw Boom.notFound('Product not found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw Boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
