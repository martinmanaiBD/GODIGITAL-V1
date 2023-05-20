const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Application extends Model {
      static associate(models) {
        Application.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
      }
    }

Application.init({
  applicationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
}, {
  sequelize,
  modelName: 'Application',
});

return Application;
};
