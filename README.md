# 🤖 AI Master

**AI Master** is a unified AI platform that lets you interact with multiple AI models (OpenAI, Anthropic, Google) from a single, beautiful interface. Compare responses, switch between models seamlessly, and build AI-powered applications faster.

## ✨ Features

- 🔀 **Multi-Model Support**: Seamlessly switch between GPT-4, Claude, and Gemini
- 💬 **Chat Interface**: Beautiful, responsive chat UI with real-time streaming
- 📊 **Model Comparison**: Compare responses from multiple models side-by-side
- 💾 **Chat History**: Persistent conversation storage
- 🎨 **Dark Mode**: Eye-friendly dark and light themes
- 📱 **Fully Responsive**: Works on mobile, tablet, and desktop
- ⚡ **Production Ready**: Error handling, loading states, and optimized performance
- 🔐 **Secure**: API keys handled securely on the backend

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- API keys from OpenAI, Anthropic, and/or Google

### Installation

```bash
# Clone the repository
git clone https://github.com/sahilsolanki7804/ai-master.git
cd ai-master

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-master/
├── app/
│   ├── api/                 # API routes for AI model integrations
│   │   ├── chat/           # Chat endpoint
│   │   ├── models/         # Available models endpoint
│   │   └── compare/        # Model comparison endpoint
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Chat/               # Chat interface components
│   │   ├── ChatWindow.tsx  # Main chat container
│   │   ├── MessageList.tsx # Message display
│   │   ├── InputBar.tsx    # User input
│   │   └── ModelSelector.tsx
│   ├── Compare/            # Model comparison components
│   ├── Sidebar/            # Navigation sidebar
│   ├── Theme/              # Theme toggle
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── api/                # API client utilities
│   ├── ai-providers/       # AI provider integrations
│   │   ├── openai.ts
│   │   ├── anthropic.ts
│   │   └── google.ts
│   └── types.ts            # TypeScript interfaces
├── public/                 # Static assets
├── styles/                 # Tailwind CSS config
├── .env.local.example      # Environment template
└── package.json            # Dependencies
```

## 🔌 API Providers

### OpenAI
- Models: GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
- [Get API Key](https://platform.openai.com/api-keys)

### Anthropic (Claude)
- Models: Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- [Get API Key](https://console.anthropic.com/)

### Google
- Models: Gemini Pro, Gemini Pro Vision
- [Get API Key](https://makersuite.google.com/app/apikey)

## 🛠️ Available Scripts

```bash
# Development
npm run dev      # Start dev server

# Production
npm run build    # Build for production
npm start        # Start production server

# Linting
npm run lint     # Run ESLint
```

## 📚 Usage Examples

### Single Model Chat
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});
```

### Compare Models
```typescript
const responses = await fetch('/api/compare', {
  method: 'POST',
  body: JSON.stringify({
    prompt: 'Explain quantum computing',
    models: ['gpt-4', 'claude-3-opus', 'gemini-pro']
  })
});
```

## 🎨 Customization

The app uses Tailwind CSS for styling. Customize:
- Colors in `tailwind.config.js`
- Fonts in `app/layout.tsx`
- Component styles in individual component files

## 🚨 Error Handling

All API routes include:
- Input validation
- Rate limiting
- Error messages
- Graceful fallbacks

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔮 Roadmap

- [ ] User authentication (NextAuth.js)
- [ ] Chat history persistence (PostgreSQL)
- [ ] Advanced model parameters UI
- [ ] Prompt templates library
- [ ] Export conversations
- [ ] API usage analytics
- [ ] Team collaboration features

## 📄 License

MIT License - feel free to use this in your projects!

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 💬 Questions?

Open an issue or reach out to [@sahilsolanki7804](https://github.com/sahilsolanki7804)

---

**Built with ❤️ by Sahil Solanki**
