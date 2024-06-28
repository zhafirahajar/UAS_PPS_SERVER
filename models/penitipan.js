'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penitipan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Penitipan.hasMany(models.Jadwal, {foreignKey: "penitipan_id"}),
      Penitipan.hasMany(models.History, {foreignKey: "penitipan_id"})
    }
  }
  Penitipan.init({
    type: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    durasi: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Penitipan',
  });
  return Penitipan;
};