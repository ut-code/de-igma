"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { periodicCaesarCipher } from "./periodicCaesarCipher.js";
var questionElement = document.getElementById("question");
var submitButton = document.getElementById("submit");
var nextButton = document.getElementById("next");
var currentQuestionIndex = 0;
var questionCount = 0;
var quizData = [];

async function fetchHirabun() {
  const response = await fetch("/data");
  const hirabunArray = await response.json();
  for (const dataRow of hirabunArray) {
    const hirabun = dataRow.EnglishSentences;
    const maxKeyLength = Math.floor(hirabun.length / 6);
    const keyLength = Math.floor(Math.random() * maxKeyLength) + 1;
    const randomKey = []
    for (let i = 0; i < keyLength; i++) {
        randomKey.push(Math.floor(Math.random() * 26));
    }
    const formattedData = {
      hirabun: hirabun,
      key: randomKey,
      cipher: periodicCaesarCipher(hirabun, randomKey)
    };
    quizData.push(formattedData);
  }
  return quizData;
}
async function showQuestion() {
  quizData = await fetchHirabun();
  var question = quizData[currentQuestionIndex];
  questionElement.textContent = question.cipher;
}

function checkAnswer() {
  var answer = document.getElementById("answer").value;
  var question = quizData[currentQuestionIndex].hirabun;
  if (answer === question) {
    alert("正解！");
  } else {
    alert("不正解！");
  }
  nextButton.disabled = false;
  submitButton.disabled = true;
}
function nextQuestion() {
  currentQuestionIndex = Math.floor(Math.random() * quizData.length);
  questionCount++;
  if (questionCount > 10) {
    alert("終了！");
    nextButton.disabled = true;
    submitButton.disabled = true;
  } else {
    showQuestion();
  }
  nextButton.disabled = true;
  submitButton.disabled = false;
}
showQuestion();
submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
  