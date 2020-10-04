'use strict';
const { Model } = require('sequelize');
const isAfter = require('date-fns/isAfter');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: true,
        },
      },
      birthday: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isBefore(v) {
            if (isAfter(new Date(v), new Date())) {
              throw new Error("Birthday can't be in the future");
            }
          },
        },
      },
      isMale: { type: DataTypes.BOOLEAN, field: 'is_male' },
      password: {
        type: DataTypes.TEXT,
        field: 'password_hash',
        allowNull: false,
        validate: {
          notNull: true,
        },
        set(value) {
          this.setDataValue('password', 'hashed password');
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    }
  );
  return User;
};
