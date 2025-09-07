const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Aishwarya...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Aishwarya...");
    } else {
        speak("Good Evening Aishwarya...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';


recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    message = message.toLowerCase(); // to handle case insensitivity

    if (message.includes('hello jarvis') || message.includes('hello')) {
        speak("Hello Aish, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("play")) {
        const song = message.replace("play", "").trim();
        speak("Playing " + song + " on YouTube");
        window.open(`https://www.youtube.com/results?search_query=${song}`, "_blank");
    } else if (message.includes("open youtube")) {
        window.open("https://www.youtube.com/@CodedByIsha", "_blank");
        speak("Opening Your YouTube Channel...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes("open my linkedin")) {
        window.open("https://www.linkedin.com/in/isha-singh-b00715300/", "_blank");
        speak("Opening LinkedIn...");
    } else if (message.includes("open my twitter")) {
        window.open("https://x.com/isha_singh06", "_blank");
        speak("Opening Twitter...");
    } else if (message.includes("open my instagram")) {
        window.open("https://www.instagram.com/codedbyisha", "_blank");
        speak("Opening Instagram...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open("https://www.google.com/search?q=calculator", "_blank");
        speak("Opening Calculator...");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}


