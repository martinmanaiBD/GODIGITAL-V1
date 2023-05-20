const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Business extends Model {
    static associate(models) {
      Business.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  Business.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    averageRevenue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessNature: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    franchiseStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    franchiseNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    documentPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Business',
  });

  return Business;
};
