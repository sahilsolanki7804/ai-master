'use client';

import React from 'react';
import { AVAILABLE_MODELS } from '@/lib/models';
import { ChevronDown } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  disabled?: boolean;
}

export function ModelSelector({ selectedModel, onModelChange, disabled = false }: ModelSelectorProps) {
  return (
    <div className="relative group">
      <button
        disabled={disabled}
        className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
      >
        <span className="hidden sm:inline">{selectedModel}</span>
        <span className="sm:hidden">Model</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-96 overflow-y-auto">
        {AVAILABLE_MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition border-b border-slate-100 dark:border-slate-700 last:border-b-0 ${
              selectedModel === model.id
                ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500'
                : ''
            }`}
          >
            <div className="font-medium text-sm">{model.name}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {model.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
