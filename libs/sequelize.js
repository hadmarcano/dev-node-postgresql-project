const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
  // logging: false,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

console.log(config.dbUrl);

const sequelize = new Sequelize(config.dbUrl, options);

// Initalizing models
setupModels(sequelize);

// # AHORA HACEMOS ESTA SYNC MEDIANTE MIGRATIONS #
// Syncronizing models and creating tables
// sequelize.sync({ logging: console.log })
// sequelize.sync()

module.exports = sequelize;
