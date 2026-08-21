import { ModelInfo } from './types';

export const AVAILABLE_MODELS: ModelInfo[] = [
  // OpenAI Models
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    description: 'Most capable model. Best for complex reasoning.',
    maxTokens: 8192,
    costPer1kTokens: { input: 0.03, output: 0.06 },
  },
  {
    id: 'gpt-4-turbo-preview',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    description: 'Faster than GPT-4 with improved performance.',
    maxTokens: 128000,
    costPer1kTokens: { input: 0.01, output: 0.03 },
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    description: 'Fast and efficient. Great for most tasks.',
    maxTokens: 4096,
    costPer1kTokens: { input: 0.0005, output: 0.0015 },
  },

  // Anthropic Models
  {
    id: 'claude-3-opus-20240229',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    description: 'Most capable Claude model. Excellent reasoning.',
    maxTokens: 200000,
    costPer1kTokens: { input: 0.015, output: 0.075 },
  },
  {
    id: 'claude-3-sonnet-20240229',
    name: 'Claude 3 Sonnet',
    provider: 'anthropic',
    description: 'Balanced performance and cost. Recommended.',
    maxTokens: 200000,
    costPer1kTokens: { input: 0.003, output: 0.015 },
  },
  {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    description: 'Fast and compact. Best for simple tasks.',
    maxTokens: 200000,
    costPer1kTokens: { input: 0.00025, output: 0.00125 },
  },

  // Google Models
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'google',
    description: 'Google\'s powerful generative model.',
    maxTokens: 32768,
    costPer1kTokens: { input: 0.0005, output: 0.0015 },
  },
];

export function getModelInfo(modelId: string): ModelInfo | undefined {
  return AVAILABLE_MODELS.find((m) => m.id === modelId);
}

export function getModelsByProvider(provider: string): ModelInfo[] {
  return AVAILABLE_MODELS.filter((m) => m.provider === provider);
}
