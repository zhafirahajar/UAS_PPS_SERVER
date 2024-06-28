'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Owner.hasMany(models.Kucing, {foreignKey: "owner_id"}),
      Owner.hasMany(models.History, {foreignKey: "owner_id"})
    }
  }
  Owner.init({
    nama: DataTypes.STRING,
    telepon: DataTypes.STRING,
    alamat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Owner',
  });
  return Owner;
};