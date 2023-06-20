delete require.cache[require.resolve('./database.js')];
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
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
