const express = require('express');
const router = express.Router();

// Handle GET request to /api/scores
router.get('/', (_req, res) => {
  // Fetch scores from the database or any other data source
  const scores = [
    { username: 'John', score: 10 },
    { username: 'Jane', score: 15 },
    { username: 'Alice', score: 8 }
  ];

  res.json(scores);
});

module.exports = router;
