'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, BookOpen, Gamepad2, Trophy, LayoutDashboard, Home } from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();

  if (pathname === '/admin') {
    return null;
  }

  const navItems = [
    { href: '/admin', label: 'Panou Administrator', icon: LayoutDashboard, exact: true },
    { href: '/admin/lessons', label: 'Lecții (Markdown)', icon: BookOpen },
    { href: '/admin/swipe', label: 'Swipe Game', icon: Gamepad2 },
    { href: '/admin/sandbox', label: 'Erori Logice', icon: Trophy },
    { href: '/admin/reflex', label: 'Simulator Reflex', icon: ShieldAlert },
    { href: '/admin/badges', label: 'Insigne (Gamificare)', icon: Trophy },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 flex-shrink-0 hidden md:block">
        <div className="sticky top-24 space-y-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#7c1f31] p-2.5 rounded-2xl shadow-sm shadow-[#7c1f31]/20">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#1a1a1a] dark:text-white text-lg leading-tight">Admin CMS</h2>
              <p className="text-xs text-[#1a1a1a]/50 dark:text-white/50 font-medium tracking-wide">Ctrl+Alt+Truth</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#7c1f31]/10 text-[#7c1f31] dark:bg-[#7c1f31]/20 dark:text-[#f8b4c1] shadow-sm' 
                      : 'text-[#1a1a1a]/60 dark:text-white/60 hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 hover:text-[#1a1a1a] dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#7c1f31] dark:text-[#f8b4c1]' : 'text-current opacity-60'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div>
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-transparent hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 text-[#1a1a1a] dark:text-white rounded-2xl text-sm font-bold transition-colors border border-[#1a1a1a]/10 dark:border-white/10"
            >
              <Home className="w-4 h-4" />
              Înapoi pe site
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 border-b border-[#1a1a1a]/10 dark:border-white/10 hide-scrollbar pt-2">
        {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`px-4 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  isActive 
                    ? 'bg-[#7c1f31]/10 text-[#7c1f31] dark:bg-[#7c1f31]/20 dark:text-[#f8b4c1]' 
                    : 'bg-[#1a1a1a]/5 dark:bg-white/5 text-[#1a1a1a]/60 dark:text-white/60'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
        })}
      </div>
    </>
  );
}
