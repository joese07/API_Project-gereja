"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRoles.belongsTo(models.User, {
        foreignKey: "iduser",
        as: "user",
      });
      UserRoles.belongsTo(models.Roles, {
        foreignKey: "idroles",
        as: "roles",
      });
    }
  }
  UserRoles.init(
    {
      iduser: DataTypes.STRING,
      idroles: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserRoles",
    }
  );
  return UserRoles;
};
