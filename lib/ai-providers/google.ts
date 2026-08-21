import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIResponse, Message } from './types';

let googleInstance: GoogleGenerativeAI | null = null;

function getGoogleInstance(): GoogleGenerativeAI {
  if (!googleInstance) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_GOOGLE_API_KEY not configured');
    }
    googleInstance = new GoogleGenerativeAI(apiKey);
  }
  return googleInstance;
}

export async function useGoogle(
  model: string,
  messages: Message[],
  temperature: number = 0.7,
  maxTokens: number = 2000
): Promise<AIResponse> {
  try {
    const client = getGoogleInstance();
    const genModel = client.getGenerativeModel({ model: model || 'gemini-pro' });

    const lastMessage = messages[messages.length - 1]?.content || '';

    const result = await genModel.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: lastMessage }],
        },
      ],
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
      },
    });

    const response = await result.response;
    const content = response.text();

    return {
      success: true,
      content,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown Google error',
    };
  }
}
