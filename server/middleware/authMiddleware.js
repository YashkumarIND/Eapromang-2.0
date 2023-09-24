const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const User = require('../models/User'); // Import the User model

const protectRoute = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Store user data in the request

    // Check if the user exists
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next(); // Continue to the protected route
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = protectRoute;
