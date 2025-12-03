// Voice Handler for Jarvis AI
// Handles speech recognition and text-to-speech

// Voice configuration
const VOICE_CONFIG = {
    language: 'en-US',
    continuous: false,
    interimResults: false,
    voiceName: 'Google UK English Male', // Jarvis-like voice
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0
};

// Speech recognition
let recognition = null;
let isListening = false;

// Speech synthesis
let synthesis = window.speechSynthesis;
let currentVoice = null;

// Initialize voice features
function initVoice() {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn('Speech recognition not supported in this browser');
        return false;
    }
    
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.lang = VOICE_CONFIG.language;
    recognition.continuous = VOICE_CONFIG.continuous;
    recognition.interimResults = VOICE_CONFIG.interimResults;
    
    // Event handlers
    recognition.onstart = onRecognitionStart;
    recognition.onresult = onRecognitionResult;
    recognition.onerror = onRecognitionError;
    recognition.onend = onRecognitionEnd;
    
    // Load voices for text-to-speech
    loadVoices();
    
    console.log('Voice features initialized');
    return true;
}

// Toggle voice input
function toggleVoice() {
    if (!recognition) {
        if (!initVoice()) {
            alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
            return;
        }
    }
    
    if (isListening) {
        stopListening();
    } else {
        startListening();
    }
}

// Start listening
function startListening() {
    try {
        recognition.start();
        isListening = true;
        
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.classList.add('active');
        voiceBtn.textContent = '🔴';
        
        console.log('Listening...');
    } catch (error) {
        console.error('Error starting recognition:', error);
    }
}

// Stop listening
function stopListening() {
    if (recognition && isListening) {
        recognition.stop();
        isListening = false;
        
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.classList.remove('active');
        voiceBtn.textContent = '🎤';
        
        console.log('Stopped listening');
    }
}

// Recognition started
function onRecognitionStart() {
    console.log('Speech recognition started');
}

// Recognition result
function onRecognitionResult(event) {
    const transcript = event.results[0][0].transcript;
    console.log('Recognized:', transcript);
    
    // Set input value
    const input = document.getElementById('messageInput');
    input.value = transcript;
    
    // Auto-send if confidence is high
    if (event.results[0][0].confidence > 0.8) {
        setTimeout(() => sendMessage(), 500);
    }
}

// Recognition error
function onRecognitionError(event) {
    console.error('Speech recognition error:', event.error);
    
    let errorMessage = 'Voice recognition error: ';
    
    switch (event.error) {
        case 'no-speech':
            errorMessage += 'No speech detected. Please try again.';
            break;
        case 'audio-capture':
            errorMessage += 'No microphone found. Please check your device.';
            break;
        case 'not-allowed':
            errorMessage += 'Microphone permission denied. Please allow access.';
            break;
        default:
            errorMessage += event.error;
    }
    
    console.warn(errorMessage);
    stopListening();
}

// Recognition ended
function onRecognitionEnd() {
    isListening = false;
    
    const voiceBtn = document.getElementById('voiceBtn');
    voiceBtn.classList.remove('active');
    voiceBtn.textContent = '🎤';
    
    console.log('Speech recognition ended');
}

// Load available voices
function loadVoices() {
    const voices = synthesis.getVoices();
    
    // Find preferred voice
    currentVoice = voices.find(voice => 
        voice.name.includes('Google') && voice.name.includes('Male')
    ) || voices.find(voice => 
        voice.lang.startsWith('en')
    ) || voices[0];
    
    console.log('Available voices:', voices.length);
    console.log('Selected voice:', currentVoice?.name);
}

// Speak text
function speak(text, options = {}) {
    // Stop any ongoing speech
    synthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice
    if (currentVoice) {
        utterance.voice = currentVoice;
    }
    
    // Set parameters
    utterance.rate = options.rate || VOICE_CONFIG.rate;
    utterance.pitch = options.pitch || VOICE_CONFIG.pitch;
    utterance.volume = options.volume || VOICE_CONFIG.volume;
    utterance.lang = options.language || VOICE_CONFIG.language;
    
    // Event handlers
    utterance.onstart = () => console.log('Speaking...');
    utterance.onend = () => console.log('Speech ended');
    utterance.onerror = (e) => console.error('Speech error:', e);
    
    // Speak
    synthesis.speak(utterance);
}

// Stop speaking
function stopSpeaking() {
    synthesis.cancel();
}

// Auto-speak Jarvis responses (optional)
let autoSpeak = false;

function toggleAutoSpeak() {
    autoSpeak = !autoSpeak;
    console.log('Auto-speak:', autoSpeak ? 'enabled' : 'disabled');
    return autoSpeak;
}

// Speak Jarvis response automatically
function speakResponse(text) {
    if (autoSpeak) {
        // Remove markdown and formatting
        const cleanText = text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/`(.*?)`/g, '$1')
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/#{1,6}\s/g, '')
            .replace(/\n/g, '. ');
        
        speak(cleanText);
    }
}

// Voice commands
const VOICE_COMMANDS = {
    'clear chat': () => clearChat(),
    'stop speaking': () => stopSpeaking(),
    'enable voice': () => toggleAutoSpeak(),
    'disable voice': () => toggleAutoSpeak(),
    'help': () => sendSuggestion('help'),
    'status': () => sendSuggestion('status')
};

// Process voice command
function processVoiceCommand(text) {
    const lowerText = text.toLowerCase().trim();
    
    for (const [command, action] of Object.entries(VOICE_COMMANDS)) {
        if (lowerText === command) {
            action();
            return true;
        }
    }
    
    return false;
}

// Load voices when available
if (synthesis) {
    synthesis.onvoiceschanged = loadVoices;
    loadVoices();
}

// Keyboard shortcut for voice (Ctrl/Cmd + Shift + V)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        toggleVoice();
    }
});

console.log('Voice handler loaded');
console.log('Press Ctrl/Cmd + Shift + V to toggle voice input');