import Anthropic from '@anthropic-ai/sdk';
import { ChatRequest, ChatResponse } from '../types';

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
});

export async function chatWithAnthropic(request: ChatRequest): Promise<ChatResponse> {
  try {
    if (!process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY) {
      return {
        success: false,
        error: 'Anthropic API key not configured',
      };
    }

    // Extract system message if present
    const systemMessage = request.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content)
      .join('\n');

    const userMessages = request.messages.filter((m) => m.role !== 'system');

    const response = await anthropic.messages.create({
      model: request.model.includes('claude') ? request.model : 'claude-3-opus-20240229',
      max_tokens: request.maxTokens || 2000,
      system: systemMessage || undefined,
      messages: userMessages as any,
    });

    const content = response.content[0]?.type === 'text' ? response.content[0].text : '';

    return {
      success: true,
      content,
      usage: {
        inputTokens: response.usage?.input_tokens || 0,
        outputTokens: response.usage?.output_tokens || 0,
        totalTokens: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0),
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Anthropic Error: ${message}`,
    };
  }
}
