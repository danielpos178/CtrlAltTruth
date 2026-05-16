import { supabase } from '@/lib/supabase';
import confetti from 'canvas-confetti';

export type ActivityAction = 'first_lesson' | 'first_analysis' | 'perfect_swipe' | 'daily_activity' | 'all_lessons';

export async function logDailyActivity(userId: string) {
  const date = new Date().toISOString().split('T')[0];
  
  const { error } = await supabase
    .from('user_activity')
    .insert([{ user_id: userId, date }])
    .select()
    .single();

  // If error is duplicate key, it means already logged today, which is fine
  if (!error) {
    // Check if we should award the 'daily_activity' badge
    await checkAndAwardBadge(userId, 'daily_activity');
  }
}

export async function checkAndAwardBadge(userId: string, action: ActivityAction) {
  try {
    // 1. Get the badge id for this action
    const { data: badge } = await supabase
      .from('badges')
      .select('id, name, icon_name, description')
      .eq('criteria', action)
      .single();

    if (!badge) return null;

    // 2. Check if user already has it
    const { data: existingUserBadge } = await supabase
      .from('user_badges')
      .select('earned_at')
      .eq('user_id', userId)
      .eq('badge_id', badge.id)
      .maybeSingle();

    if (existingUserBadge) return null; // Already earned

    // 3. Insert new badge
    const { error: insertError } = await supabase
      .from('user_badges')
      .insert([{ user_id: userId, badge_id: badge.id }]);

    if (insertError) throw new Error(insertError.message || JSON.stringify(insertError));

    // Return badge info to show notification
    return badge;
  } catch (error) {
    console.error('Error awarding badge:', error);
    return null;
  }
}

export function triggerConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults, particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    confetti({
      ...defaults, particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
}
