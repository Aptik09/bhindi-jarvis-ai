# 📖 Jarvis AI Usage Guide

Welcome to your personal AI assistant! This guide will help you get the most out of Jarvis.

---

## 🚀 Getting Started

### First Time Setup

1. **Access Jarvis**
   - Desktop: Visit `https://aptik09.github.io/bhindi-jarvis-ai/`
   - Mobile: Bookmark the URL or add to home screen

2. **Say Hello**
   - Type "Hello Jarvis" or "Hi"
   - Jarvis will greet you and show available features

3. **Explore Features**
   - Try the suggestion cards on the welcome screen
   - Use quick actions in the sidebar
   - Experiment with voice commands

---

## 💬 Basic Commands

### Greetings
```
"Hello Jarvis"
"Good morning"
"Hey there"
```

### Schedule Management
```
"What's on my schedule today?"
"Show me my calendar for this week"
"Do I have any meetings tomorrow?"
"Add a meeting at 3 PM"
```

### Task Management
```
"What tasks do I have?"
"Create a new task"
"Mark task as complete"
"Show high priority tasks"
```

### Notes
```
"Take a note"
"Remember this: [your note]"
"Show my recent notes"
"Search notes for [keyword]"
```

### GitHub
```
"Show my GitHub stats"
"List my repositories"
"Show recent commits"
"Open pull requests"
```

### Reminders
```
"Remind me to [task] at [time]"
"Set a reminder for tomorrow"
"Show my reminders"
```

### Weather
```
"What's the weather?"
"Weather forecast for today"
"Will it rain tomorrow?"
```

---

## 🎤 Voice Commands

### Activate Voice Input
- Click the microphone button (🎤)
- Or press `Ctrl/Cmd + Shift + V`
- Speak your command
- Jarvis will process and respond

### Voice Tips
- Speak clearly and at normal pace
- Wait for the red indicator before speaking
- Voice will auto-send if confidence is high
- You can edit the transcribed text before sending

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Focus input field |
| `Ctrl/Cmd + L` | Clear chat history |
| `Ctrl/Cmd + E` | Export chat |
| `Ctrl/Cmd + Shift + V` | Toggle voice input |
| `Enter` | Send message |
| `Shift + Enter` | New line |

---

## 🔧 Advanced Features

### Custom Shortcuts

Create your own shortcuts in `config/shortcuts.json`:

```json
{
  "gm": "Good morning Jarvis, what's my schedule?",
  "status": "Show GitHub stats and pending tasks"
}
```

Then just type `gm` or `status` to trigger them!

### Auto-Save

Jarvis automatically saves:
- All conversations (every message)
- Notes (every 5 minutes)
- Tasks (on change)
- Settings (on change)

### Data Export

Export your data anytime:
- Click export button
- Or use `Ctrl/Cmd + E`
- Downloads as JSON file

---

## 📱 Mobile Usage

### Add to Home Screen

**iOS (Safari):**
1. Open Jarvis in Safari
2. Tap Share button (square with arrow)
3. Scroll and tap "Add to Home Screen"
4. Name it "Jarvis" and tap Add
5. Icon appears on home screen

**Android (Chrome):**
1. Open Jarvis in Chrome
2. Tap menu (three dots)
3. Select "Add to Home screen"
4. Name it "Jarvis" and tap Add
5. Icon appears in app drawer

### Mobile Tips
- Use voice input for easier typing
- Swipe to access sidebar (if available)
- Landscape mode for better view
- Works offline (cached data)

---

## 🎯 Use Cases

### Morning Routine
```
"Good morning Jarvis"
→ Shows schedule, weather, and tasks
```

### Quick Note
```
"Take a note: Project idea - AI-powered task manager"
→ Saves note with timestamp
```

### Code Review
```
"Show me open pull requests in my repos"
→ Lists all open PRs
```

### End of Day
```
"Give me a summary of my day"
→ Shows completed tasks, commits, and activities
```

---

## 🔍 Search & Find

### Search Notes
```
"Search notes for 'meeting'"
"Find notes about project"
```

### Search Tasks
```
"Find tasks related to GitHub"
"Show tasks due this week"
```

### Search Conversations
```
"What did we discuss about [topic]?"
"Show conversation from yesterday"
```

---

## 🛠️ Customization

### Change Theme
Edit `config/settings.json`:
```json
{
  "ui": {
    "theme": "dark-mode"  // or "light-mode", "cyberpunk"
  }
}
```

### Adjust AI Behavior
```json
{
  "ai": {
    "temperature": 0.7,  // 0.0 = focused, 1.0 = creative
    "max_tokens": 2000
  }
}
```

### Enable/Disable Features
```json
{
  "features": {
    "voice_enabled": true,
    "auto_speak": false,
    "notifications": true
  }
}
```

---

## 🐛 Troubleshooting

### Jarvis Not Responding
1. Check internet connection
2. Refresh the page
3. Clear browser cache
4. Check browser console for errors

### Voice Not Working
1. Allow microphone permissions
2. Use HTTPS connection
3. Try Chrome/Edge/Safari
4. Check microphone settings

### Data Not Saving
1. Check GitHub connection
2. Verify repository access
3. Check browser storage
4. Try manual export

---

## 💡 Tips & Tricks

1. **Be Specific**: More details = better responses
2. **Use Context**: Jarvis remembers recent conversations
3. **Try Voice**: Faster than typing on mobile
4. **Explore Shortcuts**: Save time with custom commands
5. **Regular Backups**: Export data periodically
6. **Update Settings**: Customize to your preferences

---

## 📚 Learn More

- [Feature List](FEATURES.md)
- [API Reference](API.md)
- [Bhindi AI Docs](https://docs.bhindi.io)

---

## 🆘 Need Help?

If you encounter issues:
1. Check this guide
2. Review documentation
3. Check GitHub Issues
4. Contact Bhindi AI support

---

**Happy chatting with Jarvis! 🤖**