import { periodicCaesarCipher } from './periodicCaesarCipher'

const questionElement = document.getElementById("question")!;
const answerElement = document.getElementById("answer")!;
const submitButton = document.getElementById("submit")as HTMLButtonElement;
const nextButton = document.getElementById("next")as HTMLButtonElement;

let currentQuestionIndex = 0;
let questionCount = 0;

const quizData= [
    {
      hirabun: 'abcde',
      key: 1,
      cipher: periodicCaesarCipher("abcde", 1),
    },
    {
        hirabun: 'cdefgh',
        key: 2,
        cipher: periodicCaesarCipher("cdefgh", 2),
    }
]

function showQuestion() {
    const question = quizData[currentQuestionIndex];
    questionElement.textContent = question.cipher;
}

function checkAnswer() {
    const question = quizData[currentQuestionIndex];
    const answer = answerElement.textContent;
    if (answer === question.hirabun) {
        alert("正解！");
    } else {
        alert("不正解！");
    }
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex = Math.floor(Math.random() * quizData.length);
    questionCount++;
    if (questionCount > 10) {
        alert("終了！");
    }
    else {
        showQuestion();
    }
    nextButton.disabled = true;
}

showQuestion();
submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
