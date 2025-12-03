// Chat Interface Logic for Jarvis AI
// Handles UI interactions, message display, and user input

// Global state
let conversationHistory = [];
let isProcessing = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Jarvis AI initialized');
    loadConversationHistory();
    focusInput();
});

// Focus input field
function focusInput() {
    document.getElementById('messageInput').focus();
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Send message
async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message || isProcessing) return;
    
    // Clear input
    input.value = '';
    
    // Hide welcome screen
    hideWelcome();
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Show typing indicator
    showTyping();
    
    // Process message
    isProcessing = true;
    
    try {
        // Get AI response
        const response = await getAIResponse(message);
        
        // Hide typing indicator
        hideTyping();
        
        // Add Jarvis response
        addMessage(response, 'jarvis');
        
        // Save conversation
        saveConversation(message, response);
        
    } catch (error) {
        hideTyping();
        addMessage('I apologize, but I encountered an error. Please try again.', 'jarvis');
        console.error('Error:', error);
    }
    
    isProcessing = false;
    focusInput();
}

// Send suggestion
function sendSuggestion(text) {
    document.getElementById('messageInput').value = text;
    sendMessage();
}

// Quick actions
function quickAction(action) {
    const actions = {
        'schedule': 'Show me my schedule for today',
        'notes': 'List all my notes',
        'tasks': 'What tasks do I have pending?',
        'github': 'Show me my GitHub statistics',
        'weather': 'What\'s the weather like today?',
        'news': 'Get me the latest tech news'
    };
    
    if (actions[action]) {
        document.getElementById('messageInput').value = actions[action];
        sendMessage();
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = `avatar ${sender}`;
    avatar.textContent = sender === 'jarvis' ? 'J' : 'A';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Parse markdown-like formatting
    const formattedText = formatMessage(text);
    contentDiv.innerHTML = formattedText;
    
    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = getCurrentTime();
    contentDiv.appendChild(timestamp);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Format message with basic markdown
function formatMessage(text) {
    // Bold: **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic: *text*
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Code: `code`
    text = text.replace(/`(.*?)`/g, '<code style="background: rgba(0,212,255,0.1); padding: 2px 6px; border-radius: 3px;">$1</code>');
    
    // Links: [text](url)
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: var(--primary-color);">$1</a>');
    
    // Line breaks
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Show typing indicator
function showTyping() {
    document.getElementById('typing').classList.add('active');
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTyping() {
    document.getElementById('typing').classList.remove('active');
}

// Hide welcome screen
function hideWelcome() {
    const welcome = document.getElementById('welcome');
    if (welcome) {
        welcome.style.display = 'none';
    }
}

// Save conversation to history
function saveConversation(userMessage, aiResponse) {
    conversationHistory.push({
        user: userMessage,
        jarvis: aiResponse,
        timestamp: new Date().toISOString()
    });
    
    // Save to localStorage
    localStorage.setItem('jarvis_history', JSON.stringify(conversationHistory));
    
    // TODO: Save to GitHub repository
    // This will be implemented in github-sync.js
}

// Load conversation history
function loadConversationHistory() {
    const saved = localStorage.getItem('jarvis_history');
    if (saved) {
        try {
            conversationHistory = JSON.parse(saved);
            console.log(`Loaded ${conversationHistory.length} previous conversations`);
        } catch (e) {
            console.error('Error loading history:', e);
        }
    }
}

// Clear chat
function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        document.getElementById('messages').innerHTML = '';
        conversationHistory = [];
        localStorage.removeItem('jarvis_history');
        location.reload();
    }
}

// Export chat
function exportChat() {
    const dataStr = JSON.stringify(conversationHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jarvis-chat-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        focusInput();
    }
    
    // Ctrl/Cmd + L: Clear chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearChat();
    }
    
    // Ctrl/Cmd + E: Export chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportChat();
    }
});

console.log('Chat interface loaded successfully');
console.log('Keyboard shortcuts:');
console.log('  Ctrl/Cmd + K: Focus input');
console.log('  Ctrl/Cmd + L: Clear chat');
console.log('  Ctrl/Cmd + E: Export chat');