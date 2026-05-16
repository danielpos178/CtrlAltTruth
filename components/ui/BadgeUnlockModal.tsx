'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Global event target for badge unlocks
export const badgeEventTarget = new EventTarget();

export function BadgeUnlockModal() {
  const [badge, setBadge] = useState<{ name: string; description?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleBadgeUnlock = (e: Event) => {
      const customEvent = e as CustomEvent;
      setBadge({
        name: customEvent.detail.name,
        description: customEvent.detail.description
      });
    };

    badgeEventTarget.addEventListener('badge-unlocked', handleBadgeUnlock);
    return () => {
      badgeEventTarget.removeEventListener('badge-unlocked', handleBadgeUnlock);
    };
  }, []);

  if (!badge) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 max-w-sm w-full shadow-2xl relative border border-[#1a1a1a]/10 dark:border-white/10 text-center"
        >
          <button 
            onClick={() => setBadge(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="bg-yellow-100 dark:bg-yellow-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Trophy className="w-12 h-12 text-yellow-500" />
          </div>
          
          <h2 className="text-2xl font-black text-[#1a1a1a] dark:text-white mb-2">Insignă Deblocată!</h2>
          <p className="text-xl font-bold text-[#7c1f31] dark:text-[#f8b4c1] mb-2">{badge.name}</p>
          {badge.description && (
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">{badge.description}</p>
          )}
          
          <button
            onClick={() => {
              setBadge(null);
              router.push('/progress');
            }}
            className="w-full bg-[#7c1f31] hover:bg-[#8e2539] text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-95 shadow-md shadow-[#7c1f31]/20"
          >
            Vezi Progresul Meu
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
