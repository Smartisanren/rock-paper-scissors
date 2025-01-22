const choices = ['rock', 'paper', 'scissors'];
let player1Score = 0;
let player2Score = 0;
let player1Choice = null;
let player2Choice = null;
let isRolling = false;
let currentPlayer = 1;

const winSound = new Audio('assets/sounds/win.mp3');

document.getElementById('player1-choice').addEventListener('click', () => {
    if (currentPlayer === 1 && !isRolling) {
        startRolling('player1');
    }
});

document.getElementById('player2-choice').addEventListener('click', () => {
    if (currentPlayer === 2 && !isRolling) {
        startRolling('player2');
    }
});

function startRolling(player) {
    isRolling = true;
    const imgElement = document.getElementById(`${player}-choice`);
    let rollCount = 0;
    const totalRolls = 10;
    
    const roll = setInterval(() => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        imgElement.src = `assets/images/${randomChoice}.png`;
        rollCount++;
        
        if (rollCount >= totalRolls) {
            clearInterval(roll);
            const finalChoice = choices[Math.floor(Math.random() * choices.length)];
            imgElement.src = `assets/images/${finalChoice}.png`;
            
            if (player === 'player1') {
                player1Choice = finalChoice;
                currentPlayer = 2;
                document.getElementById('result').textContent = '等待选手2选择...';
            } else {
                player2Choice = finalChoice;
                setTimeout(checkWinner, 500);
            }
            isRolling = false;
        }
    }, 200);
}

function checkWinner() {
    let result;
    if (player1Choice === player2Choice) {
        result = 'tie';
    } else if (
        (player1Choice === 'paper' && player2Choice === 'rock') ||
        (player1Choice === 'rock' && player2Choice === 'scissors') ||
        (player1Choice === 'scissors' && player2Choice === 'paper')
    ) {
        result = 'player1';
        player1Score++;
    } else {
        result = 'player2';
        player2Score++;
    }
    
    displayResult(result);
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    if (result === 'tie') {
        resultDiv.innerHTML = '平局！';
    } else if (result === 'player1') {
        resultDiv.innerHTML = '<img src="assets/images/sheep win.png" class="result-image">';
    } else {
        resultDiv.innerHTML = '<img src="assets/images/pig win.png" class="result-image">';
        winSound.play();
    }
    
    document.getElementById('player1-score').textContent = player1Score;
    document.getElementById('player2-score').textContent = player2Score;
    
    setTimeout(resetGame, 2000);
}

function resetGame() {
    player1Choice = null;
    player2Choice = null;
    currentPlayer = 1;
    document.getElementById('player1-choice').src = 'assets/images/sheep.png';
    document.getElementById('player2-choice').src = 'assets/images/pig.png';
    document.getElementById('result').textContent = '等待选手1选择...';
}