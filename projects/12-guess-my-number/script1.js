//
//

const again = document.querySelector('.again');
const number = document.querySelector('.number');

const check = document.querySelector('.check');
const playerScore = document.querySelector('.score');

const gameHighScore = document.querySelector('.highscore');
const message = document.querySelector('.message');

let score = 20;
let secretNumber = Math.trunc(Math.random() * 20) + 1;

let highScore = 0;

console.log(secretNumber);

check.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // No Guess
  if (!guess) {
    message.textContent = 'Guess a Number';

    // Correct Guess
  } else if (guess === secretNumber) {
    message.textContent = 'Correct Guess';
    document.body.style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      gameHighScore.textContent = highScore;
    }

    // Incorrect Guess
  } else if (guess !== secretNumber) {
    if (score > 1) {
      message.textContent = guess > secretNumber ? 'Too High' : 'Too Low';
      score--;
      playerScore.textContent = score;
    } else {
      message.textContent = 'You Lost The Game Bozo';
      playerScore.textContent = 0;
    }
  }
});
again.addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  message.textContent = 'Start Guessing';
  playerScore.textContent = score;
  number.textContent = '?';
  document.body.style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
});
