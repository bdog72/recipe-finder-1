//
//

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const apiURL =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();

    // If Author is unknown, add 'Author Unknown'
    if (data.quoteAuthor === '') {
      quoteAuthor.innerText = 'Author Unknown';
    } else {
      quoteAuthor.innerText = data.quoteAuthor;
    }

    // Reduce font size for long quotes
    if (data.quoteText.length > 100) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.quoteText;

    // Stop Loader and Show Quote
    removeLoadingSpinner;
  } catch (error) {
    // getQuote();
  }
}

// Tweet Quote
function tweetQuote(params) {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;

  const twiitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twiitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);

twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
