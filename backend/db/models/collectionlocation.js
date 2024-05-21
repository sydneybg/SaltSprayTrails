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
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Collection',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Location',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'CollectionLocation',
    timestamps: true
  });

  return CollectionLocation;
};
