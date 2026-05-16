'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldAlert, BookOpen, Gamepad2, Home, FileText, Menu, X, Sun, Moon, User, LogIn, Lock } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { AccessibilityMenu } from '@/components/AccessibilityMenu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const { user, role, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: '/', label: 'Acasă', icon: Home },
    { href: '/analyzer', label: 'Laboratorul de Adevăr', icon: ShieldAlert },
    { href: '/swipegame', label: 'Swipe Game', icon: Gamepad2 },
    { href: '/lessons', label: 'Lecții', icon: BookOpen },
    { href: '/documentation', label: 'Documentație', icon: FileText },
  ] as const;

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#e7edeb]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link 
          href="/"
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="bg-[#7c1f31] p-1.5 rounded-lg group-hover:scale-105 transition-transform shadow-md">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg md:text-xl font-black tracking-tight text-[#1a1a1a] dark:text-white hidden sm:block">
            Ctrl+Alt+Truth
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex gap-1 bg-white dark:bg-[#1a1a1a] p-1 rounded-xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm overflow-x-auto">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link 
                key={href}
                href={href}
                className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${isActive(href) ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 dark:text-white/70 hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 hover:text-[#1a1a1a] dark:hover:text-white'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <AccessibilityMenu />
            
            {!isLoading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full outline-none focus:ring-2 focus:ring-[#7c1f31] border border-transparent hover:border-[#1a1a1a]/10 dark:hover:border-white/10 transition-all ml-1">
                      <Avatar className="w-9 h-9 border border-[#1a1a1a]/10 dark:border-white/10">
                        <AvatarFallback className="bg-[#7c1f31] text-white text-xs font-bold">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-[#1a1a1a] dark:text-white">Contul Meu</p>
                        <p className="text-xs leading-none text-muted-foreground line-clamp-1">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {role === 'admin' && (
                      <>
                        <DropdownMenuItem onClick={() => router.push('/admin')} className="cursor-pointer text-[#7c1f31] dark:text-[#ff4d6d] focus:bg-[#7c1f31]/10 dark:focus:bg-[#ff4d6d]/10 focus:text-[#7c1f31] dark:focus:text-[#ff4d6d] font-bold">
                          Panou Administrator
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={() => router.push('/progress')} className="cursor-pointer">
                      Progresul meu
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                      Setări cont
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                        import('@/lib/supabase').then(({ supabase }) => {
                          supabase.auth.signOut().then(() => router.push('/'));
                        });
                      }} className="cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/10 focus:text-red-600 dark:focus:text-red-400">
                      Deconectare
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className={`p-2 rounded-lg border transition-all shadow-sm flex items-center gap-2 ${isActive('/login') ? 'bg-[#7c1f31] text-white border-[#7c1f31]' : 'bg-white dark:bg-[#1a1a1a] border-[#1a1a1a]/10 dark:border-white/10 text-[#1a1a1a] dark:text-white hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5'}`}
                  aria-label="Login"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-xs font-bold md:hidden lg:inline">Login</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <AccessibilityMenu />
          {!isLoading && user && (
            <button
               onClick={() => router.push('/progress')}
               className="p-2 text-[#1a1a1a] dark:text-white hover:bg-[#1a1a1a]/10 dark:hover:bg-white/10 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
               aria-label="Progres"
             >
               <User className="w-5 h-5" />
             </button>
          )}
          {!isLoading && !user && (
            <button
               onClick={() => router.push('/login')}
               className="p-2 text-[#1a1a1a] dark:text-white hover:bg-[#1a1a1a]/10 dark:hover:bg-white/10 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
               aria-label="Login"
             >
               <LogIn className="w-5 h-5" />
             </button>
          )}
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
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-[#1a1a1a] border-b border-[#1a1a1a]/10 dark:border-white/10 shadow-lg py-4 px-4 flex flex-col gap-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link 
              key={href}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 min-h-[44px] rounded-xl text-base font-bold transition-all flex items-center gap-3 ${isActive(href) ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 dark:text-white/70 hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 hover:text-[#1a1a1a] dark:hover:text-white'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
