// ----------------- DOM ELEMENTS -----------------
const startScreen = document.querySelector(".startScreen");
const startButton = document.querySelector(".startButton");

const quizScreen = document.querySelector(".quizScreen");
const questionText = document.querySelector(".questionText");
const answerButtons = document.querySelectorAll(".answerButton");
const nextButton = document.querySelector(".nextButton");

const endScreen = document.querySelector(".endScreen");
const scoreText = document.querySelector(".scoreText");
const restartButton = document.querySelector(".restartButton");

// ----------------- QUIZ DATA -----------------
const quiz = [
  {
    question: "What is the fastest way to eat spaghetti?",
    options: ["With chopsticks", "Using a vacuum", "Teleportation", "Mouth only"],
    answer: "Teleportation"
  },
  {
    question: "If a duck wore a monocle, what would it read?",
    options: ["Duck Tales", "War and Peace", "Quantum Physics for Ducks", "Daily Bread"],
    answer: "Duck Tales"
  },
  {
    question: "What is 9 + 10?",
    options: ["19", "21", "42", "1000"],
    answer: "21"
  },
  {
    question: "Which animal would win in a dance battle?",
    options: ["Sloth", "Penguin", "Goat", "Cactus (why not?)"],
    answer: "Cactus (why not?)"
  },
  {
    question: "Why do programmers love dark mode?",
    options: ["Because light attracts bugs", "It's cool", "No reason", "Aliens told them"],
    answer: "Because light attracts bugs"
  },
  {
    question: "If you could only eat one thing forever, what would it be?",
    options: ["Pizza", "Socks", "Air", "Banana bread on Mars"],
    answer: "Banana bread on Mars"
  },
  {
    question: "What is the secret ingredient in spaghetti?",
    options: ["Tomatoes", "Magic", "Love", "Duck tears"],
    answer: "Magic"
  }
];



// ----------------- STATE -----------------
let currentQuestion = 0;
let score = 0;

// ----------------- START QUIZ -----------------
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "flex";
    nextButton.style.display = "none";
    showQuestion(currentQuestion);
});

// ----------------- SHOW QUESTION -----------------
function showQuestion(index) {
    const q = quiz[index];
    questionText.textContent = q.question;
    
    answerButtons.forEach((btn, i) => {
        btn.textContent = q.options[i];
        btn.disabled = false;
        btn.style.backgroundColor = "#4CAF50"; // reset color
        btn.onclick = () => selectAnswer(q.options[i], btn);
    });
}

// ----------------- SELECT ANSWER -----------------
function selectAnswer(selected, btn) {
    const correct = quiz[currentQuestion].answer;
    
    if (selected === correct) {
        score++;
        btn.style.backgroundColor = "green";
    } else {
        btn.style.backgroundColor = "red";
        // Highlight correct button
        answerButtons.forEach(b => {
            if(b.textContent === correct) b.style.backgroundColor = "green";
        });
    }

    // Disable all buttons after selection
    answerButtons.forEach(b => b.disabled = true);
    nextButton.style.display = "inline-block"; // show Next button
}

// ----------------- NEXT QUESTION -----------------
nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quiz.length) {
        showQuestion(currentQuestion);
        nextButton.style.display = "none"; // hide Next button
    } else {
        endQuiz();
    }
});

// ----------------- END QUIZ -----------------

// At the end of quiz, show a funny message based on score
function endQuiz() {
    quizScreen.style.display = "none";
    endScreen.style.display = "flex";
    let message;
    
    if(score === quiz.length) message = "Genius level: You are basically a wizard 🧙‍♂️!";
    else if(score >= quiz.length / 2) message = "Not bad! Your brain is slightly above a potato 🥔";
    else message = "Oops… even a duck is smarter than you 🦆";
    
    scoreText.textContent = `Your score: ${score}/${quiz.length}\n${message}`;
}


// ----------------- RESTART QUIZ -----------------
restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    endScreen.style.display = "none";
    startScreen.style.display = "flex";
});
