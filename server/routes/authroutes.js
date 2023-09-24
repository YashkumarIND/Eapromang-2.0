const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.JWT_SECRET;
const tokenExpiration = process.env.JWT_EXPIRATION;

// Import the protectRoute middleware
const protectRoute = require('..//middleware/authMiddleware');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  let user = await User.findOne({ email });

  // If the user doesn't exist, create a new user
  if (!user) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      user = await User.create({
        email,
        password: hashedPassword,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Verify the password
  if (bcrypt.compareSync(password, user.password)) {
    // Passwords match, generate a JWT
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: tokenExpiration,
    });

    // Send the JWT as a response
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: 'Authentication failed' });
  }
});

// Protected route example
router.get('/protected', protectRoute, (req, res) => {
  // This route is protected and can only be accessed by authenticated users
  res.status(200).json({ message: 'You are authorized to access this route!' });
});


module.exports = router;
