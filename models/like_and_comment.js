"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like_and_Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like_and_Comment.belongsTo(models.Berita, {
        foreignKey: "id",
        as: "beritas",
      });
    }
  }
  Like_and_Comment.init(
    {
      idContent: DataTypes.STRING,
      countLike: DataTypes.INTEGER,
      ip: DataTypes.STRING,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Like_and_Comment",
    }
  );
  return Like_and_Comment;
};
