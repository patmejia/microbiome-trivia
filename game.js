// create constant question: getelementbyid 'question'
// create constant choice: array from getelementbyclassname 'choice-text'
// create constant progressText: getelementbyid 'progressText'
// create constant scoreText: getelementbyid 'progressBarFull'
// create constant progressBarFull: getelementbyid 'progressBarFull'
// create constant loader: getelementbyid 'loader'
// create constant game: getelementbyid 'game'
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];



