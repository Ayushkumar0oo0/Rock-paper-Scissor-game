let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === computerMove) {
        result = 'Tie.';
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        result = 'You win.';
        score.wins++;
    } else {
        result = 'You lose.';
        score.losses++;
    }

    score.ties += result === 'Tie.' ? 1 : 0;

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You 
        <img src="${playerMove}-emoji.png" class="move-icon">
        <img src="${computerMove}-emoji.png" class="move-icon"> 
        Computer`;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const moves = ['rock', 'paper', 'scissors'];
    return moves[Math.floor(Math.random() * moves.length)];
}

function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
}
let autoplay = false;
let intervalid ;
function AutoPlay(){
    if(!autoplay){
        intervalid = setInterval(function(){
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000);
        autoplay = true;
    } else{
        clearInterval(intervalid);
        autoplay = false; 
    }

}