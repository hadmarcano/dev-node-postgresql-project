'use strict';
const {ORDER_PRODUCT_TABLE, OrderProductSchema} = require('../models/orderProduct.model');

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
   await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
