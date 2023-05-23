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
  
  // Function to display the current question
  function displayQuestion() {
    const questionElement = document.getElementById("question");
    questionElement.textContent = triviaData[currentQuestionIndex].question;
  }
  
  // Function to check the user's answer
  function checkAnswer() {
    const userAnswer = document.getElementById("answer").value;
    const resultElement = document.getElementById("result");
  
    if (userAnswer.toLowerCase() === triviaData[currentQuestionIndex].answer.toLowerCase()) {
      resultElement.textContent = "Correct!";
    } else {
      resultElement.textContent = "Wrong answer. Try again!";
    }
  
    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < triviaData.length) {
      displayQuestion();
    } else {
      // Display game over message
      questionElement.textContent = "Game Over";
      document.getElementById("answer").style.display = "none";
      document.getElementById("result").style.display = "none";
    }
  }
  
  // Start the game
  displayQuestion();
  