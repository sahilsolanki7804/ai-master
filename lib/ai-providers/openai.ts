import { OpenAI } from 'openai';
import { AIResponse, Message } from './types';

let openaiInstance: OpenAI | null = null;

function getOpenAIInstance(): OpenAI {
  if (!openaiInstance) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_OPENAI_API_KEY not configured');
    }
    openaiInstance = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Allow browser usage
    });
  }
  return openaiInstance;
}

export async function useOpenAI(
  model: string,
  messages: Message[],
  temperature: number = 0.7,
  maxTokens: number = 2000
): Promise<AIResponse> {
  try {
    const client = getOpenAIInstance();

    const response = await client.chat.completions.create({
      model: model || 'gpt-3.5-turbo',
      messages,
      temperature,
      max_tokens: maxTokens,
    });

    const content = response.choices[0]?.message?.content || '';

    return {
      success: true,
      content,
      usage: {
        inputTokens: response.usage?.prompt_tokens,
        outputTokens: response.usage?.completion_tokens,
        totalTokens: response.usage?.total_tokens,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown OpenAI error',
    };
  }
}
