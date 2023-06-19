const express = require('express');
const app = express();
const path = require('path');

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



const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
