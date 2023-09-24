const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.JWT_SECRET;
const tokenExpiration = process.env.JWT_EXPIRATION;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    let user = await User.findOne({ email });

    // If the user doesn't exist, create a new user
    if (!user) {
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create a new user
      user = await User.create({
        email,
        password: hashedPassword,
      });
    }

    // Verify the password
    if (bcrypt.compareSync(password, user.password)) {
      // Passwords match, generate a JWT
      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: tokenExpiration,
      });

      // Send the JWT as a response to log in the user
      return res.status(200).json({ token });
    } else {
      // If the password doesn't match, respond with an authentication failed message
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
