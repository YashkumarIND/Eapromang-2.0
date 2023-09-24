// Import required modules and packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB using Mongoose
const dbURI = process.env.MONGODB_URI; // Replace with your MongoDB URI from .env
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Define your routes
const authroutes = require('./routes/authroutes'); // Import your auth routes
app.use('/api/auth', authroutes); // Use your auth routes with a base path


// Start the Express server
const port = process.env.PORT || 3001; // Use the port from .env or default to 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
