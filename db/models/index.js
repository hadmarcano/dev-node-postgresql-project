const {UserSchema, User} = require('./user.model');
const {ProductSchema, Product} = require('./product.model');
const {CategorySchema, Category} = require('./category.model');
const {CustomerSchema, Customer} = require('./customer.model');


function setupModels(sequelize){
  try {
    User.init(UserSchema, User.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));

    // Associations
    Customer.associate(sequelize.models);

  } catch (error) {
    throw new Error(error);
  }
};

module.exports = setupModels;
