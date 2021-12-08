const Joi = require('joi');

const id = Joi.string().uuid();
const firstName = Joi.string().min(3).max(20);
const lastName = Joi.string().min(3).max(20);
const address = Joi.string().min(3).max(50);
const ocupation = Joi.string().min(3).max(20);

const getUserSchema = Joi.object({
  userId: id.required().required(),
});

const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  address: address.required(),
  ocupation: ocupation.required()
});

const updateUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  address: address,
  ocupation: ocupation
});


module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema
}
