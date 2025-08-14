// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  rating: number;
  investment: string;
  progress: number;
  tech: string[];
  completion: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

// Chat types
export interface ChatMessage {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
}

export interface ChatBotAPIConfig {
  apiUrl?: string;
  apiKey?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

// Auth types
export interface CookieOptions {
  expires?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}
