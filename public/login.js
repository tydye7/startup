const express = require('express');
const router = express.Router();

// Handle POST request to /api/login
router.post('/api/login', (req, res) => {
  const { username, password } = req.body;

    // Check if username and password are correct
  
  if (authenticated) {
    res.json({ success: true, message: "Authentication successful." });
  } else {
    res.status(401).json({ success: false, message: "Invalid username or password. Please try again." });
  }
});

module.exports = router;