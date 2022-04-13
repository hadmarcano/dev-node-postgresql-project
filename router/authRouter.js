const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.services');

const router = express.Router();
const service = new AuthService();

router.post(
  '/auth/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;

      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/auth/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await service.sendEmail(email);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
