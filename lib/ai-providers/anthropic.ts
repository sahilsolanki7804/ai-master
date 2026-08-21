import Anthropic from '@anthropic-ai/sdk';
import { AIResponse, Message } from './types';

let anthropicInstance: Anthropic | null = null;

function getAnthropicInstance(): Anthropic {
  if (!anthropicInstance) {
    const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_ANTHROPIC_API_KEY not configured');
    }
    anthropicInstance = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true, // Allow browser usage
    });
  }
  return anthropicInstance;
}

export async function useAnthropic(
  model: string,
  messages: Message[],
  temperature: number = 0.7,
  maxTokens: number = 2000
): Promise<AIResponse> {
  try {
    const client = getAnthropicInstance();

    const systemMessage = 'You are a helpful AI assistant.';
    const userMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
    })) as Anthropic.MessageParam[];

    const response = await client.messages.create({
      model: model || 'claude-3-sonnet-20240229',
      max_tokens: maxTokens,
      system: systemMessage,
      messages: userMessages,
    });

    const content = response.content[0]?.type === 'text' ? response.content[0].text : '';

    return {
      success: true,
      content,
      usage: {
        inputTokens: response.usage?.input_tokens,
        outputTokens: response.usage?.output_tokens,
        totalTokens: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown Anthropic error',
    };
  }
}
