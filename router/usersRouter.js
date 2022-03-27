const { Router } = require('express');
const passport = require('passport');
const UserService = require('../services/user.services');
//
const router = Router();
const service = new UserService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} = require('../schemas/user.schema');

// Routers
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const result = await service.getting();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/users/:userId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    const { userId } = req.params;
    try {
      const response = await service.getOne(userId);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/users/create',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    const { body } = req;
    try {
      console.log(req);
      const response = await service.createOne(body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/users/update/:userId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    const { userId } = req.params;
    const data = req.body;
    try {
      const response = await service.updateOne(userId, data);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/users/delete/:userId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    const { userId } = req.params;
    try {
      const response = await service.deleteOne(userId);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
