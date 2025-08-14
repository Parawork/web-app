# AI ChatBot Integration Guide

This project includes a fully functional AI ChatBot component that can be easily integrated with any AI API. Currently, it's set up with mock responses and ready for AI API integration.

## 🚀 Quick Setup

The ChatBot is already integrated into your Dashboard and ready to use. It currently uses intelligent mock responses but can be easily connected to any AI API.

## 🔧 Configuration Files

### 1. Main Configuration: `src/config/chatBotConfig.ts`
- Update bot name, welcome message, and appearance
- Set API endpoints and models
- Configure features like typing indicators

### 2. API Service: `src/services/chatBotService.ts`
- Contains the main API integration logic
- Handles message sending and response processing
- Includes fallback mock responses

### 3. ChatBot Component: `src/components/ChatBot.tsx`
- The main UI component
- Fully responsive and theme-aware
- Minimizable chat window

## 🤖 Connecting Your AI API

### Option 1: Google Gemini API (Currently Configured)

1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. The API key is already configured in the `.env` file:
```env
VITE_CHATBOT_API_KEY=AIzaSyA4WtOVrCcwFC3WNTekYktnItM-tUBcUuA
```

3. The ChatBot will automatically use Google Gemini Pro model

### Option 2: OpenAI GPT

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)

2. Update the configuration in `src/config/chatBotConfig.ts`:
```typescript
api: {
  url: 'https://api.openai.com/v1/chat/completions',
  key: 'your_openai_api_key',
  model: 'gpt-3.5-turbo',
}
```

3. Update your `.env` file:
```env
VITE_CHATBOT_API_KEY=your_openai_api_key_here
VITE_CHATBOT_API_URL=https://api.openai.com/v1/chat/completions
```

### Option 3: Custom AI API

1. Update the API URL in `src/config/chatBotConfig.ts`:
```typescript
api: {
  url: 'https://your-ai-api.com/chat',
  key: 'your_api_key',
  // ... other config
}
```

2. Modify the request format in `src/services/chatBotService.ts` if needed:
```typescript
// Update the fetch request to match your API format
const response = await fetch(this.config.apiUrl!, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.config.apiKey}`,
    // Add any custom headers your API needs
  },
  body: JSON.stringify({
    // Format your request according to your API
    message: message,
    // ... other parameters
  }),
});
```

3. Update response parsing if your API returns different format:
```typescript
const data = await response.json();
// Adjust this line based on your API response structure
return data.response || data.message || data.content;
```

### Option 4: Custom onSendMessage Function

You can also pass a custom function directly to the ChatBot component:

```typescript
const customAIHandler = async (message: string): Promise<string> => {
  // Your custom AI logic here
  const response = await yourAIService.chat(message);
  return response;
};

// In your component:
<ChatBot 
  isDarkMode={isDarkMode} 
  onSendMessage={customAIHandler}
/>
```

## 🎨 Customization

### Bot Appearance
Update `src/config/chatBotConfig.ts`:
```typescript
bot: {
  name: 'Your Bot Name',
  welcomeMessage: 'Your welcome message',
  placeholder: 'Your input placeholder...',
}
```

### Features
Enable/disable features:
```typescript
features: {
  typing: true,          // Show typing indicator
  timestamps: true,      // Show message timestamps
  minimizable: true,     // Allow minimizing chat window
  persistent: false,     // Remember conversation on page reload
}
```

## 📱 Current Features

✅ **Responsive Design** - Works on all screen sizes  
✅ **Dark/Light Mode** - Automatically adapts to your theme  
✅ **Typing Indicators** - Shows when bot is "thinking"  
✅ **Message Timestamps** - Track conversation flow  
✅ **Minimizable** - Chat window can be minimized  
✅ **Smart Positioning** - Doesn't interfere with other UI elements  
✅ **Conversation Context** - Maintains chat history  
✅ **Error Handling** - Graceful fallbacks when API fails  
✅ **Mock Responses** - Intelligent responses while testing  

## 🧪 Testing

The ChatBot currently includes intelligent mock responses that understand:
- Questions about services
- Project inquiries
- Technology questions
- Contact information requests
- General greetings and conversation

Try asking:
- "What services do you offer?"
- "Tell me about your projects"
- "How can I contact you?"
- "What technology do you use?"

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Consider implementing rate limiting for production
- Add user authentication if needed

## 🐛 Troubleshooting

1. **ChatBot not appearing**: Check if it's imported in Dashboard.tsx
2. **API not working**: Verify your API key in .env file
3. **Styling issues**: Ensure Tailwind CSS is properly configured
4. **TypeScript errors**: Check all imports and type definitions

## 📚 API Response Format

Expected AI API response format:
```json
{
  "choices": [
    {
      "message": {
        "content": "AI response text here"
      }
    }
  ]
}
```

For different formats, update the response parsing in `chatBotService.ts`.

---

**Need help?** The ChatBot is designed to be flexible and easy to integrate. All configuration is centralized in the config files for easy customization.
