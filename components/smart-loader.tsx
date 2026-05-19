'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Lightbulb } from 'lucide-react';

const TRIVIA_FACTS = [
  "Știai că 62% dintre oameni dau share la un articol pe rețelele sociale fără să-l citească mai departe de titlu?",
  "O știre falsă se răspândește de 6 ori mai repede pe Twitter (X) decât una adevărată, datorită emoției puternice pe care o generează.",
  "Deepfake-urile audio devin o problemă majoră. Hackerii pot clona vocea unei persoane având doar 3 secunde de înregistrare.",
  "Efectul de adevăr iluzoriu (Illusory Truth Effect) înseamnă că dacă auzim o minciună de destul de multe ori, creierul nostru începe să creadă că e adevărată."
];

export function SmartLoader() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % TRIVIA_FACTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-[#7c1f31] blur-2xl opacity-20 rounded-full animate-pulse"></div>
        <Loader2 className="w-12 h-12 text-[#7c1f31] dark:text-[#ff4d6d] animate-spin relative z-10" />
      </div>
      
      <div className="max-w-md w-full bg-white dark:bg-[#1a1a1a] border border-[#1a1a1a]/10 dark:border-white/10 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 text-[#7c1f31] dark:text-[#ff4d6d] font-bold mb-3 justify-center">
          <Lightbulb className="w-5 h-5" />
          <span>Pastila de Adevăr</span>
        </div>
        
        <div className="h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentFactIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-[#1a1a1a]/80 dark:text-white/80 text-sm leading-relaxed"
            >
              {TRIVIA_FACTS[currentFactIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
