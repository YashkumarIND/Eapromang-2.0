const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.JWT_SECRET;
const tokenExpiration = process.env.JWT_EXPIRATION;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  let user = await User.findOne({ email });

  // If the user doesn't exist, respond with an error
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  // Verify the password
  if (bcrypt.compareSync(password, user.password)) {
    // Passwords match, generate a JWT
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: tokenExpiration,
    });

    // Logging for debugging
    console.log('Generated JWT:', token);

    // Send the JWT as a response to log in the user
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: 'Authentication failed' });
  }
});

module.exports = router;
