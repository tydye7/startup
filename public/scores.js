const express = require('express');
const router = express.Router();
const DB = require('../database.js');

// Handle GET request to /api/scores
router.get('/', (_req, res) => {
  // Fetch scores from the database
  DB.fetchScores()
    .then(scores => {
      res.json({ highScores: scores });
    })
    .catch(error => {
      console.error('Error fetching scores:', error);
      res.status(500).json({ error: 'Failed to fetch scores' });
    });
});

// Handle POST request to /api/scores
router.post('/', (req, res) => {
  const { username, score } = req.body;
  // Save the score to the database
  DB.saveScore(username, score)
    .then(savedScore => {
      res.json(savedScore);
    })
    .catch(error => {
      console.error('Error saving score:', error);
      res.status(500).json({ error: 'Failed to save score' });
    });
});

module.exports = router;
