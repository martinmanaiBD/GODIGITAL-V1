const sequelize = require('./src/sequelize')
require('dotenv').config();
const app = require('./app');
const User = require('./src/models/User')(sequelize);
const Address = require('./src/models/Address')(sequelize);
const Business = require('./src/models/Business')(sequelize);
const CartItem = require('./src/models/CartItem')(sequelize);
const Application = require('./src/models/Application')(sequelize);
const Product = require('./src/models/Product')(sequelize);


// Define the relationship between User and Address models
User.hasOne(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });
Business.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(CartItem, { foreignKey: 'userId' }); // Add this line
CartItem.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Application, {foreignKey: 'userId'}); // Add this line
Application.belongsTo(User, { foreignKey: 'userId' });


// Sync models with the database
sequelize.sync();

module.exports = {
    User,
    Address,
    Business,
    CartItem,
    Application,
    Product,

};

