// AI ChatBot API Service
// This file contains the API integration logic for the chatbot
// You can replace the mock implementation with your actual AI API

import { chatBotConfig } from '../config/chatBotConfig';
import type { ChatMessage, ChatBotAPIConfig } from "../types";

class ChatBotService {
  private config: ChatBotAPIConfig;

  constructor(config: ChatBotAPIConfig = {}) {
    this.config = {
      apiUrl: config.apiUrl || chatBotConfig.api.url,
      apiKey: config.apiKey || chatBotConfig.api.key,
      model: config.model || chatBotConfig.api.model,
      maxTokens: config.maxTokens || chatBotConfig.api.maxTokens,
      temperature: config.temperature || chatBotConfig.api.temperature,
      ...config
    };
  }

  // Update configuration
  updateConfig(newConfig: Partial<ChatBotAPIConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  // Send message to AI API
  async sendMessage(message: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    try {
      // If no API key is configured, use mock response
      if (!this.config.apiKey || this.config.apiKey.trim() === '' ) {
        return this.getMockResponse(message);
      }

      // Check if using Google Gemini API
      const isGeminiAPI = this.config.apiUrl?.includes('generativelanguage.googleapis.com');
      
      // Validate Gemini API key format
      if (isGeminiAPI && !this.config.apiKey.startsWith('AIzaSy')) {
        console.warn('Warning: API key format may be incorrect for Gemini API. Gemini keys typically start with "AIzaSy"');
      }
      
      if (isGeminiAPI) {
        return this.sendGeminiMessage(message, conversationHistory);
      } else {
        return this.sendOpenAIMessage(message, conversationHistory);
      }

    } catch (error) {
      console.error('ChatBot API Error:', error);
      
      // Fallback to mock response on error
      return this.getMockResponse(message);
    }
  }

  // Send message to Google Gemini API
  private async sendGeminiMessage(message: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    // Build conversation context for Gemini
    let fullPrompt = this.getSystemPrompt() + '\n\n';
    
    // Add conversation history
    conversationHistory.slice(-5).forEach(msg => {
      fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
    });
    
    // Add current message
    fullPrompt += `User: ${message}\nAssistant:`;

    const geminiUrl = `${this.config.apiUrl}?key=${this.config.apiKey}`;
    
    const requestBody = {
      contents: [{
        parts: [{
          text: fullPrompt
        }]
      }],
      generationConfig: {
        temperature: this.config.temperature,
        maxOutputTokens: this.config.maxTokens,
      }
    };
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I couldn\'t generate a response.';
    
    return responseText;
  }

  // Send message to OpenAI API (fallback)
  private async sendOpenAIMessage(message: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    // Prepare conversation context
    const messages = [
      {
        role: 'system',
        content: this.getSystemPrompt()
      },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      {
        role: 'user',
        content: message
      }
    ];

    // Make API call
    const response = await fetch(this.config.apiUrl!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: messages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.';
  }

  // System prompt for the AI assistant
  private getSystemPrompt(): string {
    return `You are CB Assistant, a helpful AI assistant for CB Construction, a cutting-edge construction company in Sri Lanka specializing in smart buildings and sustainable technology.

COMPANY INFORMATION:
- CB Construction has been innovating since 1999
- Services: Smart commercial spaces, future living homes, digital infrastructure, and adaptive renovation
- Technologies: AI integration, IoT systems, BIM (Building Information Modeling), and green technology
- Notable projects: Colombo Tech Hub 2030, Kandy Green Residences, and Galle Smart Bridge
- Contact: +778811562, parakramawork@gmail.com

YOUR ROLE:
- Be helpful, professional, and knowledgeable about construction and technology
- Focus on CB Construction's services and capabilities
- Provide accurate information about smart buildings, AI integration, and sustainable construction
- Keep responses concise but informative (under 150 words)
- Always maintain a friendly and professional tone
- If asked about topics outside construction, politely redirect to construction-related topics

RESPONSE GUIDELINES:
- Answer in a conversational, helpful tone
- Use bullet points for lists when appropriate
- Mention specific CB Construction projects and services when relevant
- Always end with an offer to help further

Remember: You represent CB Construction's innovative and forward-thinking brand. Focus on smart buildings, sustainability, and cutting-edge construction technology.`;
  }

  // Mock response function for testing without API
  private getMockResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('start')) {
      return "Hello! I'm CB Assistant, your AI helper for all things construction and smart buildings. CB Construction has been pioneering innovative building solutions since 1999. How can I help you today?";
    }
    
    if (message.includes('service') || message.includes('what do you do') || message.includes('offer')) {
      return "We offer four main services:\n• 🏢 Smart Commercial Spaces with AI integration\n• 🏠 Future Living Homes with automation\n• 🌐 Digital Infrastructure for smart cities\n• 🔄 Adaptive Renovation using cutting-edge technology\n\nAll our projects focus on sustainability and innovation!";
    }
    
    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
      return "Our flagship projects include:\n• 🏗️ Colombo Tech Hub 2030 - A 60-story AI-powered smart building\n• 🌿 Kandy Green Residences - Carbon-neutral homes with vertical gardens\n• 🌉 Galle Smart Bridge - IoT-enabled infrastructure with real-time monitoring\n\nEach project showcases our commitment to innovation and sustainability.";
    }
    
    if (message.includes('technology') || message.includes('ai') || message.includes('smart') || message.includes('iot')) {
      return "We integrate cutting-edge technologies like:\n• 🏗️ BIM (Building Information Modeling)\n• 📱 IoT systems for smart automation\n• 🤖 AI for building management\n• 🌱 Green tech for sustainability\n• ⚡ Energy optimization systems\n\nThese technologies create buildings that adapt, learn, and evolve with their users!";
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('reach')) {
      return "You can reach CB Construction at:\n📞 +94 77 352 8200\n📧 future@cbconstruction.lk\n📍 123 Future Avenue, Colombo 03, Sri Lanka\n\nWe're here to help with your construction and smart building needs!";
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('budget')) {
      return "Project costs vary based on scope, technology integration, and specific requirements. Factors include:\n• Building size and complexity\n• Smart technology features\n• Sustainability requirements\n• Timeline and location\n\nI'd recommend contacting our team at +94 77 352 8200 for a detailed consultation and personalized quote.";
    }
    
    if (message.includes('sustainable') || message.includes('green') || message.includes('environment') || message.includes('eco')) {
      return "Sustainability is core to our mission! We use:\n• ☀️ Renewable energy systems\n• 🌱 Carbon-neutral building materials\n• 💡 Energy-efficient AI management\n• 🌿 Vertical gardens and green spaces\n• 💧 Smart water management systems\n• ♻️ Waste reduction technologies\n\nOur goal is to build the future while protecting our environment.";
    }
    
    if (message.includes('time') || message.includes('duration') || message.includes('how long')) {
      return "Project timelines depend on complexity:\n• 🏠 Residential projects: 6-18 months\n• 🏢 Commercial buildings: 12-36 months\n• 🌉 Infrastructure projects: 18-48 months\n• 🔄 Renovations: 3-12 months\n\nWe use advanced project management and BIM technology to ensure timely delivery!";
    }
    
    if (message.includes('location') || message.includes('where') || message.includes('sri lanka')) {
      return "CB Construction operates throughout Sri Lanka:\n• 🏙️ Colombo - Our main headquarters\n• 🏔️ Kandy - Regional office\n• 🏖️ Galle - Coastal projects division\n• 🌴 Island-wide project coverage\n\nWe're expanding our smart building expertise across the country!";
    }
    
    if (message.includes('team') || message.includes('staff') || message.includes('engineer') || message.includes('architect')) {
      return "Our expert team includes:\n• 👷 Certified construction engineers\n• 🏗️ Smart building architects\n• 💻 IoT and AI specialists\n• 🌱 Sustainability consultants\n• 🎯 Project management experts\n\nWith 25+ years of experience, we're Sri Lanka's leading smart construction company!";
    }
    
    return "That's a great question! I'm here to help you learn about CB Construction's innovative building solutions, smart technologies, and sustainable practices. Feel free to ask about:\n• Our services and projects\n• Smart building technologies\n• Sustainability practices\n• Project timelines and costs\n• How we can help with your construction needs!";
  }

  // Helper method to simulate typing delay
  async simulateTyping(minDelay = 1000, maxDelay = 3000): Promise<void> {
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

// Export singleton instance
export const chatBotService = new ChatBotService();

// Export class for custom instances
export default ChatBotService;
