import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ThemeToggle } from '@/components/Theme/ThemeToggle';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Master - Compare AI Models',
  description: 'Compare responses from OpenAI, Anthropic, and Google AI models in one unified platform.',
  icons: {
    icon: '🤖',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                try {
                  const isDark = localStorage.getItem('theme-dark') === 'true' ||
                    (!localStorage.getItem('theme-dark') && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <header className="border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
              <h1 className="text-xl font-bold">🤖 AI Master</h1>
              <ThemeToggle />
            </header>
            {/* Main Content */}
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
