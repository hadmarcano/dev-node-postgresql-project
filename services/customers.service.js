const Boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class CustomerService {
  constructor(){}

  async find(){
    const response = await models.Customer.findAll();
    return response;
  }

  async findOne(id){
    const user = await models.Customer.findByPk(id);
    if(!user){
      throw Boom.notFound('Customer not found');
    }

    return user;
  }

  async create(data){
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async update(id,changes){
    const model = await this.findOne(id);
    const response = await model.update(changes);
    return response;
  }

  async delete(id){
    const model = await this.findOne(id);
    await model.destroy();
    return {response: true}
  }
};

module.exports = CustomerService;

