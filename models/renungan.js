'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Renungan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Renungan.init({
    judul: DataTypes.STRING,
    isi: DataTypes.TEXT,
    foto: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Renungan',
  });
  return Renungan;
};