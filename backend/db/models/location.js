'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.hasMany(models.LocationImage, { foreignKey: 'locationId' });
      Location.hasMany(models.Review, { foreignKey: 'locationId' });
      Location.belongsToMany(models.Collection, { through: models.CollectionLocation, foreignKey: 'locationId' });
    }
  };

  Location.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activity_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Location'
    }
  );
  return Location;
};
