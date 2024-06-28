'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grooming extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Grooming.hasMany(models.Jadwal, {foreignKey: "grooming_id"}),
      Grooming.hasMany(models.History, {foreignKey: "grooming_id"})
    }
  }
  Grooming.init({
    type: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Grooming',
  });
  return Grooming;
};