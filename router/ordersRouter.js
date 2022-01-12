const { Router } = require('express');
const OrderService = require('../services/order.services');
//
const router = Router();
const service = new OrderService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');

// Routers
router.get('/orders', async (req, res) => {
  const orders = await service.find();
  res.json(orders);
});

router.get(
  '/orders/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      let total = 0;
      const order = await service.findOne(id);
      if (order.items.length > 0) {
        total = order.items.reduce((total, item) => {
          return total + item.price * item.OrderProduct.amount;
        }, 0);
      }

      const result = {
        order,
        totalOrder: total,
      };
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/orders/create',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json(newProduct);
  }
);

router.delete(
  '/orders/delete/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const response = await service.delete(id);

    res.json(response);
  }
);

router.post(
  '/orders/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newItem = await service.addItem(body);

    res.status(201).json(newItem);
  }
);

module.exports = router;
