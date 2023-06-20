const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

// Create a MongoClient
const client = new MongoClient(url);
let scoreCollection;

async function testConnection() {
  try {
    await client.connect();
    console.log('Connected to the database successfully');
    scoreCollection = client.db().collection('score'); // Initialize the score collection
  } catch (error) {
    console.log(`Unable to connect to the database at ${url}: ${error.message}`);
    process.exit(1);
  }
}

async function saveScore(username, score) {
  try {
    const newScore = { username, score };
    const result = await scoreCollection.insertOne(newScore);
    console.log('Score saved:', result.ops[0]);
    return result.ops[0];
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
}

async function fetchScores() {
  try {
    const scores = await scoreCollection.find().sort({ score: -1 }).limit(10).toArray();
    console.log('Fetched scores:', scores);
    return scores;
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
}

module.exports = {
  client,
  testConnection,
  saveScore,
  fetchScores
};