const { DataTypes, Model } = require('sequelize');
const Address = require('./Address');
const Business = require('./Business');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Address, {
        foreignKey: 'userId',
        as: 'address',
      });
      User.hasOne(models.Business, {
        foreignKey: 'userId',
        as: 'business',
      });
      User.hasMany(models.CartItem, {
        foreignKey: 'userId',
        as: 'cartItems',
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preferredMediumOfCommunication: {
      type: DataTypes.ENUM,
      values: ['sms', 'whatsapp'],
      allowNull: false,
    },
    businessCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acceptanceToTermsAndConditions: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
