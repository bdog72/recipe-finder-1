//
//

const inputContainer = document.querySelector('#input-container');
const countdownForm = document.querySelector('#countdownForm');

const dateEl = document.querySelector('#date-picker');
const countdownEl = document.querySelector('#countdown');

const countdownElTitle = document.querySelector('#countdown-title');
const countdownElButton = document.querySelector('#countdown-button');

const timeElements = document.querySelectorAll('span');
const completeEl = document.querySelector('#complete');

const completeElInfo = document.querySelector('#complete-info');
const completeElBtn = document.querySelector('#complete-button');

let countdownTitle = '';
let countdownDate = '';

let countdownValue = new Date();
let countdownActive;

let savedCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's dateEl
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate CountDown / Complete UI
const updateDOM = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide Input
    inputContainer.hidden = true;

    //  If the countdown has ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // Else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
};

// Take Values from from input
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountDown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem('countdown', JSON.stringify(savedCountDown));

  // Check for valid date
  if (countdownDate === '') {
    alert('Please Select a Date Bozo Beaker');
  } else {
    // Get number version of current Date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    // console.log(`CountDown Value:`, countdownValue);
    updateDOM();
  }
};

// Reset All Values
function reset() {
  // Hide CountDowns, show Input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown
  clearInterval(countdownActive);
  // Reset Values
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

const restorePreviousCountdown = () => {
  // Get countdown from localstorage if available
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountDown.title;
    countdownDate = savedCountDown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownElButton.addEventListener('click', reset);
completeElBtn.addEventListener('click', reset);

// On Load, check localStorage
restorePreviousCountdown();
