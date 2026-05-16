import React from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Trophy } from 'lucide-react';
import { BadgesManager } from './components/BadgesManager';

export default async function AdminBadgesPage() {
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

  const { data: badges } = await supabase.from('badges').select('*').order('name', { ascending: true });

  return (
    <div className="space-y-12 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-[#1a1a1a] p-8 md:p-10 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Trophy className="w-48 h-48 text-[#7c1f31] transform rotate-12" />
        </div>
        <div className="relative z-10 w-full max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] dark:text-white mb-3">Insigne de Gamificare</h1>
          <p className="text-[#1a1a1a]/60 dark:text-white/60 text-lg">
            Gestionează insignele pe care utilizatorii le pot câștiga pe platformă.
          </p>
        </div>
      </div>

      <BadgesManager badges={badges || []} />
    </div>
  );
}
