import React from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ReflexSimulatorView } from '@/components/views/ReflexSimulatorView';
import { AlertCircle } from 'lucide-react';

export default async function ReflexPage() {
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

  const { data: scenarios } = await supabase.from('verification_scenarios').select('*').eq('is_published', true);

  if (!scenarios || scenarios.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full mb-6">
          <AlertCircle className="w-12 h-12 text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-[#1a1a1a] dark:text-white">Conținut Indisponibil</h1>
        <p className="text-[#1a1a1a]/70 dark:text-white/70 text-lg max-w-lg">
          Administratorul nu a adăugat încă scenarii pentru acest simulator. Revino mai târziu.
        </p>
      </div>
    );
  }

  return <ReflexSimulatorView scenarios={scenarios} />;
}
