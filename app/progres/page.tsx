import React from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ScutulDigitalView } from '@/components/views/ScutulDigitalView';

export default async function ProgresPage() {
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

  if (!user) {
    redirect('/login');
  }

  // Fetch real data from available tables
  const [
    userRolesRes,
    allSwipeScoresRes,
    lessonsRes,
    activityRes,
    badgesRes,
    userBadgesRes,
    globalLessonsRes,
    latestActivityRes,
    latestLessonRes,
    topEnemyRes,
    streakRes,
  ] = await Promise.all([
    supabase.from('user_roles').select('role, class_id, is_senior_mode, initial_score, classes(name)').eq('user_id', user.id).maybeSingle(),
    supabase.from('swipe_game_scores').select('score, created_at').eq('user_id', user.id).order('created_at', { ascending: true }),
    supabase.from('lesson_progress').select('lesson_id').eq('user_id', user.id),
    supabase.from('user_activity').select('id').eq('user_id', user.id).limit(1),
    supabase.from('badges').select('*').order('name'),
    supabase.from('user_badges').select('badge_id, earned_at').eq('user_id', user.id),
    supabase.from('lessons').select('*', { count: 'exact', head: true }),
    supabase.from('user_activity').select('date').eq('user_id', user.id).order('date', { ascending: false }).limit(1),
    supabase.from('lesson_progress').select('completed_at').eq('user_id', user.id).order('completed_at', { ascending: false }).limit(1),
    supabase.rpc('get_top_defeated_enemy', { target_user_id: user.id }),
    supabase.from('user_streaks').select('*').eq('user_id', user.id).maybeSingle(),
  ]);

  const swipeScores = allSwipeScoresRes.data || [];
  const lessons = lessonsRes.data || [];
  const activity = activityRes.data || [];
  const badges = badgesRes.data || [];
  const userBadges = userBadgesRes.data || [];
  const roleData = userRolesRes.data;

  const totalPlatformLessons = globalLessonsRes.count || 0;
  
  const totalSwipes = swipeScores.length;
  const totalLessons = lessons.length;
  const totalActivity = totalSwipes + totalLessons + activity.length;
  
  const lastActivityDate = latestActivityRes.data?.[0]?.date || null;
  const lastLessonDate = latestLessonRes.data?.[0]?.completed_at || null;

  const topEnemy = topEnemyRes.data && topEnemyRes.data.length > 0 
    ? {
        name: topEnemyRes.data[0].fallacy_name,
        count: Number(topEnemyRes.data[0].correct_count),
      }
    : null;

  // Calculate Immunity Score
  const avgSwipeScore = totalSwipes > 0 
    ? swipeScores.reduce((acc, curr) => acc + curr.score, 0) / totalSwipes 
    : 0;

  const baseImmunity = Math.min(Math.round((avgSwipeScore / 10) * 100), 100);
  const immunityScore = Math.min(baseImmunity + totalLessons * 2, 100);

  // Estimate minutes saved
  const minutesSaved = (totalSwipes * 2) + (totalLessons * 5);

  let currentStreak = streakRes.data?.current_streak || 0;
  
  if (streakRes.data?.last_activity_date) {
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
    const lastDate = streakRes.data.last_activity_date;
    if (lastDate !== todayStr && lastDate !== yesterdayStr) {
      currentStreak = 0;
    }
  }

  const streakData = {
    current_streak: currentStreak,
    longest_streak: streakRes.data?.longest_streak || 0,
    last_activity_date: streakRes.data?.last_activity_date || null
  };

  const historicalData = swipeScores.map(score => ({
    date: new Date(score.created_at).toLocaleDateString('ro-RO', { month: 'short', day: 'numeric' }),
    score: score.score
  }));

  const initialScore = roleData?.initial_score || 0;

  return (
    <ScutulDigitalView 
      data={{
        immunityScore,
        minutesSaved,
        topEnemy,
        streak: streakData,
        totalAttempts: totalActivity,
        totalLessons,
        totalPlatformLessons,
        lastActivityDate,
        lastLessonDate,
        badges,
        userBadges,
        userName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Vânător',
        avatarUrl: user.user_metadata?.avatar_url || '',
        role: roleData?.role || 'user',
        classId: roleData?.class_id || null,
        className: (Array.isArray(roleData?.classes) ? roleData?.classes[0]?.name : (roleData?.classes as any)?.name) || null,
        initialScore: initialScore,
        historicalData: historicalData,
      }} 
    />
  );
}
