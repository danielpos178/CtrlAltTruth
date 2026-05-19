'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

/**
 * Updates the user's daily streak.
 * Called whenever a user successfully completes a learning module.
 */
export async function updateProgressAction() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
          },
        },
      }
    );
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.warn('Attempted to update streak without an active session.');
      return { success: false, error: 'Unauthorized' };
    }

    const { error } = await supabase.rpc('update_user_streak', { target_user_id: user.id });

    if (error) {
      console.warn('RPC update_user_streak failed, falling back to manual update:', error);
      
      const today = new Date();
      const todayStr = [
        today.getUTCFullYear(),
        String(today.getUTCMonth() + 1).padStart(2, '0'),
        String(today.getUTCDate()).padStart(2, '0')
      ].join('-');

      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const yesterdayStr = [
        yesterday.getUTCFullYear(),
        String(yesterday.getUTCMonth() + 1).padStart(2, '0'),
        String(yesterday.getUTCDate()).padStart(2, '0')
      ].join('-');

      // Manual check
      const { data: streakData } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!streakData) {
        await supabase.from('user_streaks').insert({
          user_id: user.id,
          current_streak: 1,
          longest_streak: 1,
          last_activity_date: todayStr
        });
      } else {
        if (streakData.last_activity_date !== todayStr) {
          if (streakData.last_activity_date === yesterdayStr) {
            const newStreak = streakData.current_streak + 1;
            await supabase.from('user_streaks').update({
              current_streak: newStreak,
              longest_streak: Math.max(streakData.longest_streak, newStreak),
              last_activity_date: todayStr
            }).eq('user_id', user.id);
          } else {
            await supabase.from('user_streaks').update({
              current_streak: 1,
              last_activity_date: todayStr
            }).eq('user_id', user.id);
          }
        }
      }
    }

    revalidatePath('/');
    revalidatePath('/progres');

    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error in updateProgressAction:', err);
    return { success: false, error: err.message };
  }
}
