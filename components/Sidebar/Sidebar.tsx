'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Conversation } from '@/lib/types';
import { getAllConversations, deleteConversation } from '@/lib/storage';
import { formatDate, truncateText } from '@/lib/utils';
import { Plus, Trash2, MessageSquare } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const loadConversations = () => {
      const convos = getAllConversations();
      setConversations(convos.sort((a, b) => b.updatedAt - a.updatedAt));
    };

    loadConversations();
    const interval = setInterval(loadConversations, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    deleteConversation(id);
    setConversations((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <aside
      className={`fixed lg:static top-0 left-0 h-screen w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-4 z-40 transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">💬 Conversations</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* New Chat Button */}
      <Link
        href="/"
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
      >
        <Plus className="w-5 h-5" />
        New Chat
      </Link>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-slate-600 dark:text-slate-400">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No conversations yet</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="group relative p-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <Link href={`/chat/${conversation.id}`}>
                <div className="truncate font-medium text-sm">{conversation.title}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {formatDate(conversation.updatedAt)}
                </div>
              </Link>
              <button
                onClick={(e) => handleDelete(conversation.id, e)}
                className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
