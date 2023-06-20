const express = require('express');
const router = express.Router();

// Handle GET request to /api/about
router.get('/', (_req, res) => {
  const aboutMessage = 'This is a trivia game web application.';
  res.json({ message: aboutMessage });
});

module.exports = router;
