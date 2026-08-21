'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/types';
import { useOpenAI } from '@/lib/ai-providers/openai';
import { useAnthropic } from '@/lib/ai-providers/anthropic';
import { useGoogle } from '@/lib/ai-providers/google';
import { AIResponse } from '@/lib/ai-providers/types';
import { MessageList } from './MessageList';
import { InputBar } from './InputBar';
import { ModelSelector } from './ModelSelector';
import { AVAILABLE_MODELS } from '@/lib/models';

interface ChatWindowProps {
  initialMessages?: Message[];
  onMessagesChange?: (messages: Message[]) => void;
}

export function ChatWindow({ initialMessages = [], onMessagesChange }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-3.5-turbo');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    onMessagesChange?.(messages);
  }, [messages, onMessagesChange]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Create a placeholder for assistant message
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      model: selectedModel as any,
      timestamp: Date.now(),
      loading: true,
    };

    setMessages([...updatedMessages, assistantMessage]);

    try {
      let response: AIResponse;

      // Route to correct AI provider
      if (selectedModel.includes('gpt')) {
        response = await useOpenAI(
          selectedModel,
          updatedMessages.map((m) => ({ role: m.role, content: m.content }))
        );
      } else if (selectedModel.includes('claude')) {
        response = await useAnthropic(
          selectedModel,
          updatedMessages.map((m) => ({ role: m.role, content: m.content }))
        );
      } else if (selectedModel.includes('gemini')) {
        response = await useGoogle(
          selectedModel,
          updatedMessages.map((m) => ({ role: m.role, content: m.content }))
        );
      } else {
        response = {
          success: false,
          error: 'Unknown model selected',
        };
      }

      if (response.success) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? {
                  ...m,
                  content: response.content || '',
                  loading: false,
                }
              : m
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? {
                  ...m,
                  error: response.error || 'Unknown error occurred',
                  loading: false,
                }
              : m
          )
        );
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                error: error instanceof Error ? error.message : 'Unknown error',
                loading: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">AI Master Chat</h1>
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h2 className="text-2xl font-bold mb-2">Welcome to AI Master</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Start a conversation with any AI model
              </p>
            </div>
          </div>
        ) : (
          <>
            <MessageList messages={messages} />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-4">
        <InputBar
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder={`Message ${selectedModel}...`}
        />
      </div>
    </div>
  );
}
