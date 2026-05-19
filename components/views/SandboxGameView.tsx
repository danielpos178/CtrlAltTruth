'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, ArrowRight, Lightbulb, Trophy } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import confetti from 'canvas-confetti';

interface Fallacy {
  id: number;
  name: string;
  definition: string;
  example: string;
}

interface Challenge {
  id: number;
  text_content: string;
  correct_fallacy_id: number;
  explanation: string;
  hint: string;
  fallacies_registry: Fallacy;
}

import { useProgress } from '@/hooks/useProgress';

export function SandboxGameView({ initialChallenges, fallacies }: { initialChallenges: Challenge[], fallacies: Fallacy[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFallacy, setSelectedFallacy] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const { saveSandboxAnswer } = useProgress();

  const currentChallenge = initialChallenges[currentIndex];

  const handleSelect = (fallacyId: number) => {
    setSelectedFallacy(fallacyId);

    const isCorrect = fallacyId === currentChallenge.correct_fallacy_id;
    saveSandboxAnswer(currentChallenge.id, fallacyId, isCorrect);

    if (isCorrect) {
      setFeedback('success');
      setShowHint(false);
    } else {
      setFeedback('error');
      setShake(true);
      setShowHint(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const triggerConfetti = useCallback(() => {
    const duration = 2000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#7c1f31', '#10b981', '#f59e0b']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#7c1f31', '#10b981', '#f59e0b']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleNext = () => {
    if (currentIndex < initialChallenges.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedFallacy(null);
      setFeedback(null);
      setShowHint(false);
    } else {
      setFinished(true);
      triggerConfetti();
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedFallacy(null);
    setFeedback(null);
    setShowHint(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 min-h-[70vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#1a1a1a] p-10 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 text-center shadow-lg w-full"
        >
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#1a1a1a] dark:text-white mb-4">Misiune Îndeplinită!</h2>
          <p className="text-lg text-[#1a1a1a]/70 dark:text-white/70 mb-8 max-w-lg mx-auto">
            Ai completat cu succes antrenamentul din Groapa cu Nisip. Creierul tău a dezvoltat
            reflexe mai bune pentru detectarea discursurilor toxice.
          </p>
          <button
            onClick={handleRetry}
            className="px-8 py-4 bg-[#7c1f31] text-white rounded-2xl font-bold text-lg hover:bg-[#5a1623] transition-all shadow-md active:scale-95"
          >
            Reia Antrenamentul
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] dark:text-white mb-4 tracking-tight">Groapa cu Nisip</h1>
        <p className="text-xl text-[#7c1f31] dark:text-[#ff4d6d] font-medium max-w-2xl mx-auto">
          Analizează afirmația de mai jos și descoperă logica defectuoasă intenționată.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8 px-2">
        <span className="text-sm font-bold text-[#1a1a1a]/50 dark:text-white/50 uppercase tracking-widest">
          Provocarea {currentIndex + 1} din {initialChallenges.length}
        </span>
        <div className="flex gap-2">
          {initialChallenges.map((_, idx) => (
            <div key={idx} className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-[#7c1f31] dark:bg-[#ff4d6d]' : idx < currentIndex ? 'bg-[#7c1f31]/50 dark:bg-[#ff4d6d]/50' : 'bg-gray-200 dark:bg-gray-800'}`} />
          ))}
        </div>
      </div>

      <motion.div
        animate={{ x: shake ? [-10, 10, -10, 10, 0] : 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-[#1a1a1a] p-8 md:p-12 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-lg text-center mb-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7c1f31]/20 to-transparent" />
        <h2 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] dark:text-white leading-relaxed italic font-serif">
          „{currentChallenge.text_content}”
        </h2>
      </motion.div>

      {/* Fallacy Selection Grid */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-white mb-4 flex items-center justify-center gap-2">
          Ce eroare logică observi aici?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fallacies.map((f) => {
            const isSelected = selectedFallacy === f.id;
            const isCorrect = isSelected && feedback === 'success';
            const isWrong = isSelected && feedback === 'error';

            return (
              <button
                key={f.id}
                onClick={() => handleSelect(f.id)}
                disabled={feedback === 'success'}
                title={f.definition}
                className={`p-4 rounded-2xl border-2 font-bold transition-all text-sm flex flex-col items-center justify-center gap-2 h-24 ${isCorrect
                    ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 shadow-md'
                    : isWrong
                      ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                      : 'border-[#1a1a1a]/10 dark:border-white/10 text-[#1a1a1a] dark:text-white hover:border-[#7c1f31] dark:hover:border-[#ff4d6d] hover:bg-gray-50 dark:hover:bg-gray-900'
                  } ${feedback === 'success' && !isCorrect ? 'opacity-50' : 'opacity-100'}`}
              >
                {f.name}
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {feedback === 'error' && showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 p-4 rounded-xl mb-8"
          >
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              <strong>Gândește-te mai bine:</strong> {currentChallenge.hint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog.Root open={feedback === 'success'} onOpenChange={(open) => !open && handleNext()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1a1a1a] p-8 md:p-10 rounded-3xl shadow-2xl z-50 w-[90vw] max-w-md animate-in zoom-in-95">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <Dialog.Title className="text-2xl font-extrabold text-[#1a1a1a] dark:text-white mb-2">Reflex Corect!</Dialog.Title>
              <div className="bg-[#1a1a1a]/5 dark:bg-white/5 p-4 rounded-xl w-full text-left my-4">
                <p className="text-xs uppercase tracking-wider font-bold mb-1 opacity-60">Explicația mecanismului:</p>
                <p className="text-sm font-medium leading-relaxed">{currentChallenge.explanation}</p>
              </div>

              <Dialog.Close asChild>
                <button className="w-full bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all mt-4">
                  Continuă <ArrowRight className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  );
}
