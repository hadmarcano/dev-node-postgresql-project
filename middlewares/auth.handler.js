const Boom = require('@hapi/boom');
const { config } = require('../config/config');
//
const bcrypt = require('bcrypt');
const saltRounds = 10;

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['apiuser'];

  if (apiKey === config.api_public_key) {
    next();
  } else {
    next(Boom.unauthorized());
  }
};

// Hash Password
const hashingPassword = async (req, res, next) => {
  if (req.body.password && req.body.password.length >= 3) {
    const plainPassword = req.body.password;
    const passHashed = await bcrypt.hash(plainPassword, saltRounds);
    // Store hash password into bbdd
    req.passHash = passHashed;
    next();
  } else {
    next(Boom.badRequest());
  }
};

// deshash Password
const deshashingPassword = async (req, res, next) => {
  if (req.body.password && req.body.password.length >= 3) {

    // Find user hash password from bbdd
    const hashPass = "$2b$10$eqH5Vq5dCsYyTBQocUEHUeByQUXqDl0I7S4k88AvC6Ehn6FEmzoGq";
    const plainPassword = req.body.password;
    const decypherHash = await bcrypt.compare(plainPassword, hashPass);
    // Store hash password into bbdd
    req.decypherHash = decypherHash;
    next();
  } else {
    next(Boom.badRequest());
  }
};

module.exports = { checkApiKey, hashingPassword,deshashingPassword };
