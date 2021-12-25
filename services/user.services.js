const faker = require('faker');
const Boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');
// const { Op } = require("sequelize");

class UserService {
  constructor() {
    this.listUsers = [];
    this.generate();

  }

  generate() {
    const limit = 40;

    for (let i = 0; i < limit; i++) {
      this.listUsers.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.streetName(),
        ocupation: faker.name.jobTitle(),
      });
    }
  }

  async getting() {
    const response = await models.User.findAll({
      include:['customer']
    });
    return response;
  }


  async getOne(id) {
    const user = await models.User.findAll({
      where: {id},
      // attributes: ['firstname','lastname', 'ocupation', 'email'],
      include:[{
        as:"customer",
        model: models.Customer,
      }]
    });

    console.log(user);
    if (!user) {
      throw Boom.notFound('User not exists');
    }

    return user;
  }


  async createOne(dataUser) {

      const newUser = await models.User.create(dataUser);
      const response = {
        created: 'OK',
        user: newUser,
      };
      return response;

  }


  async updateOne(id, changes) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw Boom.notFound('User not exists');
    }

    const response = await user.update(changes);
    return response;


  }

  async deleteOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw Boom.notFound('User not exists');
    }

    await user.destroy();

    return {id,
    deleted: "OK"}
  }
}

module.exports = UserService;
