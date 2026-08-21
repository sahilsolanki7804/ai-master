'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChatWindow } from '@/components/Chat';
import { getConversation, saveConversation } from '@/lib/storage';
import { Conversation, Message } from '@/lib/types';

export default function ChatPage() {
  const params = useParams();
  const conversationId = params?.id as string;
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) return;

    const conv = getConversation(conversationId);
    if (conv) {
      setConversation(conv);
    }
    setLoading(false);
  }, [conversationId]);

  const handleMessagesChange = (messages: Message[]) => {
    if (!conversation) return;

    const updated = {
      ...conversation,
      messages,
      updatedAt: Date.now(),
    };

    setConversation(updated);
    saveConversation(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🤖</div>
          <p>Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-lg mb-4">Conversation not found</p>
          <a href="/" className="text-blue-500 hover:underline">
            Start a new chat
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ChatWindow
        initialMessages={conversation.messages}
        onMessagesChange={handleMessagesChange}
      />
    </div>
  );
}
