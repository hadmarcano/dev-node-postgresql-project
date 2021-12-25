const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone =  Joi.string();
const userId = Joi.number().integer();
// User
const firstname = Joi.string().min(3).max(20);
const lastname = Joi.string().min(3).max(20);
const address = Joi.string().min(3).max(50);
const ocupation = Joi.string().min(3).max(20);
const createdAt = Joi.date();
const email = Joi.string().email();
const password =  Joi.string();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  // userId: userId.required()
  user: Joi.object({
    firstname:firstname.required(),
    lastname:lastname.required(),
    address:address.required(),
    ocupation:ocupation.required(),
    createdAt:createdAt.required(),
    email: email.required(),
    password: password.required()
  })
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
