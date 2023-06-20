const express = require('express');
const router = express.Router();
const DB = require('../database.js');

// Handle GET request to /api/scores
router.get('/', (_req, res) => {
  // Fetch scores from the database
  DB.fetchScores()
    .then(scores => {
      res.json(scores);
    })
    .catch(error => {
      console.error('Error fetching scores:', error);
      res.status(500).json({ error: 'Failed to fetch scores' });
    });
});

module.exports = router;


// Function to display the scores
function displayScores(scores, containerId) {
  const containerElement = document.getElementById(containerId);
  containerElement.innerHTML = ''; // Clear existing content

  scores.forEach(score => {
    const scoreElement = document.createElement('p');
    scoreElement.textContent = `${score.username}: ${score.score}`;
    containerElement.appendChild(scoreElement);
  });
}

// Fetch and display the scores
fetch('/api/scores')
  .then(response => response.json())
  .then(data => {
    const highScoresContainer = document.getElementById('highScoresContainer');
    const activeGamesContainer = document.getElementById('activeGamesContainer');

    const highScores = data.highScores;
    const activeGames = data.activeGames;

    displayScores(highScores, 'highScoresContainer');
    displayScores(activeGames, 'activeGamesContainer');
  })
  .catch(error => {
    console.error('Error fetching scores:', error);
  });
