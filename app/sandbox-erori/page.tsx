import React from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SandboxGameView } from '@/components/views/SandboxGameView';
import { AlertCircle } from 'lucide-react';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function SandboxPage() {
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

  const { data: fallacies } = await supabase.from('fallacies_registry').select('*');
  const { data: rawChallenges } = await supabase.from('fallacy_challenges').select('*, fallacies_registry(*)');

  if (!rawChallenges || rawChallenges.length === 0 || !fallacies || fallacies.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full mb-6">
          <AlertCircle className="w-12 h-12 text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-[#1a1a1a] dark:text-white">Conținut Indisponibil</h1>
        <p className="text-[#1a1a1a]/70 dark:text-white/70 text-lg max-w-lg">
          Administratorul nu a adăugat încă scenarii sau categorii pentru acest nivel. Revino mai târziu.
        </p>
      </div>
    );
  }

  // Shuffle and pick 5 random challenges
  const shuffled = shuffleArray(rawChallenges);
  const challenges = shuffled.slice(0, 5);

  return <SandboxGameView initialChallenges={challenges} fallacies={fallacies} />;
}
