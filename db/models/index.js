const {UserSchema, User} = require('./user.model');
const {ProductSchema, Product} = require('./product.model');
const {CategorySchema, Category} = require('./category.model');
const {CustomerSchema, Customer} = require('./customer.model');
const {OrderSchema, Order} = require('./order.model');
const {OrderProductSchema, OrderProduct} = require('./orderProduct.model');


function setupModels(sequelize){
  try {
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));
    OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

    // Associations
    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Category.associate(sequelize.models);
    Product.associate(sequelize.models);
    Order.associate(sequelize.models);


  } catch (error) {
    throw new Error(error);
  }
};

module.exports = setupModels;
