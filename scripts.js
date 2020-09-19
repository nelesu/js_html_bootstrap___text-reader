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

  // const selectedIndex = voicesList.selectedIndex < 0 ? 0 : voicesList.selectedIndex;
  voicesSelect.innerHTML = voices
    .map((voice, index) => voice.lang === LANG_RU || voice.lang === LANG_US || voice.lang === LANG_GB ? `<option value=${index} data-lang="${voice.lang}" data-name="${voice.name}">${voice.name} (${voice.lang})</option>` : null)
    .join("");



  // if (voicesList[i].default) {
  //   option.textContent += ' -- DEFAULT';
  // }

  // option.setAttribute('data-lang', voicesList[i].lang);
  // option.setAttribute('data-name', voicesList[i].name);
  // voicesList.appendChild(voicesList);

  // voicesList.selectedIndex = selectedIndex;
}


populateVoiceList();
// if (speechSynthesis.onvoiceschanged !== undefined) {
//   speechSynthesis.onvoiceschanged = populateVoiceList;
// }

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
    console.log(ssUtterance)
    // let selectedOption = voicesSelect.selectedOptions[0].getAttribute("data-name");
    // voices.forEach((voice) => {
    //   if (voice.name === selectedOption) {

    //   }
    // })

    speechSynthesis.speak(ssUtterance)
  }

};



document.querySelector("#btn-start").addEventListener('click', say);
document.querySelector("#btn-stop").addEventListener('click', speechSynthesis.cancel);
speechSynthesis.addEventListener("voiceschanged", populateVoiceList)