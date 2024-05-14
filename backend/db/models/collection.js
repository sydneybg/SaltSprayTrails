'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      Collection.belongsTo(models.User, { foreignKey: 'userId' });
      Collection.belongsToMany(models.Location, { through: models.CollectionLocation, foreignKey: 'collectionId' });
    }
  };

  Collection.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Collection'
    }
  );
  return Collection;
};
