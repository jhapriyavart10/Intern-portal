
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Get current user
router.get('/me', async (req, res) => {
  try {
    // Get token from cookie or header
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register new user
router.post('/register', async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Create new user
      user = new User({
        username,
        email,
        password,
        role: role || 'applicant' // Default role
      });
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      
      await user.save();
      
      // Create JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });
      
      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
      
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Login user
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      // Create JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });
      
      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
      
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Make sure you have the module.exports at the end
  module.exports = router;