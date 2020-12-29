//
//

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
  // console.log(`Tell Me:`, joke);
  VoiceRSS.speech({
    key: 'd1c7bca0bb94473fa4ec16a185850fe0',
    src: joke,
    hl: 'en-us',
    v: 'Mike',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get jokes from joke API
async function getJokes() {
  let joke = '';
  const apiUrl = `https://sv443.net/jokeapi/v2/joke/Programming`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text to speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch errors
    console.log(`Whoops`, error);
  }
}

function name(params) {}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
