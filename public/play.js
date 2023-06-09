// Define an array of trivia questions and answers
const triviaData = [
  {
    question: "What is the capital of France?",
    answer: "Paris"
  },
  {
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter"
  },
  {
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the tallest mountain in the world?",
    answer: "Mount Everest"
  },
  {
    question: "What is the largest country in the world?",
    answer: "Russia"
  },
  {
    question: "What is the longest river in the world?",
    answer: "Nile"
  },
  {
    question: "What is the diameter of Earth?",
    answer: "8,000 miles"
  },
  {
    question: "What is the largest ocean in the world?",
    answer: "Pacific Ocean"
  },
  {
    question: "What is the largest animal in the world?",
    answer: "Blue Whale"
  },
  {
    question: "What is the largest bird in the world?",
    answer: "Ostrich"
  }
  // ...rest of the questions
];

let currentQuestionIndex = 0;
let score = 0;

// Function to start the game
function startGame() {
  document.querySelector(".button-container").style.display = "none";
  document.querySelector(".question-container").style.display = "block";
  displayQuestion();
}

// Function to display the current question
function displayQuestion() {
  const questionElement = document.getElementById("question");
  const questionCountElement = document.getElementById("question-count");
  
  questionElement.textContent = triviaData[currentQuestionIndex].question;
  questionCountElement.textContent = `Question ${currentQuestionIndex + 1} of ${triviaData.length}`;
}

// Function to check the user's answer
function checkAnswer() {
  const userAnswer = document.getElementById("answer").value;
  const resultElement = document.getElementById("result");

  if (userAnswer.trim().toLowerCase() === triviaData[currentQuestionIndex].answer.toLowerCase()) {
    resultElement.textContent = "Correct!";
    score++; // Increment score if the answer is correct
  } else {
    resultElement.textContent = "Wrong answer. Try again!";
  }

  // Move to the next question or end the game
  currentQuestionIndex++;
  if (currentQuestionIndex < triviaData.length) {
    displayQuestion();
    document.getElementById("answer").value = "";
  } else {
    // Display game over message, update the database, and show the score
    resultElement.textContent = "Game Over";
    document.getElementById("answer").style.display = "none";
    updateDatabase(score);
    displayScore(score);
  }
}

// Function to update the database with the score
function updateDatabase(score) {
  const databaseData = {
    username: localStorage.getItem("username"),
    score: score
  };

  fetch('/api/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(databaseData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Score stored in the database:', data);
      displayHighScores();
    })
    .catch(error => {
      console.error('Error storing score in the database:', error);
    });
}

// Function to display the score
function displayScore(score) {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score: ${score}`;

  // Fetch updated high scores and display them
  fetch('/api/scores')
    .then((response) => response.json())
    .then((data) => {
      const highScoresList = document.getElementById('highScoresContainer');
      highScoresList.innerHTML = ''; // Clear existing content

      // Iterate over the high scores and create list items
      data.highScores.forEach((score) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.username}: ${score.score}`;
        highScoresList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error('Error fetching high scores:', error);
    });
}
