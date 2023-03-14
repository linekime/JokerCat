const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to voiceRSS API
function tellMe(joke) {
    console.log('tell me:', joke);
    VoiceRSS.speech({
        key: '534ae2eeb5414c02ad2cd0a92ef9d116',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming';
    try {
        const response = await fetch(apiUrl);
        // grab response and change it to json
        const data = await response.json();
        if (data.setup) { 
            //backticks to put strings and variables in one string
            joke = `${data.setup} ... ${data.delivery}`;
       } else {
            joke = data.joke;
       }
    //    Text-to-speech
       tellMe(joke);
    //    Disable button
    toggleButton();
    } catch(error) {
        // Catch error here
        console.log('ooops!', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

