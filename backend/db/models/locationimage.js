'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LocationImage extends Model {

    static associate(models) {
      LocationImage.belongsTo(models.Location,
        { foreignKey: 'locationId',
          onDelete: 'CASCADE'
         });
    }
  };

  LocationImage.init({
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'LocationImage',
    timestamps: true
  });

  return LocationImage;
};
