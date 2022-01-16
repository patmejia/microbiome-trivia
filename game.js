// create constant question: getelementbyid 'question'
// create constant choice: array from getelementbyclassname 'choice-text'
// create constant progressText: getelementbyid 'progressText'
// create constant scoreText: getelementbyid 'progressBarFull'
// create constant progressBarFull: getelementbyid 'progressBarFull'
// create constant loader: getelementbyid 'loader'

const { constants } = require("buffer");

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
        question: 'A microbiome is the collection of genomes of all the microorganisms found in a particular environment. Some examples are all the bacteria, fungi, protozoa, and viruses that live on and inside the human body microbiome.', 
        choice1: 'True',
        choice2: 'False',
        answer: 1,
    },
    {
        question: 'While microbiota is the microbial taxa associated with humans, the microbiome is the catalog of microbes and their harbored genes.'  ,
        choice1: 'False',
        choice2: 'True',
        answer: 2,
    },
    {
        question: 'TThe microbiota in the gut can be radically different from the microbiota that strives on the skin.',  
        choice1: 'True',
        choice2: 'False',
        answer: 1,
    },
    {
        question: 'The largest human microbiome is the gut, particularly the large intestine.',     // question 4
        choice1: 'False',
        choice2: 'True',
        answer: 2,
    },
    {
        question: 'The human body is, in fact, a “supraorganism”: a collection of human and microbial cells and genes. And thus, a blend of human and microbial traits.',   // question 5   
        choice1: 'True',
        choice2: 'False',
        answer: 1,
    },
    {
        question: 'The number of genes in all the microbes in one person’s microbiome is 200 times the number of genes in the human genome. The microbiome may weigh as much as five pounds.',   // question 6    
        choice1: 'False',
        choice2: 'True',
        answer: 2,
    },
    {
        question: 'Bacteria are by far the most numerous members of the human microbiome: the bacterial population alone is estimated at between 75 trillion and 200 trillion individual organisms, while the entire human body consists of about 50 trillion to 100 trillion somatic (body) cells.',   // question 7
        choice1: 'False',
        choice2: 'True',
        answer: 2,
    },
    {
        question: 'The bacteria in the microbiome help digest our food, regulate our immune system, protect against other bacteria that cause disease, and produce vitamins including B vitamins B12, thiamine and riboflavin, and Vitamin K, which is needed for blood coagulation.',   // question 8
        choice1: 'True',
        choice2: 'False',
        answer: 1,
    },
    {
        question: 'The human gut is the largest and most complex of the human body’s compartments. It is the largest of the human body’s compartments, and is the largest of the hThe first scientific evidence that microorganisms are part of the normal human system emerged in the mid-1880s when Austrian pediatrician Theodor Escherich observed a type of bacteria (later named Escherichia coli) in the intestinal flora of healthy children versus children with loose bowels.uman body’s compartments.',   // question 9
        choice1: 'False',
        choice2: 'True',
        answer: 2,
    },
    {
        question: 'The first scientific evidence that microorganisms are part of the normal human system emerged in the mid-1880s when Austrian pediatrician Theodor Escherich observed a type of bacteria (later named Escherichia coli) in the intestinal flora of healthy children versus children with loose bowels.',   // question 10
        choice1: 'True',
        choice2: 'False',
        answer: 1,
    },
    {
        question:'Type I diabetes is an autoimmune disease associated with a less diverse gut microbiome. In animal studies, bacteria play a role in developing diabetes.',   // question 11
        choice1: 'False',
        choice2: 'True',
        answer: 2,
    },
    {
        question:'The gut microbiome is different between obese and lean twins. Obese twins have a lower diversity of bacteria, and higher levels of enzymes, meaning the obese twins are more efficient at digesting food and harvesting calories. Obesity has also been associated with a poor combination of microbes in the gut.',   // question 12
        choice1: 'True',
        choice2: 'False',
        answer: 1,
    },
    {
        question:'Autoimmune diseases such as diabetes, rheumatoid arthritis, muscular dystrophy, multiple sclerosis, and fibromyalgia are associated with dysfunction in the microbiome.',   // question 13
        choice1: 'False',
        choice2: 'True',
        answer: 2,
    },
    {
        question:'In unhealthy microbiomes, disease-causing microbes accumulate over time, changing gene activity and metabolic processes and resulting in an abnormal immune response against substances and tissues normally present in the body. ',   // question 14
        choice1: 'True',
        choice2: 'False',
        answer: 1,
    },
    {
        question:'Autoimmune diseases appear to be passed in families not by DNA inheritance but by inheriting the family’s microbiome.',   // question 15
        choice1: 'False',
        choice2: 'True',
        answer: 2,
    },
    {
        question:'The microbiome is essential for human development, immunity, and nutrition. The bacteria living in and on us are not invaders but beneficial colonizers.',   // question 16
        choice1: 'True',
        choice2: 'False',
        answer: 1,
    },
    {
        question:'Humans can restore their microbiome by eating lots of vegetables, legumes, beans, and fruits. Many fruits and vegetables are high in fiber. Fiber promotes the growth of beneficial gut bacteria, including specific types such as Bifidobacteria.',   // question 17
        choice1: 'False',
        choice2: 'True',
        answer: 2,
    },
];


// Constants 

// create constant CORRECT_BONUS: 10
const CORRECT_BONUS = 10;  
// create constant MAX_QUESTIONS: 10
const MAX_QUESTIONS = 3;
// add loop startGame() that will start the game: questionCounter 0, score 0, availableQuestions [...questions], getnewquestions()
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
// add if/then getNewQuestion() that will randomly select a question from availableQuestions and store it in currentQuestion variable.
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
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