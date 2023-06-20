const express = require('express');
const app = express();
const path = require('path');
const DB = require('./database.js');

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static('public'));

// Routes
const loginRouter = require('./public/login');
const aboutRouter = require('./public/about');
const scoresRouter = require('./public/scores');

app.use('/api/login', loginRouter);
app.use('/api/about', aboutRouter);

// Add a new API endpoint to fetch the random quote
app.get('/api/quote', (_req, res) => {
  const randomQuote = 'This is a random quote.';
  res.json({ content: randomQuote });
});

app.use('/api/scores', scoresRouter);

app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'play.html'));
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});