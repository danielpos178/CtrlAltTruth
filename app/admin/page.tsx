import React from 'react';
import Link from 'next/link';
import { BookOpen, Gamepad2, Trophy, ArrowRight, ShieldAlert } from 'lucide-react';

export default function AdminDashboardPage() {
  const adminModules = [
    {
      title: 'Gestionare Lecții',
      description: 'Adaugă și modifică lecțiile platformei. Utilizează editorul Markdown încorporat.',
      href: '/admin/lessons',
      icon: BookOpen,
      iconColor: 'text-[#7c1f31] dark:text-[#f8b4c1]',
      bgColor: 'bg-[#7c1f31]/10 dark:bg-[#7c1f31]/20'
    },
    {
      title: 'Swipe Game Content',
      description: 'Gestionează enunțurile pentru Swipe Game (Adevărat / Fals).',
      href: '/admin/swipe',
      icon: Gamepad2,
      iconColor: 'text-[#7c1f31] dark:text-[#f8b4c1]',
      bgColor: 'bg-[#7c1f31]/10 dark:bg-[#7c1f31]/20'
    },
    {
      title: 'Insigne de Gamificare',
      description: 'Creează insigne (badges) noi pentru premierea utilizatorilor.',
      href: '/admin/badges',
      icon: Trophy,
      iconColor: 'text-[#7c1f31] dark:text-[#f8b4c1]',
      bgColor: 'bg-[#7c1f31]/10 dark:bg-[#7c1f31]/20'
    }
  ];

  return (
    <div className="space-y-12 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-[#1a1a1a] p-8 md:p-10 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <ShieldAlert className="w-64 h-64 text-[#7c1f31] transform rotate-12" />
        </div>
        <div className="relative z-10 w-full max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#7c1f31]/10 text-[#7c1f31] dark:bg-[#7c1f31]/20 dark:text-[#f8b4c1] rounded-full text-xs font-bold uppercase tracking-wider">Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] dark:text-white mb-4 leading-tight">
            Panou Administrator
          </h1>
          <p className="text-[#1a1a1a]/60 dark:text-white/60 text-lg">
            Bine ai venit în sistemul de management al conținutului (CMS). Modificările pe care le faci aici sunt aplicate în timp real în întreaga platformă Ctrl+Alt+Truth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map((module, idx) => (
          <Link
            key={idx}
            href={module.href}
            className="group flex flex-col justify-between bg-white dark:bg-[#1a1a1a] border border-[#1a1a1a]/10 dark:border-white/10 rounded-3xl p-6 md:p-8 transition-all hover:shadow-xl hover:shadow-[#7c1f31]/5 hover:border-[#7c1f31]/30 dark:hover:border-[#7c1f31]/50 h-full"
          >
            <div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 ${module.bgColor}`}>
                <module.icon className={`w-7 h-7 ${module.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-3 group-hover:text-[#7c1f31] dark:group-hover:text-[#f8b4c1] transition-colors">{module.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{module.description}</p>
            </div>
            
            <div className="mt-auto flex items-center justify-between text-sm font-bold text-[#1a1a1a] dark:text-white group-hover:text-[#7c1f31] dark:group-hover:text-[#f8b4c1] transition-colors pt-4 border-t border-gray-100 dark:border-gray-800">
              <span>Accesează Modulul</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
