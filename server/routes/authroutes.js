const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Teams = require('../models/Teams');
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


router.post('/teams', async (req, res) => {
  const { projectName, teamMembers, creator } = req.body;

  try {
    // Find the team in the database
    let team = await Teams.findOne({ projectName });

    // If the team doesn't exist, create a new team
    if (!team) {
      // Create a new team
      team = new Teams({
        projectName,
        teamMembers, // Assuming teamMembers is an array of strings
        creator,
      });

      // Save the new team to the database
      await team.save();

      return res.status(201).json({ message: 'Team created successfully' });
    } else {
      return res.status(400).json({ message: 'Team with this project name already exists' });
    }
  } catch (error) {
    console.error('Team creation failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/teams-by-email/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Find teams where the email is the creator
    const creatorTeams = await Teams.find({ creator: email });

    // Find teams where the email is a team member
    const memberTeams = await Teams.find({ teamMembers: email });

    // Extract team names from the results
    const creatorTeamNames = creatorTeams.map((team) => team.projectName);
    const memberTeamNames = memberTeams.map((team) => team.projectName);

    return res.status(200).json({ creatorTeams: creatorTeamNames, memberTeams: memberTeamNames });
  } catch (error) {
    console.error('Error fetching teams by email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;