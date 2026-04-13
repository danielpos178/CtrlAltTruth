
// Licensed under the GNU AGPL-3.0-only.

'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, BookOpen, Gamepad2, Home, FileText, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: any) => void;
}

export default function Navbar({ currentView, setCurrentView }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  const navItems = [
    { id: 'landing', label: 'Acasă', icon: Home },
    { id: 'analyzer', label: 'Laboratorul de Adevăr', icon: ShieldAlert },
    { id: 'swipegame', label: 'Swipe Game', icon: Gamepad2 },
    { id: 'lessons', label: 'Lecții', icon: BookOpen },
    { id: 'documentation', label: 'Documentație', icon: FileText },
  ] as const;

  const handleNav = (id: string) => {
    setCurrentView(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#e7edeb]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNav('landing')}
        >
          <div className="bg-[#7c1f31] p-2.5 rounded-xl group-hover:scale-105 transition-transform shadow-md">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#1a1a1a] dark:text-white">
            Ctrl+Alt+Truth
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-1 xl:gap-2 bg-white dark:bg-[#1a1a1a] p-1.5 rounded-2xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button 
                key={id}
                onClick={() => handleNav(id)}
                className={`px-3 xl:px-4 py-2 min-h-[44px] rounded-xl text-sm xl:text-base font-bold transition-all flex items-center gap-2 ${currentView === id ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 dark:text-white/70 hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 hover:text-[#1a1a1a] dark:hover:text-white'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-[#1a1a1a]/10 dark:border-white/10 text-[#1a1a1a] dark:text-white hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 transition-all shadow-sm"
            aria-label={theme === 'light' ? 'Activează modul întunecat' : 'Activează modul luminos'}
          >
            {!mounted ? (
              <div className="w-5 h-5" />
            ) : theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-[#1a1a1a] dark:text-white hover:bg-[#1a1a1a]/10 dark:hover:bg-white/10 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={theme === 'light' ? 'Activează modul întunecat' : 'Activează modul luminos'}
          >
            {!mounted ? (
              <div className="w-5 h-5" />
            ) : theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          <button 
            className="p-2 text-[#1a1a1a] dark:text-white hover:bg-[#1a1a1a]/10 dark:hover:bg-white/10 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#1a1a1a] border-b border-[#1a1a1a]/10 dark:border-white/10 shadow-lg py-4 px-4 flex flex-col gap-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button 
              key={id}
              onClick={() => handleNav(id)}
              className={`px-4 py-3 min-h-[44px] rounded-xl text-base font-bold transition-all flex items-center gap-3 ${currentView === id ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 dark:text-white/70 hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 hover:text-[#1a1a1a] dark:hover:text-white'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
