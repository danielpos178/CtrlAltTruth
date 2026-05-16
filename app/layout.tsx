// Licensed under the GNU AGPL-3.0-only.
import type { Metadata, Viewport } from 'next';
import './globals.css'; // Global styles
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from 'react-hot-toast';
import { Geist, Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import { BadgeUnlockModal } from '@/components/ui/BadgeUnlockModal';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export const viewport: Viewport = {
  themeColor: '#7c1f31',
};

export const metadata: Metadata = {
  title: 'Ctrl+Alt+Truth',
  description: 'Laboratorul de Adevăr - Învață să detectezi manipularea și dezinformarea.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ctrl+Alt+Truth',
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" suppressHydrationWarning className={cn("font-sans", geist.variable, lexend.variable)}>
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
              
              /* Accessibility Hydration */
              const a11y = JSON.parse(localStorage.getItem('a11y-prefs') || '{}');
              if (a11y.highContrast) document.documentElement.classList.add('theme-high-contrast');
              if (a11y.reduceMotion) document.documentElement.classList.add('reduced-motion');
              if (a11y.dyslexiaFont) document.documentElement.classList.add('dyslexia-font');
              if (a11y.fontSize) document.documentElement.style.fontSize = a11y.fontSize + 'px';
            } catch (_) {}
          `,
        }} />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#e7edeb] dark:bg-[#0a0a0a] font-sans selection:bg-[#7c1f31]/20 transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 text-[#1a1a1a] dark:text-white/90">
              {children}
            </main>
            <BadgeUnlockModal />
            <Toaster position="bottom-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
