'use strict';
const { ORDER_TABLE, OrderSchema } = require('../models/order.model');

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
