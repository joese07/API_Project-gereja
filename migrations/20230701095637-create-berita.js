"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Berita", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      author: {
        type: Sequelize.STRING,
      },
      periode: {
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
    await queryInterface.dropTable("Berita");
  },
};
