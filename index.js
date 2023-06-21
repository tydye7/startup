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
        if (message.startsWith('username:')) {
          const username = message.replace('username:', '').trim();
          activePlayers.add(username);
          ws.username = username;
        }
    
        const activePlayersList = Array.from(activePlayers);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(activePlayersList));
          }
        });
      });
    
      ws.on('close', () => {
        activePlayers.delete(ws.username);
    
        const activePlayersList = Array.from(activePlayers);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(activePlayersList));
          }
        });
      });
    
      const activePlayersList = Array.from(activePlayers);
      ws.send(JSON.stringify(activePlayersList));
    });    

  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
