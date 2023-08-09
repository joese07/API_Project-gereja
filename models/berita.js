"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Berita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Berita.hasMany(models.Like_and_Comment, {
        foreignKey: "idContent",
        as: "Like_and_Comments",
      });
    }
  }
  Berita.init(
    {
      category: DataTypes.STRING,
      title: DataTypes.STRING,
      picture: DataTypes.STRING,
      content: DataTypes.TEXT,
      author: DataTypes.STRING,
      periode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Berita",
    }
  );
  return Berita;
};
