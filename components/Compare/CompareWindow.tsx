'use client';

import React, { useState } from 'react';
import { Message } from '@/lib/types';
import { AVAILABLE_MODELS } from '@/lib/models';
import { useOpenAI } from '@/lib/ai-providers/openai';
import { useAnthropic } from '@/lib/ai-providers/anthropic';
import { useGoogle } from '@/lib/ai-providers/google';
import { Loader2, Copy, Check } from 'lucide-react';

interface CompareWindowProps {
  initialPrompt?: string;
}

export function CompareWindow({ initialPrompt = '' }: CompareWindowProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [selectedModels, setSelectedModels] = useState<string[]>(['gpt-3.5-turbo', 'claude-3-sonnet-20240229', 'gemini-pro']);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!prompt.trim()) return;
    if (selectedModels.length === 0) return;

    setLoading(true);
    setResponses({});

    for (const modelId of selectedModels) {
      try {
        const model = AVAILABLE_MODELS.find((m) => m.id === modelId);
        if (!model) continue;

        let response;
        if (model.provider === 'openai') {
          response = await useOpenAI(modelId, [{ role: 'user', content: prompt }]);
        } else if (model.provider === 'anthropic') {
          response = await useAnthropic(modelId, [{ role: 'user', content: prompt }]);
        } else if (model.provider === 'google') {
          response = await useGoogle(modelId, [{ role: 'user', content: prompt }]);
        }

        setResponses((prev) => ({
          ...prev,
          [modelId]: response?.success ? response.content || '' : `Error: ${response?.error}`,
        }));
      } catch (error) {
        setResponses((prev) => ({
          ...prev,
          [modelId]: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        }));
      }
    }

    setLoading(false);
  };

  const toggleModel = (modelId: string) => {
    setSelectedModels((prev) =>
      prev.includes(modelId) ? prev.filter((m) => m !== modelId) : [...prev, modelId]
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">🔄 Compare AI Models</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Enter a prompt and see how different AI models respond
        </p>
      </div>

      {/* Prompt Input */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full h-32 px-4 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Model Selection */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
        <h2 className="font-bold mb-3">Select Models to Compare</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {AVAILABLE_MODELS.map((model) => (
            <label key={model.id} className="flex items-start gap-3 p-3 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition">
              <input
                type="checkbox"
                checked={selectedModels.includes(model.id)}
                onChange={() => toggleModel(model.id)}
                className="mt-1 w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <div>
                <div className="font-medium text-sm">{model.name}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{model.provider}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Compare Button */}
      <button
        onClick={handleCompare}
        disabled={loading || !prompt.trim() || selectedModels.length === 0}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Comparing...
          </>
        ) : (
          'Compare Models'
        )}
      </button>

      {/* Results */}
      {Object.keys(responses).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedModels.map((modelId) => {
            const model = AVAILABLE_MODELS.find((m) => m.id === modelId);
            const response = responses[modelId];
            return (
              <div
                key={modelId}
                className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold">{model?.name}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{model?.provider}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(response || '', modelId)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition"
                    title="Copy to clipboard"
                  >
                    {copiedId === modelId ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex-1 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap overflow-y-auto max-h-96 bg-slate-50 dark:bg-slate-800 p-3 rounded">
                  {response}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
