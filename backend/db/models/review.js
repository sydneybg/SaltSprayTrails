'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.belongsTo(models.Location, { foreignKey: 'locationId' });
    }
  };

  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Review'
    }
  );
  return Review;
};
