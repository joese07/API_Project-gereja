"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sabda_Paduas", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      picture: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      is_validation: {
        default: false,
        type: Sequelize.BOOLEAN,
      },
      date_validation: {
        type: Sequelize.DATE,
      },
      validation: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Sabda_Paduas");
  },
};
