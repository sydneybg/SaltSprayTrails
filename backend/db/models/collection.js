'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      Collection.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Collection.belongsToMany(models.Location, { through: models.CollectionLocation, foreignKey: 'collectionId' });
    }
  };

  Collection.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255] // validates length
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255] // validates length
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // reflects the migration setting
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // reflects the migration setting
    }
  }, {
    sequelize,
    modelName: 'Collection',
    timestamps: true, // Sequelize manages createdAt and updatedAt
    defaultScope: {
      attributes: {
        exclude: ['userId']
      }
    }
  });

  return Collection;
};
