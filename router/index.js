const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const ordersRouter = require('./ordersRouter');
const customerRouter = require('./customerRouter');
const authRouter = require('./authRouter');
const profileRouter = require('./profile.router');

const routerApi = (app) => {
  app.use('/api', usersRouter);
  app.use('/api', customerRouter);
  app.use('/api', categoriesRouter);
  app.use('/api', productsRouter);
  app.use('/api', ordersRouter);
  app.use('/api', profileRouter);
  app.use('/api', authRouter);
};

module.exports = routerApi;
