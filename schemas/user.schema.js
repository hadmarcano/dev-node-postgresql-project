const Joi = require('joi');

const id = Joi.number();
const firstname = Joi.string().min(3).max(20);
const lastname = Joi.string().min(3).max(20);
const address = Joi.string().min(3).max(50);
const ocupation = Joi.string().min(3).max(20);
const role = Joi.string();
const email = Joi.string().email();
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const createdAt = Joi.date();

const getUserSchema = Joi.object({
  userId: id.required(),
});

const createUserSchema = Joi.object({
  firstname: firstname.required(),
  lastname: lastname.required(),
  address: address.required(),
  ocupation: ocupation.required(),
  email: email.required(),
  role: role,
  password: password.required(),
  createdAt:createdAt.required()
});

const updateUserSchema = Joi.object({
  firstname: firstname,
  lastname: lastname,
  address: address,
  ocupation: ocupation,
  email: email,
  role: role,
  password: password,
  createdAt:createdAt
});


module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema
}
