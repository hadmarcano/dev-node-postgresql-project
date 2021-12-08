const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const ordersRouter = require('./ordersRouter');

const routerApi = (app) => {
  app.use('/api', productsRouter);
  app.use('/api', usersRouter);
  app.use('/api', categoriesRouter);
  app.use('/api', ordersRouter);
};

module.exports = routerApi;
