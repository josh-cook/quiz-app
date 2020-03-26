const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "The answer to life is:",
    choice1: "1",
    choice2: "2",
    choice3: "42",
    choice4: "69",
    answer: 3
  },
  {
    question: "The answer to death is:",
    choice1: "1",
    choice2: "2",
    choice3: "42",
    choice4: "69",
    answer: 4
  },
  {
    question: "The answer to poop is:",
    choice1: "88",
    choice2: "2",
    choice3: "42",
    choice4: "69",
    answer: 1
  }
];

const correctBonus = 10;
const maxQuestions = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question: ${questionCounter} / ${maxQuestions}`;
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selecterAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selecterAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(correctBonus);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
