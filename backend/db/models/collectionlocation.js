'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CollectionLocation extends Model {
    static associate(models) {
      CollectionLocation.belongsTo(models.Collection, { foreignKey: 'collectionId' });
      CollectionLocation.belongsTo(models.Location, { foreignKey: 'locationId' });
    }
  };

  CollectionLocation.init(
    {
      collectionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'CollectionLocation'
    }
  );
  return CollectionLocation;
};
