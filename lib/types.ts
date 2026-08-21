// AI Model Types
export type AIModel = 'gpt-4' | 'gpt-4-turbo' | 'gpt-3.5-turbo' | 'claude-3-opus' | 'claude-3-sonnet' | 'claude-3-haiku' | 'gemini-pro';

export type AIProvider = 'openai' | 'anthropic' | 'google';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: AIModel;
  timestamp: number;
  loading?: boolean;
  error?: string;
}

export interface ChatRequest {
  model: AIModel;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  content?: string;
  error?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}

export interface CompareRequest {
  prompt: string;
  models: AIModel[];
  temperature?: number;
  maxTokens?: number;
}

export interface CompareResponse {
  success: boolean;
  results?: Record<AIModel, string>;
  error?: string;
}

export interface ModelInfo {
  id: AIModel;
  name: string;
  provider: AIProvider;
  description: string;
  maxTokens: number;
  costPer1kTokens: {
    input: number;
    output: number;
  };
}

export interface Conversation {
  id: string;
  title: string;
  model: AIModel;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}
