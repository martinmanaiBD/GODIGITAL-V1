const jwt = require('jsonwebtoken');
const sequelize = require('../sequelize');
const User = sequelize.model('User');


const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log('Token from cookie:', token); // Log the token value

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT payload:', decoded);

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = authMiddleware;
