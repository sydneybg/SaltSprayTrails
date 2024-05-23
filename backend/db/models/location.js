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
      // Location.hasMany(models.Review, {
      //   foreignKey: 'locationId',
      //   onDelete: 'CASCADE',
      //   hooks: true
      // });
      Location.belongsToMany(models.Collection, {
        through: models.CollectionLocation,
        foreignKey: 'locationId'
      });
    }
  };

  Location.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activity_type: {
        type: DataTypes.ENUM('swimming', 'surfing', 'rafting', 'kayaking'),
        allowNull: false,
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
      modelName: 'Location'
    }
  );
  return Location;
};


// /: Delimiters that mark the start and end of the regular expression pattern.
// ^: Anchors the match at the start of the string.
// \d{5}: Matches exactly five digits. \d is a shorthand for any digit character (0-9), and {5} specifies that there must be exactly five occurrences of the preceding digit pattern.
// (-\d{4})?: This part of the pattern matches an optional hyphen followed by exactly four digits. Here's what each component does:
// (-\d{4}): Matches a hyphen (-) followed by exactly four digits.
// ?: Makes the preceding group ( -\d{4} ) optional. This means that the hyphen and four digits are not required for a match.
// $: Anchors the match at the end of the string.
