const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { saveScore, fetchScores } = require('./database.js');

// Handle POST request to /api/login
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Authenticate the user by comparing the provided credentials with those stored in the database
  fetchScores()
    .then(scores => {
      const user = scores.find(score => score.username === username);
      if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ success: true, message: 'Authentication successful.' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password. Please try again.' });
      }
    })
    .catch(error => {
      console.error('Error fetching scores:', error);
      res.status(500).json({ success: false, message: 'An error occurred while authenticating the user.' });
    });
});

// Handle POST request to /api/register
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Save the user in the database
  saveScore(username, hashedPassword)
    .then(() => {
      res.json({ success: true, message: 'Registration successful.' });
    })
    .catch(error => {
      console.error('Error saving score:', error);
      res.status(500).json({ success: false, message: 'An error occurred while registering the user.' });
    });
});

module.exports = router;
