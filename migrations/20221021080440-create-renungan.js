"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Renungans", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      judul: {
        type: Sequelize.STRING,
      },
      isi: {
        type: Sequelize.TEXT,
      },
      foto: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      author: {
        type: Sequelize.STRING,
      },
      is_validation: {
        type: Sequelize.BOOLEAN,
        default: false,
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
    await queryInterface.dropTable("Renungans");
  },
};
