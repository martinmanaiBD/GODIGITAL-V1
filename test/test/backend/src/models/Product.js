const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Product extends Model {}

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    productDes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    productSKU: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    productCategory: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
