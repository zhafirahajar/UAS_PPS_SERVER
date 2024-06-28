'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.Grooming, {foreignKey: "grooming_id"}),
      History.belongsTo(models.Penitipan, {foreignKey: "penitipan_id"}),
      History.belongsTo(models.Dokter, {foreignKey: "dokter_id"}),
      History.belongsTo(models.Jadwal, {foreignKey: "jadwal_id"}),
      History.belongsTo(models.Kucing, {foreignKey: "kucing_id"}),
      History.belongsTo(models.Owner, {foreignKey: "owner_id"})
    }
  }
  History.init({
    status: DataTypes.BOOLEAN,
    grooming_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    penitipan_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dokter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jadwal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'jadwal_id required',
        }
      }
    },
    kucing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'kucing_id required',
        }
      }
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'owner_id required',
        }
      }
    },
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};