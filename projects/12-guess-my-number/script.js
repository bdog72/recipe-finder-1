//
//

'use strict';

const gameScore = document.querySelector('.score');
const message = document.querySelector('.message');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // when there is no input
  if (!guess) {
    message.textContent = 'No Number';

    //  when player wins
  } else if (guess === secretNumber) {
    message.textContent = 'Correct Number';
    document.querySelector('.number').textContent = secretNumber;

    document.body.style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // when guess is too high
  } else if (guess !== secretNumber) {
    if (score > 1) {
      message.textContent = guess > secretNumber ? 'Too High!!' : 'Too Low';
      score--;
      gameScore.textContent = score;
    } else {
      message.textContent = 'You Lost The Game Bozo!';
      gameScore.textContent = 0;
    }
  }
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     message.textContent = 'Too High!!';
  //     score--;
  //     gameScore.textContent = score;
  //   } else {
  //     message.textContent = 'You Lost The Game Bozo!';
  //     gameScore.textContent = 0;
  //   }

  //   // when guess is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     message.textContent = 'Too Low!!';
  //     score--;
  //     gameScore.textContent = score;
  //   } else {
  //     message.textContent = 'You Lost The Game Bozo!';
  //     gameScore.textContent = 0;
  //   }
  // }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  message.textContent = 'Start Guessing';
  gameScore.textContent = score;
  document.querySelector('.number').textContent = '?';
  document.body.style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
});
