import React from 'react';
import SwipeGameView from '@/components/views/SwipeGameView';
import { getSwipeCards } from '@/lib/fetchData';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const revalidate = 0; // Dynamic because it depends on user state

export default async function SwipeGamePage() {
  let isSeniorMode = false;
  try {
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
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: roleRow } = await supabase.from('user_roles').select('is_senior_mode').eq('user_id', user.id).maybeSingle();
      if (roleRow) {
        isSeniorMode = roleRow.is_senior_mode;
      }
    }
  } catch (error) {
    // Ignore error and default to false
  }

  const initialCards = await getSwipeCards(isSeniorMode);

  return (
    <div className="py-12 md:py-20">
      <SwipeGameView initialCards={initialCards} />
    </div>
  );
}
