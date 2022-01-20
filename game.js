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

let questions = [
    {
        question: "A microbiome is the collection of genomes of all the microorganisms found in a particular environment. Some examples are all the bacteria, fungi, protozoa, and viruses that live on and inside the human body microbiome. ",        // question 1
        choice1: "True",
        choice2: "False",
        answer: 1
    },
    {
        question: "In humans, the largest microbiome is the gut, particularly the large intestine.",        // question 2 
        choice1: "False",
        choice2: "True",
        answer: 2
    },
    {
        question: "The human body is a “supraorganism”: a collection of human and microbial cells and genes.",     // question 3
        choice1: "True",
        choice2: "False",
        answer: 1
    },
    {
        question: "Bacteria are, by far, the most numerous members of the human microbiome. The bacterial population alone is estimated between 75 to 200 trillion, while the entire somatic (body) cells are estimated between 50 to 100 trillion.",       // question 4
        choice1: "True",
        choice2: "False",
        answer: 1

    },
    {
        question: "The bacteria in the microbiome help digest our food, regulate our immune system, protect against other bacteria that cause disease, and produce vitamins including B vitamins B12, thiamine and riboflavin, and Vitamin K, which is needed for blood coagulation.",      // question 5
        choice1: "False",
        choice2: "True",
        answer: 2
    },
    { 
        question: "Type I diabetes is an autoimmune disease associated with a less diverse gut microbiome. In animal studies, bacteria play a role in developing diabetes.",   // question 6
        choice1: "False",
        choice2: "True",
        answer: 2
        
    },
    {
        question: "The gut microbiome is different between obese and lean twins. Obese twins have a lower diversity of bacteria, and higher levels of enzymes, meaning the obese twins are more efficient at digesting food and harvesting calories. Obesity has also been associated with a poor combination of microbes in the gut.",     // question 7
        choice1: "True",
        choice2: "False",
        answer: 1
    },
    {
        question: "The gut microbiome is different between obese and lean twins. Obese twins have a lower diversity of bacteria, and higher levels of enzymes, meaning the obese twins are more efficient at digesting food and harvesting calories. Obesity has also been associated with a poor combination of microbes in the gut.",   // question 8
        choice1: "False",
        choice2: "True",
        answer: 2
    },
    {
        question: "Autoimmune diseases such as diabetes, rheumatoid arthritis, muscular dystrophy, multiple sclerosis, and fibromyalgia are associated with dysfunction in the microbiome. ",   // question 9
        choice1: "True",
        choice2: "False",
        answer: 1
    },
    {
        question: "In unhealthy microbiomes, disease-causing microbes accumulate over time, changing gene activity and metabolic processes and resulting in an abnormal immune response against substances and tissues normally present in the body. ",   // question 10
        choice1: "False",
        choice2: "True",
        answer: 2
    },
    {
        question: "Autoimmune diseases appear to be passed in families not by DNA inheritance but by inheriting the family microbiome.",    // question 11
        choice1: "True",
        choice2: "False",
        answer: 1
    },
    {
        question: "Humans can restore their microbiome by eating lots of vegetables, legumes, beans, and fruits. Many fruits and vegetables are high in fiber. Fiber promotes the growth of beneficial gut bacteria, including specific types such as Bifidobacteria.",     // question 12
        choice1: "True",
        choice2: "False",
        answer: 1
    },
]   // end of questions array


// Constants 

// create constant CORRECT_BONUS: 10
const CORRECT_BONUS = 10;   // 10 points for correct answer
// create constant MAX_QUESTIONS: 10
const MAX_QUESTIONS = 10;   // 3 questions per game 
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
        // //go to the end page
        return window.location.assign('end.html');  // go to end.html
    }
    questionCounter++;  // questionCounter is the number of questions
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`; // progressText is the question counter
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; // progressBarFull is the progress bar
    const questionIndex = Math.floor(Math.random() * availableQuestions.length); // questionIndex is the random question
    currentQuestion = availableQuestions[questionIndex]; // currentQuestion is the random question
    question.innerText = currentQuestion.question; // question is the question
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1); // remove the question from the availableQuestions array
    acceptingAnswers = true;
};
// add event listener to each choice: addEventListener 'click', (event) => {
    choices.forEach(choice => {
        choice.addEventListener
        ('click', e => {
            if (!acceptingAnswers) return; 
            acceptingAnswers = false; 
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];
            const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'; 
            if (classToApply === 'correct') {   // if classToApply is correct
                incrementScore(CORRECT_BONUS);  // increment score by CORRECT_BONUS
            }
            selectedChoice.parentElement.classList.add(classToApply);       // add classToApply to the parent element of selectedChoice
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);        // remove classToApply from the parent element of selectedChoice
                getNewQuestion();
            }, 1000); 
        });     
    });     // end of choices.forEach()
    // add function incrementScore(number) that will add number to score and update the UI
    incrementScore = num => {
        score += num;
        scoreText.innerText = score;
    };
    // start game when page loads
    startGame();
