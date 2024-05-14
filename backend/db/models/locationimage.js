'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LocationImage extends Model {
    static associate(models) {
      LocationImage.belongsTo(models.Location, { foreignKey: 'locationId' });
    }
  };

  LocationImage.init(
    {
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'LocationImage'
    }
  );
  return LocationImage;
};
