'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.hasMany(models.LocationImage, {
        foreignKey: 'locationId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Location.hasMany(models.Review, {
        foreignKey: 'locationId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Location.belongsToMany(models.Collection, {
        through: models.CollectionLocation,
        foreignKey: 'locationId'
      });
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
        allowNull: false,
        validate: {
          is: {
            args: [/^\d{5}(-\d{4})?$/],
            msg: 'Zip code must be in the format 12345 or 12345-6789'
          }
        }
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: {
            args: [-90],
            msg: 'Latitude must be between -90 and 90'
          },
          max: {
            args: [90],
            msg: 'Latitude must be between -90 and 90'
          }
        }
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: {
            args: [-180],
            msg: 'Longitude must be between -180 and 180'
          },
          max: {
            args: [180],
            msg: 'Longitude must be between -180 and 180'
          }
        }
      }
    }, {
      sequelize,
      modelName: 'Location'
    }
  );
  return Location;
};
