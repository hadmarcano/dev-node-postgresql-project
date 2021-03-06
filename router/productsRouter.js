const { Router } = require('express');
const passport = require('passport');
const ProductService = require('../services/product.services');
//
const router = Router();
const service = new ProductService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/product.schema');

// Routers
router.get(
  '/products',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/products/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/products/create',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json(newProduct);
  }
);

// PATCH ---> updating partial. || PUT ---> full updating (by API REST convention)
router.patch(
  '/products/edit/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/products/delete/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  }
);

module.exports = router;
