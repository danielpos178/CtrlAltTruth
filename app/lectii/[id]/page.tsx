import React from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default async function LessonReadPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const lessonIdOrSlug = resolvedParams.id;
  
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  // Try to find by slug first, fallback to id if it's numeric
  let query = supabase.from('lessons').select('*');
  
  if (!isNaN(Number(lessonIdOrSlug))) {
    query = query.or(`slug.eq.${lessonIdOrSlug},id.eq.${lessonIdOrSlug}`);
  } else {
    query = query.eq('slug', lessonIdOrSlug);
  }

  const { data: lesson, error } = await query.maybeSingle();

  if (!lesson || error) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Lecția nu a fost găsită</h1>
        <Link href="/lessons" className="text-blue-600 hover:underline">Înapoi la lecții</Link>
      </div>
    );
  }

  return (
    <article className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="space-y-6">
        <Link href="/lessons" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Înapoi la Listă
        </Link>
        <div className="flex items-center gap-3">
           <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-lg text-sm font-bold w-fit">
              {lesson.level}
           </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] dark:text-white tracking-tight">
          {lesson.title}
        </h1>
        <div className="h-1 w-20 bg-[#7c1f31] rounded-full"></div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] border border-[#1a1a1a]/10 dark:border-white/10 rounded-3xl p-6 md:p-12 shadow-sm">
        {/* We use @tailwindcss/typography via the 'prose' class */}
        <div className="prose prose-lg dark:prose-invert prose-blue max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>
            {lesson.content}
          </Markdown>
        </div>
      </div>
      
      {/* Action to Mark as Completed can be added here using a Client Component */}
    </article>
  );
}
