const {
  speechSynthesis
} = window;


const voices = document.getElementById("voices");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const text = document.getElementById("text");


let voices = speechSynthesis.getVoices();




const voicesList = document.querySelector('#voices');

function populateVoiceList() {
  voices = speechSynthesis.getVoices();
  const selectedIndex =
    voicesList.selectedIndex < 0 ? 0 : voicesList.selectedIndex;
  voicesList.innerHTML = '';

  for (i = 0; i < voices.length; i++) {
    const option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if (voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voicesList.appendChild(option);
  }
  voicesList.selectedIndex = selectedIndex;
}


populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

const say = () => {

  let options = new SpeechSynthesisUtterance(document.querySelector("#text").value);
  options.lang = "ru-Ru";
  let selectedOption = voicesList.selectedOptions[0].getAttribute('data-name');
  for (let index = 0; index < voices.length; index++) {
    if (voices[index].name === selectedOption) {
      options.voice = voices[index];
    }
  }



  speechSynthesis.speak(options)
}



document.querySelector("#btn-start").addEventListener('click', say);