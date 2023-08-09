"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Like_and_Comments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      idContent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      countLike: {
        type: Sequelize.INTEGER,
      },
      ip: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.TEXT,
        default: null,
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
    await queryInterface.dropTable("Like_and_Comments");
  },
};
