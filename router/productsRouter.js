const { Router } = require('express');
const ProductService = require('../services/product.services');
//
const router = Router();
const service = new ProductService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

// Routers
router.get('/products', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get(
  '/products/:id',
  validatorHandler(getProductSchema,'params'),
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

router.post('/products/create',
validatorHandler(createProductSchema,'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);

  res.status(201).json(newProduct);
});

// PATCH ---> updating partial. || PUT ---> full updating (by API REST convention)
router.patch('/products/edit/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/products/delete/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.json(response);
});

module.exports = router;
