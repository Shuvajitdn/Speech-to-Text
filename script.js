var i = 0;

function speechToTextConversion() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    var recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    var diagnostic = document.getElementById('text');

    document.getElementById("playButton").onclick = function () {
        if (i === 0) {
            document.getElementById("playButton").innerHTML = '<i class="fas fa-stop"></i>'; // Change to stop icon
            recognition.start();
            i = 1;
        } else {
            document.getElementById("playButton").innerHTML = '<i class="fas fa-microphone"></i>'; // Change back to mic icon
            recognition.stop();
            i = 0;
        }
    };

    recognition.onresult = function (event) {
        var last = event.results.length - 1;
        var convertedText = event.results[last][0].transcript;
        diagnostic.value += convertedText + ' '; // Append text
        console.log('Confidence: ' + event.results[0][0].confidence);
    };

    recognition.onnomatch = function (event) {
        diagnostic.value = 'I didn\'t recognize that.';
    };

    recognition.onerror = function (event) {
        diagnostic.value = 'Error occurred in recognition: ' + event.error;
    };
}

// Call the function to initialize
speechToTextConversion();
