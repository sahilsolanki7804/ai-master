# 📝 AI Master - Project Architecture

## Overview

AI Master is a **client-side only** AI model comparison and chat platform. It integrates with multiple AI providers (OpenAI, Anthropic, Google) and allows users to chat with and compare AI models.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser / Client                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App (React)                      │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │  pages/                                          │ │  │
│  │  │  - page.tsx (Chat)                              │ │  │
│  │  │  - compare/page.tsx (Comparison)               │ │  │
│  │  │  - chat/[id]/page.tsx (History)                │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │  components/                                      │ │  │
│  │  │  - Chat/ (ChatWindow, MessageList, InputBar)    │ │  │
│  │  │  - Compare/ (CompareWindow)                     │ │  │
│  │  │  - Sidebar/ (History, Navigation)              │ │  │
│  │  │  - Theme/ (Dark Mode)                          │ │  │
│  │  │  - ui/ (Button, Card, etc)                     │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │  lib/                                            │ │  │
│  │  │  - ai-providers/ (OpenAI, Anthropic, Google)   │ │  │
│  │  │  - storage.ts (localStorage)                   │ │  │
│  │  │  - models.ts (Model definitions)               │ │  │
│  │  │  - types.ts (TypeScript interfaces)            │ │  │
│  │  │  - utils.ts (Helper functions)                 │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┼─────────┐
                    │         │         │
                    ▼         ▼         ▼
            ┌──────────┐ ┌──────────┐ ┌──────────┐
            │ OpenAI   │ │Anthropic │ │ Google   │
            │  API     │ │   API    │ │   API    │
            └──────────┘ └──────────┘ └──────────┘
```

## Data Flow

### Chat Flow
```
1. User types message
         ↓
2. InputBar component captures text
         ↓
3. onSendMessage callback triggered
         ↓
4. Message added to state
         ↓
5. Model determined (gpt-4, claude, gemini)
         ↓
6. Route to appropriate AI provider function
         ↓
7. API call made from browser
         ↓
8. Response streamed/received
         ↓
9. Message updated in state
         ↓
10. Auto-save to localStorage
         ↓
11. UI re-renders
```

### Storage Flow
```
Conversation State
         ↓
  onMessagesChange
         ↓
  saveConversation()
         ↓
  localStorage.setItem()
         ↓
  Browser persists data
```

## Component Hierarchy

```
RootLayout
├── Sidebar
│   └── Conversation List
├── Header
│   ├── App Title
│   └── ThemeToggle
└── Main Content
    ├── ChatWindow (on /)
    │   ├── Header
    │   │   ├── Title
    │   │   └── ModelSelector
    │   ├── MessageList
    │   │   └── Message[] (user/assistant)
    │   └── InputBar
    │       └── Form (input + submit)
    │
    └── CompareWindow (on /compare)
        ├── Prompt Input
        ├── Model Checkboxes
        ├── Compare Button
        └── Results Grid
            └── Response Cards[]
```

## Key Files

### App Structure
- `app/layout.tsx` - Root layout with Sidebar & Header
- `app/page.tsx` - Home (chat interface)
- `app/compare/page.tsx` - Model comparison
- `app/chat/[id]/page.tsx` - Individual chat history

### Components
- `components/Chat/ChatWindow.tsx` - Main chat logic
- `components/Chat/MessageList.tsx` - Display messages
- `components/Chat/InputBar.tsx` - Text input form
- `components/Chat/ModelSelector.tsx` - Model dropdown
- `components/Compare/CompareWindow.tsx` - Comparison UI
- `components/Sidebar/Sidebar.tsx` - Chat history
- `components/Theme/ThemeToggle.tsx` - Dark mode

### Libraries
- `lib/ai-providers/openai.ts` - OpenAI integration
- `lib/ai-providers/anthropic.ts` - Anthropic integration
- `lib/ai-providers/google.ts` - Google integration
- `lib/storage.ts` - localStorage utilities
- `lib/models.ts` - Model definitions
- `lib/types.ts` - TypeScript types
- `lib/utils.ts` - Helper functions

## State Management

AI Master uses **React hooks** for state management:

```typescript
// In ChatWindow.tsx
const [messages, setMessages] = useState<Message[]>([])
const [selectedModel, setSelectedModel] = useState<string>('gpt-3.5-turbo')
const [isLoading, setIsLoading] = useState(false)
```

No Redux/Context needed for this prototype.

## API Integration

### OpenAI Example
```typescript
import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const response = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'user', content: 'Hello!' }
  ],
});
```

Same pattern for Anthropic and Google.

## Styling

- **Framework**: Tailwind CSS
- **Icons**: Lucide React
- **Dark Mode**: CSS class toggle on `<html>`
- **Animations**: Tailwind keyframes + CSS animations

## Type Safety

```typescript
// Core types in lib/types.ts
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: AIModel;
  timestamp: number;
  loading?: boolean;
  error?: string;
}

export interface Conversation {
  id: string;
  title: string;
  model: AIModel;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}
```

## Browser APIs Used

- `localStorage` - Persist conversations
- `navigator.clipboard` - Copy to clipboard
- `Date.now()` - Timestamps
- `window.matchMedia()` - Dark mode preference

## Performance Considerations

1. **Lazy Loading** - Components only render when visible
2. **Message Virtualization** - Could be added for 1000+ messages
3. **API Caching** - Could cache repeated prompts
4. **Code Splitting** - Next.js handles automatically
5. **Image Optimization** - Via Next.js Image component

## Security Notes

⚠️ **This is a prototype**

- API keys in `.env.local` are exposed to browser
- No authentication implemented
- No rate limiting
- No data encryption

**For Production:**
- Move API calls to backend
- Use secure env variables
- Implement authentication
- Add rate limiting
- Use HTTPS
- Add CORS headers

## Deployment

Optimized for **Vercel**:

```bash
git push origin main
# Vercel auto-deploys
```

Also works on: Netlify, Docker, Any Node.js host

## Future Improvements

1. Add backend for API key security
2. Database for persistent storage
3. User authentication
4. Usage analytics
5. Prompt templates
6. File uploads
7. Voice input/output
8. Mobile apps

---

This architecture prioritizes **simplicity and speed to prototype** while maintaining room for scale.
