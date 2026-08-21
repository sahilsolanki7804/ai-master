import { OpenAI } from 'openai';
import { ChatRequest, ChatResponse } from '../types';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function chatWithOpenAI(request: ChatRequest): Promise<ChatResponse> {
  try {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      return {
        success: false,
        error: 'OpenAI API key not configured',
      };
    }

    const response = await openai.chat.completions.create({
      model: request.model.includes('gpt') ? request.model : 'gpt-4',
      messages: request.messages,
      temperature: request.temperature || 0.7,
      max_tokens: request.maxTokens || 2000,
    });

    const content = response.choices[0]?.message?.content || '';

    return {
      success: true,
      content,
      usage: {
        inputTokens: response.usage?.prompt_tokens || 0,
        outputTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `OpenAI Error: ${message}`,
    };
  }
}
