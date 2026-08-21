import { ChatRequest, ChatResponse, CompareRequest, CompareResponse } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Failed to send message: ${message}`,
    };
  }
}

export async function compareModels(request: CompareRequest): Promise<CompareResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/compare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Failed to compare models: ${message}`,
    };
  }
}

export async function getAvailableModels() {
  try {
    const response = await fetch(`${API_BASE}/api/models`);
    if (!response.ok) throw new Error('Failed to fetch models');
    return response.json();
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}
