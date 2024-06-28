'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Kucing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kucing.belongsTo(models.Owner, {foreignKey: "owner_id"}),
      Kucing.hasMany(models.History, {foreignKey: "kucing_id"})
    }
  }
  Kucing.init({
    nama: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    ras: DataTypes.STRING,
    warna: DataTypes.STRING,
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'owner_id required',
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Kucing',
  });
  return Kucing;
};