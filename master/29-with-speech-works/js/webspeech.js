var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const names = ['Benoît', 'Koen', 'Hannah', 'Ward', 'Kaj', 'Lieselot', 'Kaat', 'Tara-tessa', 'Wilma', 'Florry'];
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + names.join(' | ') + ' ;'

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'nl-BE';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const $diagnostic = document.querySelector('.output');
const bg = document.querySelector('html');
const $hints = document.querySelector('.hints');

let namesHTML = '';
names.forEach((v, i, a) => {
  // console.log(v, i);
  namesHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
$hints.innerHTML = 'Tap/click then say a name to see your name in 3D. Try ' + namesHTML + '.';

document.body.onclick = () => {
  recognition.start();
  console.log('Ready to receive a name command.');
}

recognition.onresult = (event) => {
  let name = event.results[0][0].transcript;
  console.log(name);
  $diagnostic.textContent = 'Result received: ' + name + '.';
  console.log($diagnostic.textContent);
}

recognition.onspeechend = () => {
  recognition.stop();
}

recognition.onnomatch = (event) => {
  $diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = (event) => {
  $diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
