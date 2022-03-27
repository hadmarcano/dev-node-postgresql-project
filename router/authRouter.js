const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const router = express.Router();

router.post(
  '/auth/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };

      const token = jwt.sign(payload, config.secret_key);

      res.status(201).json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
