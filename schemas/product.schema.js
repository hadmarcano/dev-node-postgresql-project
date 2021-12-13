const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const createdAt = Joi.date();


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image:image.required(),
  createdAt: createdAt.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image:image,
  createdAt:createdAt
});

const getProductSchema = Joi.object({
  productId: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
};

