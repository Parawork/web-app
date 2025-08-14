import { useState, useRef, useEffect } from 'react';
import { chatBotService } from '../../services/chatBotService';
import { chatBotConfig } from '../../config/chatBotConfig';
import {
  Send,
  X,
  Bot,
  User,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatBotProps {
  isDarkMode: boolean;
  onSendMessage?: (message: string) => Promise<string>;
  botName?: string;
  welcomeMessage?: string;
}

const ChatBot = ({
  isDarkMode,
  onSendMessage,
  botName = chatBotConfig.bot.name,
  welcomeMessage = chatBotConfig.bot.welcomeMessage,
}: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        content: welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }
  }, [welcomeMessage]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Add typing indicator
      const typingMessage: Message = {
        id: `typing-${Date.now()}`,
        content: '',
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages(prev => [...prev, typingMessage]);

      let botResponse = '';
      
      if (onSendMessage) {
        // Use provided API function
        botResponse = await onSendMessage(userMessage.content);
      } else {
        // Use chatBotService for AI responses with professional formatting
        const response = await chatBotService.sendMessage(userMessage.content, []);
        
        // Format response for professional presentation (maximum 150 characters or take first two sentences)
        // This provides more detailed yet concise responses for professional use
        const sentences = response.split('. ');
        if (sentences.length > 1) {
          botResponse = sentences.slice(0, 2).join('. ') + '.';
        } else {
          botResponse = sentences[0];
        }
        

        
      }

      // Remove typing indicator and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, {
          id: Date.now().toString(),
          content: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        }];
      });

    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, {
          id: Date.now().toString(),
          content: "I'm experiencing some technical difficulties. Let me try to help you with our construction services instead! Feel free to ask about our smart building solutions.",
          sender: 'bot',
          timestamp: new Date(),
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const getGlassStyle = () => {
    return isDarkMode
      ? "bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 shadow-2xl shadow-slate-950/50"
      : "bg-white/80 backdrop-blur-lg border border-slate-200/70 shadow-2xl shadow-slate-300/50";
  };

  const getMessageBubbleStyle = (sender: 'user' | 'bot') => {
    if (sender === 'user') {
      return isDarkMode
        ? "bg-blue-600 text-white"
        : "bg-blue-500 text-white";
    }
    return isDarkMode
      ? "bg-slate-700 text-slate-100"
      : "bg-slate-200 text-slate-800";
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-window {
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .message-bubble { animation: fadeInUp 0.5s ease-out forwards; }
        /* Futuristic styles */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .futuristic-button {
          background: linear-gradient(45deg, #00fffa, #007cff, #d500f9);
          background-size: 200% 200%;
          animation: gradientShift 4s ease infinite;
          box-shadow: 0 0 12px rgba(0,255,250,0.7), 0 0 24px rgba(213,0,249,0.5);
        }
        .futuristic-window {
          border: 1px solid rgba(0,255,250,0.6);
          box-shadow: 0 0 16px rgba(0,255,250,0.5);
          backdrop-filter: blur(24px);
          background: rgba(10,10,30,0.8);
        }
      `}</style>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-5 left-5 z-50 flex items-center justify-center w-16 h-16 rounded-full transition-transform duration-300 transform hover:scale-110 group futuristic-button`}
          aria-label="Open AI Assistant"
        >
          <Bot
            className={`w-8 h-8 transition-colors duration-300 ${isDarkMode ? "text-slate-300 group-hover:text-white" : "text-slate-100 group-hover:text-slate-400"}`}
          />
          <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`chat-window futuristic-window fixed inset-0 sm:inset-auto sm:bottom-5 sm:left-5 z-50 w-full h-full sm:w-[400px] sm:max-h-[calc(100vh-40px)] flex flex-col ${getGlassStyle()} sm:rounded-2xl overflow-hidden ${
            isMinimized ? "sm:h-16" : "sm:h-[600px]"
          } ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 futuristic-window animate-gradient neon-glow flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div
                className={`relative w-10 h-10 flex items-center justify-center rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}
              >
                <Bot
                  className={`w-6 h-6 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 dark:border-slate-900 border-white"></div>
              </div>
              <div>
                <h3
                  className={`text-md font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-300"}`}
                >
                  {botName}
                </h3>
                <p
                  className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-200"}`}
                >
                  AI Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 neon-glow text-white hover:text-cyan-200 transition-colors duration-200 rounded-lg"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? "text-slate-400 hover:bg-red-500/20 hover:text-red-400"
                    : "text-slate-200 hover:bg-red-100 hover:text-red-500"
                }`}
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div
                className={`flex-1 p-4 space-y-4 overflow-y-auto ${
                  isDarkMode ? "bg-slate-800/30" : "bg-slate-100/30"
                } [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-400/50 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600/50 [&::-webkit-scrollbar-thumb]:rounded-full`}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex message-bubble ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%]`}>
                      {message.sender === "bot" && (
                        <div
                          className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}
                        >
                          <Bot
                            className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div
                          className={`px-4 py-2.5 rounded-xl ${getMessageBubbleStyle(message.sender)}`}
                        >
                          {message.isTyping ? (
                            <div className="flex items-center space-x-1.5">
                              <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                              <div
                                className="w-2 h-2 bg-current rounded-full animate-pulse"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-current rounded-full animate-pulse"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          ) : (
                            <p className="text-sm leading-normal whitespace-pre-wrap">
                              {message.content}
                            </p>
                          )}
                        </div>
                        <p
                          className={`text-xs mt-1.5 px-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"} ${message.sender === "user" ? "text-right" : "text-left"}`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div
                          className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${isDarkMode ? "bg-blue-600" : "bg-blue-500"}`}
                        >
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                className={`px-4 py-3 border-t ${isDarkMode ? "border-slate-700/50" : "border-slate-200/70"} flex-shrink-0`}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask anything..."
                      disabled={isLoading}
                      className={`w-full px-4 py-2.5 transition-all duration-300 text-sm rounded-lg border ${
                        isDarkMode
                          ? "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:ring-blue-500/50 focus:border-blue-500"
                          : "bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:ring-blue-500/50 focus:border-blue-500"
                      } focus:outline-none focus:ring-2`}
                    />
                  </div>

                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className={`p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center ${
                      !inputValue.trim() || isLoading
                        ? isDarkMode
                          ? "bg-slate-700 text-slate-500"
                          : "bg-slate-200 text-slate-400"
                        : isDarkMode
                          ? "bg-blue-600 hover:bg-blue-500 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                    } disabled:cursor-not-allowed`}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className={`mt-2 text-center`}>
                  <p
                    className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
                  >
                    Powered by AI
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
