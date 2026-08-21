import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatRequest, ChatResponse } from '../types';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '');

export async function chatWithGoogle(request: ChatRequest): Promise<ChatResponse> {
  try {
    if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
      return {
        success: false,
        error: 'Google API key not configured',
      };
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history: request.messages
        .filter((m) => m.role !== 'system')
        .slice(0, -1)
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
      generationConfig: {
        temperature: request.temperature || 0.7,
        maxOutputTokens: request.maxTokens || 2000,
      },
    });

    const lastMessage = request.messages[request.messages.length - 1]?.content || '';
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const content = response.text();

    return {
      success: true,
      content,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Google Generative AI Error: ${message}`,
    };
  }
}
