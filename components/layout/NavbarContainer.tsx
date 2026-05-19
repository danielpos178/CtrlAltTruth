import React from 'react';
import Navbar from './Navbar';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function NavbarContainer() {
  let userStreak = null;

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data } = await supabase
        .from('user_streaks')
        .select('current_streak, last_activity_date')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (data) {
        userStreak = data;
      }
    }
  } catch (error) {
    console.error('Error in NavbarContainer:', error);
  }

  return <Navbar userStreak={userStreak} />;
}
