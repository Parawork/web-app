// ChatBot Configuration
// Update these settings to connect your AI API

export const chatBotConfig = {
  // API Configuration
  api: {
    // Google Gemini API endpoint
    url: import.meta.env.VITE_CHATBOT_API_URL,

    // Add your Google Gemini API key here or in .env file
    // For now, we'll use mock responses if no key is provided
    key: import.meta.env.VITE_CHATBOT_API_KEY || "",

    // AI model configuration for Gemini
    model: "gemini-1.5-flash-latest",
    maxTokens: 150,
    temperature: 0.7,
  },

  // Bot Appearance & Behavior
  bot: {
    name: "CB Assistant",
    welcomeMessage:
      "Hello! I'm CB Assistant, your construction AI helper. How can I assist you today?",
    placeholder:
      "Ask me about our services, projects, or anything construction-related...",

    // Theme colors (will respect dark/light mode)
    colors: {
      primary: "from-cyan-500 to-purple-500",
      secondary: "from-purple-500 to-cyan-500",
    },
  },

  // Features
  features: {
    typing: true, // Show typing indicator
    timestamps: true, // Show message timestamps
    minimizable: true, // Allow minimizing chat window
    persistent: false, // Remember conversation on page reload
  },
};

// Environment check
export const isApiConfigured = () => {
  return Boolean(chatBotConfig.api.key);
};



export default chatBotConfig;
