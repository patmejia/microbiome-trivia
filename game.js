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
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "A microbiome is the collection of genomes of all the microorganisms found in a particular environment. Some examples are all the bacteria, fungi, protozoa, and viruses that live on and inside the human body microbiome.",        // question 1
        choice1: "True",
        choice2: "False",
        answer: 1
    },
    {
        question: "The microbiota in the gut can be radically different from the microbiota that strives on the skin.",      // question 3
        choice1: "True",
        choice2: "False",
        answer: 1
    },
    {
        question: "The human body is, in fact, a “supraorganism”: a collection of human and microbial cells and genes. And thus, a blend of human and microbial traits.",     // question 5
        choice1: "True",
        choice2: "False",
        answer: 1
    },
];


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
        // localStorage.setItem('mostRecentScore', score); // set the most recent score to local storage
        // //go to the end page
        return window.location.assign('end.html');  // go to end.html
    }
    questionCounter++;  // questionCounter is the number of questions
    // questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;  // questionCounterText is the question counter text
    // randomly select a question and store it in currentQuestion variable
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;  // question is the question text
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
    // for each choice in choices: choice addeventlistener click e to if accepting answer return then acceptAnswer() false: const seletetedchoice = e.target, const selectedAnswer = selectedchoice.dataset.answer Number, getquestions()
    choices.forEach(choice => {
        choice.addEventListener
        ('click', e => {
            if (!acceptingAnswers) return; 
            acceptingAnswers = false; 
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];
            const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'; // if selectedAnswer is equal to currentQuestion.answer then classToApply is correct else classToApply is incorrect
            // if (classToApply === 'correct') {
            //     incrementScore(CORRECT_BONUS);
            // }
            selectedChoice.parentElement.classList.add(classToApply);       // add classToApply to the parent element of selectedChoice
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);        // remove classToApply from the parent element of selectedChoice
                getNewQuestion();
            }, 1000); 
        });     
    });     // end of choices.forEach()
    // add function incrementScore(number) that will add number to score and update the UI
    // incrementScore = num => {
    //     score += num;
    //     scoreText.innerText = score;
    // };
    // start game when page loads
    startGame();
