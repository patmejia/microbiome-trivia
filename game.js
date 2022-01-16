// create constant question: getelementbyid 'question'
// create constant choice: array from getelementbyclassname 'choice-text'
// create constant progressText: getelementbyid 'progressText'
// create constant scoreText: getelementbyid 'progressBarFull'
// create constant progressBarFull: getelementbyid 'progressBarFull'
// create constant loader: getelementbyid 'loader'

// const { constants } = require("buffer");   // import constants from buffer

// create constant game: getelementbyid 'game'
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
// const loader = document.getElementById('loader');
// const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// fecth questions and choices from questions.json file then res return res.json
fetch('questions.json')
    .then(res => {  // res is the response from the fetch
        return res.json();  // return the response as json
    })
    .then(loadedQuestions => {  // loadedQuestions is the json object
        questions = loadedQuestions;    // questions is the json object
        startGame(); // start the game
    })
    .catch(err => { // if there is an error
        console.error(err); // log the error
    });


// Constants 

// create constant CORRECT_BONUS: 10
const CORRECT_BONUS = 10;   // 10 points for correct answer
// create constant MAX_QUESTIONS: 10
const MAX_QUESTIONS = 3;   // 3 questions per game 
// add loop startGame() that will start the game: questionCounter 0, score 0, availableQuestions [...questions], getnewquestions()
startGame = () => {   // startGame() function 
    questionCounter = 0;
    score = 0;  // reset score to 0
    availableQuestions = [...questions];    // availableQuestions is the questions array
    getNewQuestion(); 
};
// add if/then getNewQuestion() that will randomly select a question from availableQuestions and store it in currentQuestion variable.
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score); // set the most recent score to local storage
        //go to the end page
        return window.location.assign('end.html');  // go to end.html
    }
    questionCounter++;  // questionCounter is the number of questions
    // randomly select a question and store it in currentQuestion variable
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    // remove the selected question from the availableQuestions array
    availableQuestions.splice(questionIndex, 1);
    // display the question
    question.innerText = currentQuestion.question;
    // for each choice in choices: choice addeventlistener click e to if accepting answer return then acceptAnswer() false: const seletetedchoice = e.target, const selectedAnswer = selectedchoice.dataset.answer Number, getquestions()
    choices.forEach(choice => {
        choice.addEventListener
        ('click', e => {
            if (!acceptingAnswers) return;
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];    // selectedAnswer is a number
            getNewQuestion();
        };
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // go to the end page
        return window.location.assign('end.html');
    }
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    // randomly select a question and store it in currentQuestion variable
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    // remove the selected question from the availableQuestions array
    availableQuestions.splice(questionIndex, 1);
    // display the question
    question.innerText = currentQuestion.question;
    // for each choice in choices: choice addeventlistener click e to if accepting answer return then acceptAnswer() false: const seletetedchoice = e.target, const selectedAnswer = selectedchoice.dataset.answer Number, getquestions()
    choices.forEach(choice => {
        choice.addEventListener
        ('click', e => {
            if (!acceptingAnswers) return;
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number']
            // add const classToApply: selectedAnswer:: currentQuestion.answer === selectedAnswer ? 'correct' : 'incorrect'
            const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';
            if (classToApply === 'correct') {
                incrementScore(CORRECT_BONUS);
            }
            selectedChoice.parentElement.classList.add(classToApply);
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }   , 1000);
        });
    });
// incrementScore 
incrementScore = num => {
    score += num;
    scoreText.innerText = score;

};