'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';

export function useProgress() {
  const { user, isLoading } = useAuth();
  const hasNotifiedRef = useRef(false);

  const notifyUnauthenticated = () => {
    if (!isLoading && !user && !hasNotifiedRef.current) {
      toast('Atenție: Nu ești autentificat. Progresul tău nu va fi salvat!', {
        icon: '⚠️',
        duration: 4000,
        id: 'unauth-warning', // Prevent duplicate toasts
      });
      hasNotifiedRef.current = true;
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
      
      if (error) console.error('Error saving score:', error);
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
        .upsert([{ user_id: user.id, topic_id: topicId, analyzed_at: new Date().toISOString() }]);
      
      if (error) console.error('Error saving topic:', error);
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
        .upsert([{ user_id: user.id, lesson_id: lessonId, completed_at: new Date().toISOString() }]);
      
      if (error) console.error('Error saving lesson progress:', error);
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
