const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string();
const createdAt = Joi.date();
const categoryId = Joi.number().integer();
const offset = Joi.number().integer();
const limit = Joi.number().integer();
const price_min = Joi.number().integer().min(10);
const price_max = Joi.number().integer().min(10);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  createdAt: createdAt,
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  createdAt: createdAt,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  offset: offset,
  limit: limit,
  price: price,
  price_min: price_min,
  price_max: price_max
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
