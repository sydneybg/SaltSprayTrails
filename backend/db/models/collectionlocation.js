'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CollectionLocation extends Model {
    static associate(models) {
      CollectionLocation.belongsTo(models.Collection, {
        foreignKey: 'collectionId',
        onDelete: 'CASCADE'
      });
      CollectionLocation.belongsTo(models.Location, {
        foreignKey: 'locationId',
        onDelete: 'CASCADE'
      });
    }
  };

  CollectionLocation.init({
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Collection',
        key: 'id'
      }
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Location',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'CollectionLocation',
    timestamps: true
  });

  return CollectionLocation;
};
