// Your script here.
// Speech Synthesis API Setup
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('#voices');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Function to populate voice options
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set the selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
}

// Update rate and pitch dynamically
function setOption() {
  msg[this.name] = this.value;
}

// Speak the text
function speak() {
  speechSynthesis.cancel(); // Cancel any ongoing speech before speaking again
  msg.text = document.querySelector('[name="text"]').value;
  speechSynthesis.speak(msg);
}

// Stop speaking
function stop() {
  speechSynthesis.cancel();
}

// Event Listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);
