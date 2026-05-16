'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { checkAndAwardBadge, triggerConfetti } from '@/lib/gamification';

import { badgeEventTarget } from '@/components/ui/BadgeUnlockModal';

export function useProgress() {
  const { user, isLoading } = useAuth();
  const hasNotifiedRef = useRef(false);

  const notifyUnauthenticated = () => {
    if (!isLoading && !user && !hasNotifiedRef.current) {
      toast('Atenție: Nu ești autentificat. Progresul tău nu va fi salvat!', {
        icon: '⚠️',
        duration: 4000,
        id: 'unauth-warning',
      });
      hasNotifiedRef.current = true;
    }
  };

  const handleBadgeCheck = async (action: any) => {
    if (!user) return;
    const newBadge = await checkAndAwardBadge(user.id, action);
    if (newBadge) {
      triggerConfetti();
      badgeEventTarget.dispatchEvent(new CustomEvent('badge-unlocked', { 
        detail: { name: newBadge.name, description: newBadge.description }
      }));
    }
  };

  /** Save Swipe Game Score */
  const saveSwipeGameScore = async (score: number) => {
    notifyUnauthenticated();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('swipe_game_scores')
        .insert([{ user_id: user.id, score, created_at: new Date().toISOString() }]);
      
      if (error) console.error('Error saving score:', error.message || error);

      if (score === 100) { // Or whatever the max score is
        await handleBadgeCheck('perfect_swipe');
      }
    } catch (err) {
      console.error(err);
    }
  };

  /** Save Analyzed Topic */
  const saveAnalyzedTopic = async (topicId: string) => {
    notifyUnauthenticated();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('analyzed_topics')
        .upsert([{ user_id: user.id, topic_id: topicId, analyzed_at: new Date().toISOString() }], { onConflict: 'user_id, topic_id' });
      
      if (error) console.error('Error saving topic:', error.message || error);
      
      await handleBadgeCheck('first_analysis');
    } catch (err) {
      console.error(err);
    }
  };

  /** Mark Lesson as Completed or Save Progress */
  const markLessonCompleted = async (lessonId: number) => {
    notifyUnauthenticated();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert([{ user_id: user.id, lesson_id: lessonId, completed_at: new Date().toISOString() }], { onConflict: 'user_id, lesson_id' });
      
      if (error) console.error('Error saving lesson progress:', error.message || error);
      
      await handleBadgeCheck('first_lesson');
      
      // We could also query to check if all lessons are done
      const { count } = await supabase.from('lesson_progress').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
      if (count && count >= 6) { // Currently 6 lessons
         await handleBadgeCheck('all_lessons');
      }

    } catch (err) {
      console.error(err);
    }
  };

  return {
    saveSwipeGameScore,
    saveAnalyzedTopic,
    markLessonCompleted,
    notifyUnauthenticated
  };
}
