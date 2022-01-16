// create const username doc getelementby id 'username'
// create const saveScoreBtn doc getelementby id 'saveScoreBtn'
// create const finalScore doc getelementby id 'finalScore'
// create const mostRecentScore doc getelementby id 'mostRecentScore'
// create const highScores JOSN parse local storage 'highScores'
// create const MAX_HIGH_SCORES = 5;
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');           
const finalScore = document.getElementById('finalScore');
const mostRecentScore = document.getElementById('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];    // if highScores is null, set to empty array
const MAX_HIGH_SCORES = 5;  // max number of high scores to keep
// make innetText finalScore = mostRecentScore
// mostRecentScore.innerText = finalScore.innerText;
finalScore.innerText = mostRecentScore;
username.addEventListener('keyup', () => { // add event listener to username
    saveScoreBtn.disabled = !username.value;    // if username is not empty, enable saveScoreBtn
    }
);
// create function saveHighScore with parameter score and username 
saveHighScore = (e) => {    // e is event
    e.preventDefault();   // prevent default behavior of form submit (refresh page) 
    const score = {
        score: mostRecentScore.innerText,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};