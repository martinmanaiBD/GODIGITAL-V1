// Address.js
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  Address.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users', // The table name in your database
        key: 'id',
      },
    },
    fullAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Address',
  });

  return Address;
};
