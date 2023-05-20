// backend/src/sequelize.js

const { Sequelize } = require('sequelize');
const userModel = require('./models/User');
const addressModel = require('./models/Address');
const businessModel = require('./models/Business');
const cartItemModel = require('./models/CartItem');
const applicationModel = require('./models/Application');
const productModel = require('./models/Product');


const sequelize = new Sequelize('defaultdb', 'doadmin', 'AVNS_5aCodYz6-TNAvisuLMs', {
  host: 'db-postgresql-sgp1-34671-do-user-13699698-0.b.db.ondigitalocean.com',
  port: 25060,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const User = userModel(sequelize);
const Address = addressModel(sequelize);
const Business = businessModel(sequelize);
const CartItem = cartItemModel(sequelize);
const Application = applicationModel(sequelize);
const Product = productModel(sequelize);


// Use sync method to create tables automatically
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database and tables created successfully!');
  })
  .catch((error) => {
    console.error('Error creating database and tables: ', error);
  });

sequelize.models = {
  User,
  Address,
  Business,
  CartItem,
  Application,
  Product,

};

// Initialize the models with their associations
User.associate(sequelize.models);
Address.associate(sequelize.models);
Business.associate(sequelize.models);
CartItem.associate(sequelize.models);
Application.associate(sequelize.models);

module.exports = sequelize;
