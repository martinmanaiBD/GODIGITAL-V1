const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const addressRoutes = require('./src/routes/addressRoutes');
const sequelize = require('./src/sequelize');
const businessRoutes = require('./src/routes/businessRoutes');
const cartRoutes = require('./src/routes/cartRoutes'); // Add this line
const productRoutes = require('./src/routes/productRoutes');
const { getProductById } = require("./src/controllers/productController");
const path = require('path');
const applicationRoutes = require('./src/routes/applicationRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Routes
app.use('/', authRoutes);
app.use('/address', addressRoutes);
app.use('/business', businessRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/cart', cartRoutes); // Add this line
app.use('/application', applicationRoutes); 
app.use('/product_image', express.static(path.join(__dirname, 'product_image')));
app.use('/product', productRoutes);



// Connect to the database and start the server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

module.exports = app;
