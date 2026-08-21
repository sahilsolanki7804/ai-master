'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChatWindow } from '@/components/Chat';
import { getModelInfo } from '@/lib/models';
import { Zap, Compass, Settings } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col">
      <ChatWindow />
    </div>
  );
}
