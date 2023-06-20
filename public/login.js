const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { saveScore, fetchScores, client, saveUser, findUser } = require('../database');

// Handle POST request to /api/login
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await findUser(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ success: true, message: 'Authentication successful.' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password. Please try again.' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ success: false, message: 'An error occurred while authenticating the user.' });
  }
});

// Handle POST request to /api/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Save the user in the database
    await saveUser(username, hashedPassword);

    res.json({ success: true, message: 'Registration successful.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'An error occurred while registering the user.' });
  }
});

module.exports = router;
