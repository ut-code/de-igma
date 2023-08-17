"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { caesarCipher } from "./caesarCipher.js";
var questionElement = document.getElementById("question");
var submitButton = document.getElementById("submit");
var nextButton = document.getElementById("next");
var currentQuestionIndex = 0;
var questionCount = 0;
// var quizData = [
//     {
//         hirabun: 'abcde',
//         key: 1,
//         cipher: caesarCipher("abcde", 1),
//     },
//     {
//         hirabun: 'cdefgh',
//         key: 2,
//         cipher: caesarCipher("cdefgh", 2),
//     }
// ];
var quizData = [];
async function fetchHirabun() {
  const response = await fetch("/data");
  const hirabunArray = await response.json();
  for (const dataRow of hirabunArray) {
    const hirabun = dataRow.EnglishSentences;
    const randomKey = Math.floor(Math.random() * 26);
    const formattedData = {
      hirabun: hirabun,
      key: randomKey,
      cipher: caesarCipher(hirabun, randomKey),
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
    alert("不正解！, 答えは" + question + "です。");
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
