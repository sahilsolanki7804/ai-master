'use client';

import React from 'react';
import { Message } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}
        >
          <div
            className={`max-w-xs lg:max-w-2xl rounded-lg px-4 py-3 ${
              message.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50'
            }`}
          >
            {message.loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            ) : message.error ? (
              <div className="text-red-500">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{message.error}</p>
              </div>
            ) : (
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>
            )}
            {message.model && (
              <div className="text-xs mt-2 opacity-70">
                {message.model}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
