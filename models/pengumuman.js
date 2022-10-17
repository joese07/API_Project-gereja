"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pengumuman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pengumuman.init(
    {
      nama: DataTypes.STRING,
      category: DataTypes.STRING,
      subcategory: DataTypes.STRING,
      isi: DataTypes.TEXT,
      approved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Pengumuman",
    }
  );
  return Pengumuman;
};
