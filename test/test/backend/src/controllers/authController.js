const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../sequelize');
const User = sequelize.models.User;

exports.register = async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    icNumber,
    password,
    preferredMediumOfCommunication,
    businessCategory,
    acceptanceToTermsAndConditions,
  } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('Email already exists');
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      icNumber,
      password: hashedPassword,
      preferredMediumOfCommunication,
      businessCategory,
      acceptanceToTermsAndConditions,
    });

    console.log('User created successfully:', newUser);

    // Generate a JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    console.log('JWT token generated:', token);

    // Set JWT token as an HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    
    

    

    // Send the response
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Invalid email or password (email not found)');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid email or password (password mismatch)');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    console.log('JWT token generated:', token);

    // Set JWT token as an HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    });
    
    

    // Send the response
    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserData = async (req, res) => {
  // The user object should be attached to the request by the authMiddleware
  if (req.user) {
    console.log('User data fetched:', req.user);
    res.status(200).json({ message: 'User data fetched', user: req.user });
  } else {
    console.log('User data not found');
    res.status(404).json({ message: 'User data not found' });
  }
};

exports.updateUserData = async (req, res) => {
  console.log('Request body:', req.body);
  const {
    fullName,
    email,
    phoneNumber,
    icNumber,
    preferredMediumOfCommunication,
    businessCategory,
  } = req.body;

  try {
    const updatedUser = await req.user.update({
      fullName,
      email,
      phoneNumber,
      icNumber,
      preferredMediumOfCommunication,
      businessCategory,
    });

    console.log('User updated successfully:', updatedUser);
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.checkSession = (req, res) => {
  // The user object should be attached to the request by the authMiddleware
  if (req.user) {
    console.log('Session is valid:', req.user);
    res.status(200).json({ message: 'Session is valid', user: req.user });
  } else {
    console.log('Invalid session');
    res.status(401).json({ message: 'Invalid session' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

