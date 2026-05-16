'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Trophy, BookOpen, Search, Flame, ShieldAlert, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { format, differenceInDays, subDays } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { triggerConfetti } from '@/lib/gamification';
import { LESSONS, TOPICS } from '@/lib/data';

const ICONS: Record<string, any> = {
  Trophy, BookOpen, Search, Flame, ShieldAlert, CheckCircle
};

interface Badge {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  criteria: string;
}

interface UserBadge {
  badge_id: string;
  earned_at: string;
}

interface ScoreData {
  score: number;
  created_at: string;
}

interface TopicData {
  topic_id: string;
  analyzed_at: string;
}

interface LessonProgData {
  lesson_id: number;
  completed_at: string;
}

export default function ProgressPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  const [badges, setBadges] = useState<Badge[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [activities, setActivities] = useState<{ date: string }[]>([]);
  const [stats, setStats] = useState({
    lessonsCount: 0,
    swipesCount: 0,
    topicsCount: 0
  });

  const [lessonProgress, setLessonProgress] = useState<LessonProgData[]>([]);
  const [swipeScores, setSwipeScores] = useState<ScoreData[]>([]);
  const [analyzedTopics, setAnalyzedTopics] = useState<TopicData[]>([]);

  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoadingProgress(true);
      
      const [
        badgesRes, 
        userBadgesRes, 
        activityRes,
        lessonsRes,
        scoresRes,
        topicsRes,
        topicsCountRes
      ] = await Promise.all([
        supabase.from('badges').select('*').order('name'),
        supabase.from('user_badges').select('badge_id, earned_at').eq('user_id', user.id),
        supabase.from('user_activity').select('date').eq('user_id', user.id).order('date', { ascending: false }).limit(60),
        supabase.from('lesson_progress').select('lesson_id, completed_at').eq('user_id', user.id).order('completed_at', { ascending: false }),
        supabase.from('swipe_game_scores').select('score, created_at').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('analyzed_topics').select('topic_id, analyzed_at').eq('user_id', user.id).order('analyzed_at', { ascending: false }).limit(20),
        supabase.from('analyzed_topics').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
      ]);

      if (badgesRes.data) setBadges(badgesRes.data);
      if (userBadgesRes.data) setUserBadges(userBadgesRes.data);
      if (activityRes.data) setActivities(activityRes.data);
      
      setStats({
        lessonsCount: lessonsRes.data?.length || 0,
        swipesCount: scoresRes.data?.length || 0,
        topicsCount: topicsCountRes?.count || topicsRes.data?.length || 0
      });

      if (lessonsRes.data) setLessonProgress(lessonsRes.data);
      if (scoresRes.data) setSwipeScores(scoresRes.data);
      if (topicsRes.data) setAnalyzedTopics(topicsRes.data);

      setLoadingProgress(false);
    }

    if (user) {
      loadData();
    }
  }, [user]);

  if (isLoading || loadingProgress || !user) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/4"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2 space-y-8">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
          </div>
          <div className="space-y-6">
            <div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
            <div className="h-56 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
            <div className="h-56 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Streak
  let streak = 0;
  if (activities.length > 0) {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const yesterdayStr = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    
    // Convert DB activity to set for fast lookup
    const dates = new Set(activities.map(a => a.date));
    
    // Check if they were active today or yesterday (for valid streak continuation)
    if (dates.has(todayStr) || dates.has(yesterdayStr)) {
       let d = dates.has(todayStr) ? new Date() : subDays(new Date(), 1);
       while(dates.has(format(d, 'yyyy-MM-dd'))) {
          streak++;
          d = subDays(d, 1);
       }
    }
  }

  const getLessonTitle = (id: number) => LESSONS.find(l => l.id === id)?.title || `Lecția ${id}`;
  const getTopicTitle = (id: string) => TOPICS.find(t => t.id === id)?.title || id;

  const highestScore = swipeScores.length > 0 ? Math.max(...swipeScores.map(s => s.score)) : 0;
  const averageScore = swipeScores.length > 0 ? Math.round(swipeScores.reduce((acc, curr) => acc + curr.score, 0) / swipeScores.length) : 0;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-[#1a1a1a] dark:text-white flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-[#7c1f31]" />
          Progresul Meu
        </h2>
        <p className="mt-2 text-[#1a1a1a]/60 dark:text-white/60">
          Urmărește realizările tale și istoricul activităților.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col: Badges & Streak */}
        <div className="md:col-span-2 space-y-8">
          {/* Streak Card */}
          <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-[#1a1a1a] dark:text-white">
              <Flame className="w-5 h-5 text-orange-500" /> Activitate
            </h3>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="block text-4xl font-black text-orange-500">{streak}</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Zile la Rând</span>
                <div className="mt-2 text-xs font-bold text-[#1a1a1a]/40 dark:text-white/40">
                  {new Set(activities.map(a => a.date)).size} zile totale
                </div>
              </div>
              <div className="flex-1 flex gap-1 overflow-x-auto pb-2">
                {[...Array(14)].map((_, i) => {
                  const d = subDays(new Date(), 13 - i);
                  const dateStr = format(d, 'yyyy-MM-dd');
                  const isActive = activities.some(a => a.date === dateStr);
                  return (
                    <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 min-w-[28px]">
                      <span className="text-[10px] text-gray-400">{format(d, 'dd')}</span>
                      <div className={`w-6 h-6 rounded-md ${isActive ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800'}`}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-[#1a1a1a] dark:text-white">
              <Trophy className="w-5 h-5 text-yellow-500" /> Insigne
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <TooltipProvider>
                {badges.map(badge => {
                  const isEarned = userBadges.find(ub => ub.badge_id === badge.id);
                  const Icon = ICONS[badge.icon_name] || Trophy;

                  return (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <div className={`flex flex-col items-center gap-2 p-4 text-center rounded-2xl border transition-all ${
                          isEarned 
                          ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/10' 
                          : 'border-gray-100 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-800 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
                        }`}>
                          <div className={`p-3 rounded-full ${isEarned ? 'bg-[#7c1f31] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-xs leading-tight text-[#1a1a1a] dark:text-white">{badge.name}</p>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{badge.description}</p>
                        {isEarned && <p className="text-[10px] text-yellow-600 dark:text-yellow-400 mt-1">Acordat penal: {new Date(isEarned.earned_at).toLocaleDateString('ro-RO')}</p>}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </div>
            {badges.length === 0 && (
              <p className="text-sm text-gray-500 italic text-center py-8">Insignele nu sunt configurate în baza de date.</p>
            )}
          </div>

          {/* Swipe Game Progress */}
          <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
              <h4 className="text-xl font-bold flex items-center gap-2 mb-4 text-[#1a1a1a] dark:text-white">
                <ShieldAlert className="w-5 h-5 text-blue-500" /> Istoric Swipe Game
              </h4>
              {swipeScores.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Nu ai jucat încă Swipe Game.</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-4 mb-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl text-center flex-1">
                      <p className="text-xs uppercase text-blue-600 dark:text-blue-400 font-bold mb-1">Scor Maxim</p>
                      <p className="text-2xl font-black text-blue-700 dark:text-blue-300">{highestScore}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-xl text-center flex-1 border border-gray-100 dark:border-gray-800">
                      <p className="text-xs uppercase text-gray-500 dark:text-gray-400 font-bold mb-1">Medie Ultimele 5</p>
                      <p className="text-2xl font-black text-gray-700 dark:text-gray-300">{averageScore}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-gray-400 mb-2">Ultimele Scoruri</p>
                    {swipeScores.slice(0, 5).map((score, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold">{score.score} puncte</span>
                          </div>
                          <span className="text-gray-500 dark:text-gray-400 text-xs">{new Date(score.created_at).toLocaleDateString('ro-RO')}</span>
                        </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Right Col: Stats */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm space-y-6">
             <h3 className="text-xl font-bold flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
               <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
               </svg>
               Sumar Activitate
             </h3>
             
             <div className="space-y-4">
               <div className="flex justify-between items-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-sm">Lecții Parcurse</span>
                  </div>
                  <span className="font-bold text-lg text-blue-700 dark:text-blue-400">{stats.lessonsCount}</span>
               </div>
               
               <div className="flex justify-between items-center p-3 rounded-xl bg-purple-50 dark:bg-purple-900/10">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-sm">Texte Analizate</span>
                  </div>
                  <span className="font-bold text-lg text-purple-700 dark:text-purple-400">{stats.topicsCount}</span>
               </div>
               
               <div className="flex justify-between items-center p-3 rounded-xl bg-green-50 dark:bg-green-900/10">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-sm">Jocuri Swipe</span>
                  </div>
                  <span className="font-bold text-lg text-green-700 dark:text-green-400">{stats.swipesCount}</span>
               </div>
             </div>
           </div>

           {/* Lessons History */}
           <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
              <h4 className="text-xl font-bold flex items-center gap-2 mb-4 text-[#1a1a1a] dark:text-white">
                <BookOpen className="w-5 h-5 text-green-500" /> Istoric Lecții ({lessonProgress.length}/{LESSONS.length})
              </h4>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 mb-6">
                <div className="bg-green-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${(lessonProgress.length / LESSONS.length) * 100}%` }}></div>
              </div>

              {lessonProgress.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Nu ai terminat nicio lecție încă.</p>
              ) : (
                <div className="space-y-2">
                  {lessonProgress.map((lesson, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm p-3 rounded-lg border border-green-100 dark:border-green-900/30 bg-green-50/50 dark:bg-green-900/10">
                        <span className="font-medium text-green-800 dark:text-green-300">{getLessonTitle(lesson.lesson_id)}</span>
                        <span className="text-green-600/70 dark:text-green-400/70 text-xs whitespace-nowrap">
                          {(new Date(lesson.completed_at)).toLocaleDateString('ro-RO')}
                        </span>
                      </div>
                  ))}
                </div>
              )}
           </div>

           {/* Analyzer History */}
           <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
              <h4 className="text-xl font-bold flex items-center gap-2 mb-4 text-[#1a1a1a] dark:text-white">
                <Search className="w-5 h-5 text-purple-500" /> Istoric Analize
              </h4>
              {analyzedTopics.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Nu ai analizat niciun subiect în Laborator.</p>
              ) : (
                <div className="space-y-2">
                  {analyzedTopics.map((topic, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <span className="font-medium line-clamp-1 pr-4">{getTopicTitle(topic.topic_id)}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">{(new Date(topic.analyzed_at)).toLocaleDateString('ro-RO')}</span>
                      </div>
                  ))}
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}
