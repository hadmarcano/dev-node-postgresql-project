const Boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      // include:['customer']
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) throw Boom.notFound('Order not exists');

    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });

    return orders;
  }

  async createByUserId(userId) {
    const customerInfo = await models.User.findByPk(userId, {
      include: ['customer'],
    });

    if (!customerInfo.customer.id) throw Boom.notFound('Customer not exists');

    let customerId = { customerId: customerInfo.customer.id };

    const newOrder = await models.Order.create(customerId);
    return newOrder;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    const order = await this.findOne(id);
    if (!order) throw Boom.notFound('Order not exists');
    order.destroy();
    return {
      deleted: true,
    };
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
}

module.exports = OrderService;
