'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('users', { 
      id:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
  },
      {
        tableName: "Users",
        timestamps: false,
    }
    );

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('user');

  }
};
