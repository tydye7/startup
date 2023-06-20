const express = require('express');
const app = express();
const path = require('path');
const DB = require('./database.js');
const WebSocket = require('ws');

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static('public'));

// Routes
const loginRouter = require('./public/login');
const aboutRouter = require('./public/about');
const scoresRouter = require('./public/scores.js');

app.use('/api/login', loginRouter);
app.use('/api/about', aboutRouter);
app.use('/api/scores', scoresRouter);

app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'play.html'));
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

DB.testConnection()
  .then(() => {
    // Start the WebSocket server
    const server = app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });

    // Create a WebSocket server instance
    const wss = new WebSocket.Server({ server });

    // Store connected clients
    const clients = new Set();

    // Store active players' usernames
    const activePlayers = new Set();

    // WebSocket server connection event
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Check if the message is a username
    if (message.startsWith('username:')) {
      const username = message.replace('username:', '').trim();
      // Add the username to the active players set
      activePlayers.add(username);
      ws.username = username; // Store the username as a property of the WebSocket object
    }

    // Broadcast the active players' usernames to all connected clients
    const activePlayersList = Array.from(activePlayers).join(', ');
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(activePlayersList);
      }
    });
  });

  ws.on('close', () => {
    // Remove the username from the active players set if present
    activePlayers.delete(ws.username);

    // Broadcast the updated list of active players
    const activePlayersList = Array.from(activePlayers).join(', ');
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(activePlayersList);
      }
    });
  });

  // Send the current list of active players to the newly connected client
  const activePlayersList = Array.from(activePlayers).join(', ');
  ws.send(activePlayersList);
});

  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
