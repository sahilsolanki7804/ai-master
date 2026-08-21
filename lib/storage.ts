import { Message, Conversation } from './types';

const STORAGE_KEY = 'ai-master-conversations';

export function saveConversation(conversation: Conversation): void {
  try {
    const conversations = getAllConversations();
    const index = conversations.findIndex((c) => c.id === conversation.id);

    if (index >= 0) {
      conversations[index] = conversation;
    } else {
      conversations.push(conversation);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
}

export function getAllConversations(): Conversation[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading conversations:', error);
    return [];
  }
}

export function getConversation(id: string): Conversation | null {
  const conversations = getAllConversations();
  return conversations.find((c) => c.id === id) || null;
}

export function deleteConversation(id: string): void {
  try {
    const conversations = getAllConversations();
    const filtered = conversations.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting conversation:', error);
  }
}

export function createConversation(model: string, title: string = 'New Chat'): Conversation {
  return {
    id: Date.now().toString(),
    title,
    model: model as any,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}
