"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Content_Seksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Content_Seksi.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      picture: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      author: DataTypes.STRING,
      seksi: DataTypes.STRING,
      is_validation: DataTypes.BOOLEAN,
      date_validation: DataTypes.DATE,
      validation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Content_Seksi",
    }
  );
  return Content_Seksi;
};
