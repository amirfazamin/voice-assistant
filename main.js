const btn = document.querySelector(".mic")
const btnimg = document.querySelector(".mic > .mic-img")
const speechbox = document.querySelector(".speech-box");
let p = document.querySelector(".speech-box > p");

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = false;

btn.addEventListener("click", () => {
    recognition.start();
    btnimg.classList.add("mic-on");
    p.innerHTML = "";
    console.log("Speech Recognition Started");
});

recognition.addEventListener("result", e => {
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("")
    if(e.results[0].isFinal){
        p.innerHTML = transcript;
        say(transcript);
    }
});

recognition.addEventListener("end", () => {
    recognition.stop();
    btnimg.classList.remove("mic-on");
    console.log("Speech Recognition Ended");
});

function say(msg){
    const speech = new SpeechSynthesisUtterance();
    speech.text = "I don't know how to respond to that."
    if(msg.includes("hi") || msg.includes("hello")){
        const response = greetingRespose1[Math.floor(Math.random() * greetingRespose1.length)];
        speech.text = response;
    }
    if(msg.includes("how are you")){
        const response = greetingRespose2[Math.floor(Math.random() * greetingRespose2.length)];
        speech.text = response;
    }
    if(msg.includes("Google")){
        window.open("http://google.com/search?q=" + msg.replace("Google",""));
        speech.text = "Searching Google...";
    }
    p.innerHTML = speech.text;
    window.speechSynthesis.speak(speech);
}