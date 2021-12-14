'use strict';

const {UserSchema, USER_TABLE} = require('./../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    // Se pueden correr todos los comandos que desees.
    await  queryInterface.addColumn(USER_TABLE,'role',UserSchema.role);
  },

  down: async (queryInterface) => {
    await  queryInterface.removeColumn(USER_TABLE,'role');
  }
};
