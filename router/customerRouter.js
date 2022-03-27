const express = require('express');
const passport = require('passport');
const CustomerService = require('../services/customers.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get(
  '/customers',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      res.json(await service.find());
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/customers/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(201).json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/customers/create',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      let result = await service.create(body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/customers/update/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/customers/delete/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
