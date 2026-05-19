import type {Metadata, Viewport} from 'next';
import './globals.css'; // Global styles
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import NavbarContainer from '@/components/layout/NavbarContainer';
import { Toaster } from 'react-hot-toast';
import { Geist, Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import { BadgeUnlockModal } from '@/components/ui/BadgeUnlockModal';
import { cookies } from 'next/headers';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const lexend = Lexend({subsets:['latin'],variable:'--font-lexend'});

export const viewport: Viewport = {
  themeColor: '#7c1f31',
};

import { PwaInstallPrompt } from '@/components/pwa-install-prompt';

export const metadata: Metadata = {
  title: 'Ctrl+Alt+Truth',
  description: 'Laboratorul de Adevăr - Învață să detectezi manipularea și dezinformarea.',
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

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const cookieStore = await cookies();
  
  const isSeniorMode = cookieStore.get('a11y_senior_mode')?.value === 'true';
  const isHighContrast = cookieStore.get('a11y_high_contrast')?.value === 'true';
  const isReduceMotion = cookieStore.get('a11y_reduce_motion')?.value === 'true';
  const isDyslexia = cookieStore.get('a11y_dyslexia_font')?.value === 'true';
  const fontSize = cookieStore.get('a11y_font_size')?.value || '16';
  const theme = cookieStore.get('theme')?.value; // Note: you might not be setting 'theme' cookie in toggleTheme natively unless AccessibilityMenu does it. We did sync it.

  const htmlClasses = cn(
    "font-sans", 
    geist.variable, 
    lexend.variable,
    {
      'senior-mode': isSeniorMode,
      'theme-high-contrast': isHighContrast,
      'reduced-motion': isReduceMotion,
      'dyslexia-font': isDyslexia,
      'dark': theme === 'dark'
    }
  );

  const styleObj: any = {};
  if (!isSeniorMode) {
    styleObj.fontSize = `${fontSize}px`;
  }

  return (
    <html lang="ro" suppressHydrationWarning className={htmlClasses} style={styleObj}>
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Fallbacks for client only init if cookies aren't set
            try {
              if (${!theme}) {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              }
              const a11y = JSON.parse(localStorage.getItem('a11y-prefs') || '{}');
              if (a11y.highContrast && !${isHighContrast}) document.documentElement.classList.add('theme-high-contrast');
              if (a11y.reduceMotion && !${isReduceMotion}) document.documentElement.classList.add('reduced-motion');
              if (a11y.dyslexiaFont && !${isDyslexia}) document.documentElement.classList.add('dyslexia-font');
              if (a11y.fontSize && !${isSeniorMode}) document.documentElement.style.fontSize = a11y.fontSize + 'px';
              if (localStorage.getItem('senior-mode') === 'true' && !${isSeniorMode}) document.documentElement.classList.add('senior-mode');
            } catch (_) {}
          `,
        }} />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#e7edeb] dark:bg-[#0a0a0a] font-sans selection:bg-[#7c1f31]/20 transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <NavbarContainer />
            <main className="max-w-6xl mx-auto px-6 text-[#1a1a1a] dark:text-white/90">
              {children}
            </main>
            <BadgeUnlockModal />
            <PwaInstallPrompt />
            <Toaster position="bottom-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
