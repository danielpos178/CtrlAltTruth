// Licensed under the GNU AGPL-3.0-only.

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Clock } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

export interface SwipeCard {
  id: number;
  text: string;
  isFake: boolean;
  explanation: string;
}

interface SwipeGameViewProps {
  initialCards: SwipeCard[];
}

const shuffleCards = (cards: SwipeCard[]) => [...cards].sort(() => Math.random() - 0.5);

export default function SwipeGameView({ initialCards }: SwipeGameViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [cards, setCards] = useState(() => shuffleCards(initialCards));
  const { saveSwipeGameScore, notifyUnauthenticated } = useProgress();

  useEffect(() => {
    // Notify user on first load
    notifyUnauthenticated();
  }, [notifyUnauthenticated]);

  const handleSwipe = useCallback((userGuessedFake: boolean | null) => {
    const currentCard = cards[currentIndex];
    const isCorrect = userGuessedFake !== null && userGuessedFake === currentCard.isFake;
    let newScore = score;

    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    setFeedback({
      isCorrect,
      explanation: currentCard.explanation
    });

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setTimeLeft(10);
      } else {
        setGameOver(true);
        saveSwipeGameScore(newScore);
      }
    }, 3000);
  }, [currentIndex, cards, score, saveSwipeGameScore]);

  useEffect(() => {
    if (gameOver || feedback) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSwipe(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, gameOver, feedback, handleSwipe]);

  const restartGame = () => {
    setCards(() => shuffleCards(initialCards));
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
    setFeedback(null);
  };

  if (gameOver) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-20">
        <h2 className="text-4xl font-extrabold text-[#1a1a1a] dark:text-white">Joc Terminat!</h2>
        <div className="bg-white dark:bg-[#1a1a1a] p-10 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-xl">
          <div className="text-7xl font-black text-[#7c1f31] dark:text-[#ff4d6d] mb-4">{score} / {cards.length}</div>
          <p className="text-xl text-[#1a1a1a]/80 dark:text-white/80 mb-8">
            {score >= 8 ? "Excelent! Ai un ochi critic foarte bine antrenat." :
              score >= 5 ? "Bine! Dar mai ai de lucrat la detectarea manipulării subtile." :
                "Atenție! Ești foarte vulnerabil la dezinformare. Citește lecțiile noastre!"}
          </p>
          <button
            onClick={restartGame}
            className="inline-flex items-center justify-center rounded-xl text-lg font-bold transition-all bg-[#7c1f31] text-white hover:bg-[#5a1623] h-14 px-10"
          >
            Joacă din nou
          </button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-xl mx-auto py-10 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8 px-4">
        <div className="text-lg font-bold text-[#1a1a1a] dark:text-white">Scor: <span className="text-[#7c1f31] dark:text-[#ff4d6d]">{score}</span></div>
        <div className="text-sm font-medium text-[#1a1a1a]/60 dark:text-white/60">Titlul {currentIndex + 1} din {cards.length}</div>
        <div className={`flex items-center gap-2 font-bold text-lg ${timeLeft <= 3 ? 'text-red-600 animate-pulse' : 'text-[#1a1a1a] dark:text-white'}`}>
          <Clock className="w-5 h-5" /> {timeLeft}s
        </div>
      </div>

      <div className="relative w-full aspect-[4/3] max-w-md">
        <AnimatePresence mode="wait">
          {!feedback ? (
            <motion.div
              key={currentCard.id}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              className="absolute inset-0 bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl border border-[#1a1a1a]/10 dark:border-white/10 p-8 flex flex-col justify-center text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] dark:text-white leading-tight font-serif">
                &quot;{currentCard.text}&quot;
              </h3>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`absolute inset-0 rounded-3xl shadow-2xl border p-8 flex flex-col justify-center text-center ${feedback.isCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30'
                }`}
            >
              <div className="mb-4 flex justify-center">
                {feedback.isCorrect ? (
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <X className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                )}
              </div>
              <h4 className={`text-2xl font-bold mb-4 ${feedback.isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                {feedback.isCorrect ? 'Corect!' : 'Greșit!'}
              </h4>
              <p className="text-lg text-[#1a1a1a]/80 dark:text-white/80 leading-relaxed">
                {feedback.isCorrect
                  ? `Corect! ${currentCard.isFake ? 'Acest titlu folosește tehnici de clickbait, este suspect.' : 'Acest titlu este factual și credibil.'}`
                  : `Greșit! ${currentCard.isFake ? 'Acest titlu era suspect.' : 'Acest titlu era credibil.'}`}
                <br /><br />
                <span className="text-sm opacity-90">{currentCard.explanation}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-6 mt-12 w-full max-w-md px-4">
        <button
          onClick={() => handleSwipe(true)}
          disabled={!!feedback}
          className="flex-1 h-20 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 min-h-[44px]"
        >
          <X className="w-6 h-6" /> SUSPECT
        </button>
        <button
          onClick={() => handleSwipe(false)}
          disabled={!!feedback}
          className="flex-1 h-20 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 min-h-[44px]"
        >
          <Check className="w-6 h-6" /> CREDIBIL
        </button>
      </div>
      <p className="text-[#1a1a1a]/50 dark:text-white/50 text-sm mt-6 text-center">
        Apasă SUSPECT dacă titlul folosește manipulare emoțională sau clickbait.<br />
        Apasă CREDIBIL dacă este o știre factuală, neutră.
      </p>
    </div>
  );
}
