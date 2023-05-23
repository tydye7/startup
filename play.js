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
  }
];

let currentQuestionIndex = 0;

// Function to start the game
function startGame() {
  document.querySelector(".button-container").style.display = "none";
  document.querySelector(".question-container").style.display = "block";
  displayQuestion();
}

// Function to display the current question
function displayQuestion() {
  const questionElement = document.getElementById("question");
  questionElement.textContent = triviaData[currentQuestionIndex].question;
}

// Function to check the user's answer
function checkAnswer() {
  const userAnswer = document.getElementById("answer").value;
  const resultElement = document.getElementById("result");

  if (userAnswer.trim().toLowerCase() === triviaData[currentQuestionIndex].answer.toLowerCase()) {
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent = "Wrong answer. Try again!";
  }

  // Move to the next question or end the game
  currentQuestionIndex++;
  if (currentQuestionIndex < triviaData.length) {
    displayQuestion();
    document.getElementById("answer").value = "";
  } else {
    // Display game over message
    resultElement.textContent = "Game Over";
    document.getElementById("answer").style.display = "none";
  }
}
