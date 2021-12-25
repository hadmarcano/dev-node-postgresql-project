const Boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async find() {
    const response = await models.Customer.findAll({
      include: ['user'],
    });
    return response;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);

    if (!user) {
      throw Boom.notFound('Customer not found');
    }

    return user;
  }

  async create(data) {
    // Modelo tradicional Lógico...

    // const newUser = await models.User.create(data.user);
    // const newCustomer = await models.Customer.create({
    //   ...data,
    //   userId:newUser.id
    // });

    // Modelo Inteligente sequelize... Identifica la asociación
    // que le indiquemos y cualquier subObjeto que este identifice
    // con el nombre indicado lo reconoce automáticamente.

    const newCustomer = await models.Customer.create(data,{
      include:['user']
    });

    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const response = await model.update(changes);
    return response;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { response: true };
  }
}

module.exports = CustomerService;
