export interface AIResponse {
  success: boolean;
  content?: string;
  error?: string;
  usage?: {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
  };
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
