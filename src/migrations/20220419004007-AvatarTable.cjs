'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'users',
      'avatar',
     Sequelize.STRING
    );
  },
  
  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn(
      'users',
      'avatar'
    );
  }
}