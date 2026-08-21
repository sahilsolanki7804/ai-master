# 🚀 AI Master - Complete Setup Guide

## Quick Start (5 minutes)

### 1. Get API Keys

#### OpenAI
1. Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (you'll need it in step 3)

#### Anthropic (Claude)
1. Visit [console.anthropic.com](https://console.anthropic.com/)
2. Create a new API key
3. Copy the key

#### Google (Gemini)
1. Visit [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key

### 2. Clone & Install

```bash
git clone https://github.com/sahilsolanki7804/ai-master.git
cd ai-master
npm install
```

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:

```env
NEXT_PUBLIC_OPENAI_API_KEY=sk-...
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSy...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You're done! 🎉

---

## Features Overview

### 💬 Single Model Chat
- Select any AI model from the dropdown
- Real-time streaming responses
- Chat history in sidebar
- Dark/Light mode toggle

### 🔄 Compare Models
- Enter a prompt once
- See responses from multiple models side-by-side
- Copy responses with one click
- Perfect for testing and benchmarking

### 💾 Persistent Storage
- Conversations saved to browser localStorage
- Auto-save after each message
- Delete conversations anytime

### 🎨 Polished UI
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Smooth animations
- Loading states
- Error handling

---

## Available Models

### OpenAI
- **GPT-4** - Most capable, best for complex reasoning
- **GPT-4 Turbo** - Faster, 128K context window
- **GPT-3.5 Turbo** - Fast & affordable

### Anthropic (Claude)
- **Claude 3 Opus** - Most capable, excellent reasoning
- **Claude 3 Sonnet** - Best value, recommended
- **Claude 3 Haiku** - Fast & compact

### Google
- **Gemini Pro** - Powerful generative model

---

## Project Structure

```
ai-master/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Home (chat interface)
│   ├── chat/[id]/page.tsx       # Individual chat page
│   ├── compare/page.tsx         # Model comparison page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── Chat/                    # Chat components
│   │   ├── ChatWindow.tsx       # Main chat container
│   │   ├── MessageList.tsx      # Message display
│   │   ├── InputBar.tsx         # Text input
│   │   └── ModelSelector.tsx    # Model dropdown
│   ├── Compare/                 # Comparison components
│   │   └── CompareWindow.tsx    # Model comparison interface
│   ├── Sidebar/
│   │   └── Sidebar.tsx          # Navigation & history
│   ├── Theme/
│   │   └── ThemeToggle.tsx      # Dark mode toggle
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── ai-providers/            # AI model integrations
│   │   ├── openai.ts
│   │   ├── anthropic.ts
│   │   ├── google.ts
│   │   └── types.ts
│   ├── types.ts                 # TypeScript interfaces
│   ├── models.ts                # Model definitions
│   ├── storage.ts               # localStorage utilities
│   └── utils.ts                 # Helper functions
├── public/                      # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── .env.local.example
```

---

## How It Works

### Client-Side Only Architecture

All AI calls are made directly from your browser:

1. **User sends message** → Stored in React state
2. **Selected model determines provider** → OpenAI/Anthropic/Google
3. **API key from .env.local** → Sent with request
4. **Response streamed back** → Displayed in chat
5. **Messages saved to localStorage** → Persists on refresh

### Advantages
- ✅ No backend server needed
- ✅ Faster deployment
- ✅ Lower costs
- ✅ Works offline for existing chats
- ✅ Perfect for MVP/prototype

### Important Security Note
⚠️ **API keys are exposed in `.env.local`** - this is fine for development but NOT for production.

For production, you should:
1. Move API keys to a backend server
2. Make calls from backend instead of frontend
3. Implement rate limiting and authentication
4. Use environment variables on your hosting platform

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_OPENAI_API_KEY`
   - `NEXT_PUBLIC_ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_GOOGLE_API_KEY`
6. Click "Deploy"

Your app will be live in ~2 minutes! 🚀

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Upload the .next folder
```

**Docker:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#0f172a',
      accent: '#3b82f6', // Change this
    },
  },
}
```

### Add More Models

Edit `lib/models.ts`:

```typescript
export const AVAILABLE_MODELS: ModelInfo[] = [
  {
    id: 'your-model-id',
    name: 'Your Model',
    provider: 'your-provider',
    description: 'Description',
    maxTokens: 4096,
    costPer1kTokens: { input: 0.001, output: 0.002 },
  },
  // ...
];
```

### Modify Chat Behavior

Edit `components/Chat/ChatWindow.tsx`:

```typescript
const response = await useOpenAI(
  selectedModel,
  messages,
  0.7,           // temperature (0-1)
  2000,          // maxTokens
);
```

---

## Troubleshooting

### "API key not configured" error
- Make sure `.env.local` exists
- Verify keys are spelled correctly
- Restart dev server: `npm run dev`

### Blank responses
- Check browser console for errors (F12)
- Verify API key is valid
- Check API rate limits

### Dark mode not working
- Clear browser cache
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### Sidebar not showing on mobile
- Use the menu button in the top bar
- It's responsive and hides on small screens

---

## Development Tips

### Add Logging
```typescript
console.log('Debug info:', variable);
```

### Test Different Models
Use the compare page to test all models with the same prompt.

### Check Token Usage
Responses include token counts in the API response.

### Monitor API Costs
- Track API calls in each provider's dashboard
- Models listed with cost per 1K tokens

---

## Next Steps

1. **Customize the UI** - Match your brand colors
2. **Add authentication** - Use NextAuth.js or Auth0
3. **Add database** - Store conversations in PostgreSQL
4. **Deploy** - Push to Vercel, Netlify, or your server
5. **Monetize** - Add premium features or API access

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic Claude](https://www.anthropic.com/)
- [Google Generative AI](https://ai.google.dev/)

---

## Support

Stuck? Try these:
1. Check the error message carefully
2. Search GitHub Issues
3. Read the inline code comments
4. Check API provider documentation

Good luck with your startup! 🚀
