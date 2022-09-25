'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sabda_Padua extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sabda_Padua.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sabda_Padua',
  });
  return Sabda_Padua;
};