'use strict';

const {
  Model, Validator
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(
        models.Location,
        { foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true}
      );

    }
  }
  User.init({
    firstName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        isAlpha: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Username cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      },
      set(value) {
        // Email address lowercase
        this.setDataValue('email', value.trim().toLowerCase());
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createAt", "updatedAt"]
      }
    }
  });
  return User;
};
