'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface ThemeToggleProps {
  onSidebarToggle?: () => void;
}

export function ThemeToggle({ onSidebarToggle }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const isDarkMode = html.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
        title="Toggle dark mode"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <button
        onClick={onSidebarToggle}
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition lg:hidden"
        title="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>
    </div>
  );
}
