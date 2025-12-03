// AI Engine for Jarvis
// Handles AI processing, context management, and response generation

// Configuration
const AI_CONFIG = {
    apiEndpoint: 'https://api.bhindi.io/v1/chat', // Bhindi AI API
    model: 'bhindi-ai',
    temperature: 0.7,
    maxTokens: 2000,
    systemPrompt: `You are Jarvis, a personal AI assistant for Aptik Pandey. You are helpful, intelligent, and efficient. 
    You have access to Aptik's personal data stored in this GitHub repository including notes, tasks, and conversation history.
    Always be concise, professional, and proactive in helping Aptik manage his work and life.
    When appropriate, use emojis to make responses more engaging.`
};

// Context management
let conversationContext = [];
const MAX_CONTEXT_MESSAGES = 10;

// Get AI response
async function getAIResponse(userMessage) {
    try {
        // Add user message to context
        addToContext('user', userMessage);
        
        // Check for special commands
        const commandResponse = handleSpecialCommands(userMessage);
        if (commandResponse) {
            return commandResponse;
        }
        
        // For now, use a simulated response
        // TODO: Integrate with actual Bhindi AI API
        const response = await simulateAIResponse(userMessage);
        
        // Add AI response to context
        addToContext('assistant', response);
        
        return response;
        
    } catch (error) {
        console.error('AI Engine Error:', error);
        return 'I apologize, but I encountered an error processing your request. Please try again.';
    }
}

// Simulate AI response (temporary - will be replaced with actual API)
async function simulateAIResponse(message) {
    // Simulate network delay
    await sleep(1000 + Math.random() * 1000);
    
    const lowerMessage = message.toLowerCase();
    
    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good evening)/)) {
        return `Hello Aptik! 👋 I'm Jarvis, your personal AI assistant. How can I help you today?`;
    }
    
    // Schedule
    if (lowerMessage.includes('schedule') || lowerMessage.includes('calendar')) {
        return `📅 **Your Schedule for Today:**

**9:00 AM** - Morning standup meeting
**11:00 AM** - Code review session
**2:00 PM** - Project planning
**4:00 PM** - Team sync

You have 4 tasks scheduled. Would you like me to set reminders for any of these?`;
    }
    
    // GitHub stats
    if (lowerMessage.includes('github') && lowerMessage.includes('stat')) {
        return `💻 **Your GitHub Statistics:**

**Repositories:** 12 public, 3 private
**Contributions (This Week):** 23 commits
**Current Streak:** 7 days 🔥
**Top Language:** C++ (45%), JavaScript (30%)

Your most active repository is **Aptik09/Aptik09** with 15 commits this month. Keep up the great work!`;
    }
    
    // Notes
    if (lowerMessage.includes('note') || lowerMessage.includes('remember')) {
        if (lowerMessage.includes('take') || lowerMessage.includes('create') || lowerMessage.includes('add')) {
            return `📝 **Note Created!**

I've saved your note. You can view all your notes anytime by saying "show my notes" or "list notes".

Would you like to add any tags or categories to this note?`;
        } else {
            return `📝 **Your Recent Notes:**

1. Project ideas for next week
2. Meeting notes from team sync
3. Code snippets for authentication
4. Book recommendations

You have 12 notes total. Say "open note [number]" to view details.`;
        }
    }
    
    // Tasks
    if (lowerMessage.includes('task') || lowerMessage.includes('todo')) {
        return `✅ **Your Tasks:**

**High Priority:**
- [ ] Complete GitHub project documentation
- [ ] Review pull requests

**Medium Priority:**
- [ ] Update portfolio website
- [ ] Practice DSA problems

**Low Priority:**
- [ ] Organize code snippets
- [ ] Clean up old branches

You have 6 pending tasks. Would you like me to help you prioritize?`;
    }
    
    // Weather
    if (lowerMessage.includes('weather')) {
        return `🌤️ **Weather Update:**

**Current:** 24°C, Partly Cloudy
**High/Low:** 28°C / 20°C
**Humidity:** 65%
**Wind:** 12 km/h

Perfect weather for a productive day! Don't forget to stay hydrated. 💧`;
    }
    
    // Reminders
    if (lowerMessage.includes('remind')) {
        return `⏰ **Reminder Set!**

I'll remind you about this. You can manage all your reminders by saying "show reminders" or "list reminders".

Would you like to set this as a recurring reminder?`;
    }
    
    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
        return `🤖 **I'm Jarvis, your personal AI assistant!**

**I can help you with:**

📅 **Schedule Management** - View and manage your calendar
📝 **Notes** - Create, search, and organize notes
✅ **Tasks** - Track and prioritize your to-dos
💻 **GitHub** - Monitor repos, commits, and contributions
⏰ **Reminders** - Set and manage reminders
🌤️ **Weather** - Get weather updates
🔍 **Search** - Find information across your data
📊 **Analytics** - Track your productivity

**Quick Commands:**
- "What's on my schedule?"
- "Take a note"
- "Show my tasks"
- "GitHub stats"
- "Set a reminder"

Just ask me anything! I'm here to help. 😊`;
    }
    
    // Default intelligent response
    return `I understand you're asking about "${message}". 

I'm currently in development mode and learning to better assist you. Here's what I can do right now:

✅ Manage your schedule and tasks
✅ Take and organize notes
✅ Track GitHub activity
✅ Set reminders
✅ Provide weather updates

**Coming Soon:**
🔄 Advanced automation
🔄 Email management
🔄 Smart suggestions
🔄 Voice commands

Is there something specific I can help you with from my current capabilities?`;
}

// Handle special commands
function handleSpecialCommands(message) {
    const lowerMessage = message.toLowerCase();
    
    // Clear command
    if (lowerMessage === 'clear' || lowerMessage === 'reset') {
        setTimeout(() => clearChat(), 100);
        return 'Clearing chat history...';
    }
    
    // Status command
    if (lowerMessage === 'status' || lowerMessage === 'system status') {
        return `🟢 **System Status: Online**

**AI Engine:** Active
**GitHub Sync:** Connected
**Data Storage:** Operational
**Last Backup:** ${new Date().toLocaleString()}

All systems functioning normally. How can I assist you?`;
    }
    
    // Version command
    if (lowerMessage === 'version') {
        return `**Jarvis AI v1.0.0**

Built with ❤️ by Aptik Pandey
Powered by Bhindi AI
Last Updated: December 2025`;
    }
    
    return null;
}

// Add message to context
function addToContext(role, content) {
    conversationContext.push({ role, content });
    
    // Keep only last N messages for context
    if (conversationContext.length > MAX_CONTEXT_MESSAGES * 2) {
        conversationContext = conversationContext.slice(-MAX_CONTEXT_MESSAGES * 2);
    }
}

// Get conversation context
function getContext() {
    return conversationContext;
}

// Clear context
function clearContext() {
    conversationContext = [];
}

// Sleep utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Analyze user intent
function analyzeIntent(message) {
    const intents = {
        schedule: ['schedule', 'calendar', 'meeting', 'appointment'],
        task: ['task', 'todo', 'to-do', 'checklist'],
        note: ['note', 'remember', 'save', 'write down'],
        github: ['github', 'repo', 'commit', 'pull request', 'pr'],
        reminder: ['remind', 'reminder', 'alert', 'notify'],
        weather: ['weather', 'temperature', 'forecast'],
        search: ['search', 'find', 'look for', 'locate']
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, keywords] of Object.entries(intents)) {
        if (keywords.some(keyword => lowerMessage.includes(keyword))) {
            return intent;
        }
    }
    
    return 'general';
}

// Extract entities from message
function extractEntities(message) {
    const entities = {
        dates: [],
        times: [],
        numbers: [],
        urls: []
    };
    
    // Extract dates (simple patterns)
    const datePatterns = /\b(today|tomorrow|yesterday|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi;
    entities.dates = message.match(datePatterns) || [];
    
    // Extract times
    const timePatterns = /\b(\d{1,2}:\d{2}\s*(am|pm)?)\b/gi;
    entities.times = message.match(timePatterns) || [];
    
    // Extract numbers
    const numberPatterns = /\b\d+\b/g;
    entities.numbers = message.match(numberPatterns) || [];
    
    // Extract URLs
    const urlPatterns = /https?:\/\/[^\s]+/g;
    entities.urls = message.match(urlPatterns) || [];
    
    return entities;
}

// Generate smart suggestions
function generateSuggestions(message) {
    const intent = analyzeIntent(message);
    
    const suggestions = {
        schedule: [
            'Show me my schedule for this week',
            'Add a meeting to my calendar',
            'What\'s my next appointment?'
        ],
        task: [
            'Create a new task',
            'Mark task as complete',
            'Show high priority tasks'
        ],
        note: [
            'Create a new note',
            'Search my notes',
            'Show recent notes'
        ],
        github: [
            'Show my recent commits',
            'List open pull requests',
            'GitHub contribution stats'
        ]
    };
    
    return suggestions[intent] || [];
}

console.log('AI Engine initialized');
console.log('Model:', AI_CONFIG.model);
console.log('Max context:', MAX_CONTEXT_MESSAGES, 'messages');