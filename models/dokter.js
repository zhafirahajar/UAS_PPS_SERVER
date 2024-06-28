'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dokter extends Model {
    static associate(models) {
      Dokter.hasMany(models.Jadwal, {foreignKey: "dokter_id"}),
      Dokter.hasMany(models.History, {foreignKey: "dokter_id"})
    }
  }
  Dokter.init({
    nama: DataTypes.STRING,
    lulusan: DataTypes.STRING,
    harga_layanan: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Dokter',
  });
  return Dokter;
};