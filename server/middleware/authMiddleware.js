const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const protectRoute = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  console.log('Received token:', token);

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded token:', decoded);
    req.user = decoded; // Store user data in the request
    next(); // Continue to the protected route
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};



module.exports = protectRoute;

