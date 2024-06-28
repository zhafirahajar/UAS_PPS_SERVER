'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jadwal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Jadwal.belongsTo(models.Grooming, {foreignKey: "grooming_id"})
      Jadwal.belongsTo(models.Dokter, {foreignKey: "dokter_id"})
      Jadwal.belongsTo(models.Penitipan, {foreignKey: "penitipan_id"})
    }
  }
  Jadwal.init({
    tanggal: DataTypes.DATE,
    jam: DataTypes.TIME,
    status: DataTypes.BOOLEAN,
    grooming_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dokter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    penitipan_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Jadwal',
  });
  return Jadwal;
};