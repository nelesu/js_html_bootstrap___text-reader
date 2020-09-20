const {
  speechSynthesis
} = window;

const voicesSelect = document.getElementById("voices");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const text = document.getElementById("text");
const LANG_RU = "ru-RU";
const LANG_US = "en-US";
const LANG_GB = "en-GB";

let voices = [];

const populateVoiceList = () => {
  voices = speechSynthesis.getVoices();

  voicesSelect.innerHTML = voices
    .map((voice, index) => voice.lang === LANG_RU || voice.lang === LANG_US || voice.lang === LANG_GB ? `<option value=${index} data-lang="${voice.lang}" data-name="${voice.name}">${voice.name} (${voice.lang})</option>` : null)
    .join("");
}

populateVoiceList();


const say = () => {
  if (speechSynthesis.speaking) {
    console.error(speechSynthesis.speaking)
    return;
  }


  if (text.value !== "") {
    const ssUtterance = new SpeechSynthesisUtterance(text.value);

    ssUtterance.lang = LANG_RU;
    ssUtterance.pitch = pitch.value;
    ssUtterance.rate = rate.value;
    ssUtterance.voice = voices[voicesSelect.value];

    speechSynthesis.speak(ssUtterance)
  }

};



document.querySelector("#btn-start").addEventListener('click', say);
document.querySelector("#btn-stop").addEventListener('click', () => speechSynthesis.cancel());

rate.addEventListener('input', () => document.querySelector('.rate-value').innerHTML = rate.value);
pitch.addEventListener('input', () => document.querySelector('.pitch-value').innerText = pitch.value);

voicesSelect.addEventListener('change', () => {
  say();
});

speechSynthesis.addEventListener("voiceschanged", populateVoiceList);