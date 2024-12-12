// Select the button and content elements
let button = document.querySelector("#button");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);

    // Set pitch to a higher value for a child-like sound
    text_speak.pitch = 1.5;  // Higher pitch for a more youthful sound
    text_speak.rate = 1;     // Normal speech rate
    text_speak.volume = 1;   // Maximum volume
    text_speak.lang = "en-US"; // Language is English (US)

    // Get the available voices
    let voices = window.speechSynthesis.getVoices();

    // Look for a female voice (can be adjusted based on what's available in your browser)
    let femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('female'));

    // If a female voice is found, set it
    if (femaleVoice) {
        text_speak.voice = femaleVoice;
    }

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good Morning");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon");
    } else {
        speak("Good Evening");
    }
}

// Trigger greeting when the page loads
window.addEventListener("load", () => {
    wishMe();
});

// Speech recognition setup
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

// Start recognition on button click
if (button) {
    button.addEventListener("click", () => {
        recognition.start();
        button.style.display = "none";
        voice.style.display = "block";
    });
}

// Function to process commands
function takeCommand(message) {
    button.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am Joyo, a Virtual Assistant");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (message.includes("open spotify")) {
        speak("Opening Spotify...");
        window.open("spotify://");
    } else if (message.includes("open telegram")) {
        speak("Opening Telegram...");
        window.open("telegram://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    }else if (message.includes("open microsoft word")) {
        speak("Opening  microsoft Word...");
        window.open(" microft word://");
    }else if (message.includes("open word")) {
        speak("Opening Word...");
        window.open("word://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calculator://");
    } else {
        speak(`This is what I found on the internet regarding ${message.replace("joyo", " ")}`);
        window.open(`https://www.google.co.in/search?q=${message}`);
    }
}
