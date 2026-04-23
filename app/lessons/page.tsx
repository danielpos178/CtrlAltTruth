import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, HelpCircle, AlertTriangle, Fingerprint, MessageSquareWarning, Video, Filter, Search, ShieldAlert } from 'lucide-react';
import { getLessons } from '@/lib/fetchData';

export const revalidate = 60; // Revalidate every 60 seconds if it's static

const iconMap: Record<string, any> = {
  AlertTriangle,
  MessageSquareWarning,
  Fingerprint,
  Video,
  Filter,
  Search,
  ShieldAlert
};

export default async function LessonsPage() {
  const lessons = await getLessons();


  return (
    <div className="py-12 md:py-20 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1a1a] dark:text-white">Academia Ctrl+Alt+Truth</h2>
        <p className="text-xl text-[#7c1f31] dark:text-[#ff4d6d] font-medium">Educație digitală pentru o lume a dezinformării</p>
        <div className="flex justify-center gap-4 mt-6">
          <div className="bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-[#1a1a1a]/10 dark:border-white/10 text-sm font-bold text-[#1a1a1a]/60 dark:text-white/60 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> {lessons.length} Lecții
          </div>
          <div className="bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-[#1a1a1a]/10 dark:border-white/10 text-sm font-bold text-[#1a1a1a]/60 dark:text-white/60 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" /> Quiz-uri incluse
          </div>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {lessons.map((lesson: any) => {
          const Icon = iconMap[lesson.icon_name] || BookOpen;
          return (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.slug}`}
              className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left flex flex-col items-start group"
            >
              <div className="bg-[#7c1f31]/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-[#7c1f31]/20 transition-colors">
                <Icon className="w-8 h-8 text-[#7c1f31] dark:text-[#ff4d6d]" />
              </div>
              <span className="text-sm font-bold text-[#7c1f31] dark:text-[#ff4d6d] mb-2 uppercase tracking-wider">{lesson.level}</span>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-4">{lesson.title}</h3>
              <div className="text-[#1a1a1a]/80 dark:text-white/80 text-lg line-clamp-3 mb-6">
                 {/* As the content might be JSX from local or HTML from DB, we shouldn't render the whole JSX inside a link tag block or it could be invalid HTML. Best to show an excerpt or no description.
                     Since local data content is a React Node, line-clamp might break it. 
                     We can just remove the excerpt, or conditionally render. Let's just remove the excerpt for simplicity, or keep a short description if we had one.
                 */}
                 Învață cum să te protejezi de manipulare online și cum să recunoști tehnicile toxice.
              </div>
              <div className="mt-auto pt-4 text-[#7c1f31] dark:text-[#ff4d6d] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Începe Lecția <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
