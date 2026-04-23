// Licensed under the GNU AGPL-3.0-only.

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, AlertCircle, ArrowRight, Trophy, BookOpen, ArrowLeft, AlertTriangle, Fingerprint, MessageSquareWarning, Video, Filter, Search, ShieldAlert } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import Link from 'next/link';

const iconMap: Record<string, any> = {
  AlertTriangle,
  MessageSquareWarning,
  Fingerprint,
  Video,
  Filter,
  Search,
  ShieldAlert
};

interface LessonDetailProps {
  lesson: any;
}

export default function LessonDetail({ lesson }: LessonDetailProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { markLessonCompleted, notifyUnauthenticated } = useProgress();

  const currentQuiz = lesson?.quiz || [];
  const Icon = iconMap[lesson?.icon_name] || BookOpen;

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === currentQuiz[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      if (lesson.id) {
        markLessonCompleted(lesson.id);
      }
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const startQuiz = () => {
    notifyUnauthenticated();
    setQuizStarted(true);
  };

  if (!lesson) {
    return <div className="text-center py-20 text-2xl font-bold">Lecția nu a fost găsită.</div>;
  }

  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto space-y-12">
      <Link href="/lessons" className="inline-flex items-center gap-2 text-[#7c1f31] dark:text-[#ff4d6d] font-bold hover:underline mb-4">
        <ArrowLeft className="w-4 h-4" /> Înapoi la lecții
      </Link>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] shadow-sm border border-[#1a1a1a]/10 dark:border-white/10 overflow-hidden flex flex-col p-8 sm:p-12 lg:p-16">
        {!quizStarted ? (
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#7c1f31]/10 p-4 rounded-2xl">
                  <Icon className="w-8 h-8 text-[#7c1f31] dark:text-[#ff4d6d]" />
                </div>
                <div>
                  <span className="font-black text-[#7c1f31] dark:text-[#ff4d6d] uppercase tracking-widest text-sm block mb-1">
                    {lesson.level}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] dark:text-white leading-[1.1] tracking-tight">
                    {lesson.title}
                  </h2>
                </div>
              </div>

              <div className="prose prose-xl prose-stone dark:prose-invert max-w-none text-[#1a1a1a]/90 dark:text-white/90 leading-relaxed font-serif">
                {typeof lesson.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                ) : (
                  lesson.content
                )}
              </div>
            </div>

            <div className="pt-10 border-t border-[#1a1a1a]/10 dark:border-white/10">
              <div className="bg-[#e7edeb] dark:bg-white/5 p-8 rounded-[2rem] border border-[#1a1a1a]/10 dark:border-white/10 flex flex-col sm:flex-row items-center gap-8">
                <div className="bg-[#7c1f31] p-6 rounded-2xl text-white">
                  <HelpCircle className="w-10 h-10" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">Ești gata pentru verificare?</h3>
                  <p className="text-[#1a1a1a]/70 dark:text-white/70 text-lg">Testează-ți cunoștințele acumulate în această lecție printr-un scurt quiz.</p>
                </div>
                <button
                  onClick={startQuiz}
                  className="w-full sm:w-auto px-8 py-4 bg-[#7c1f31] text-white rounded-2xl font-bold text-lg hover:bg-[#5a1623] transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Începe Quiz-ul
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto py-4">
            {!quizCompleted ? (
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-sm font-black text-[#7c1f31] dark:text-[#ff4d6d] uppercase tracking-widest">Întrebarea {currentQuestionIndex + 1} din {currentQuiz.length}</span>
                    <div className="flex gap-1">
                      {currentQuiz.map((_: any, i: number) => (
                        <div
                          key={i}
                          className={`h-1.5 w-8 rounded-full transition-all ${i <= currentQuestionIndex ? 'bg-[#7c1f31] dark:bg-[#ff4d6d]' : 'bg-gray-200 dark:bg-gray-800'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#1a1a1a]/40 dark:text-white/40">Scor: {score}</span>
                  </div>
                </div>

                <h3 className="text-3xl font-black text-[#1a1a1a] dark:text-white leading-tight">
                  {currentQuiz[currentQuestionIndex].question}
                </h3>

                <div className="space-y-4">
                  {currentQuiz[currentQuestionIndex].options.map((option: string, index: number) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = index === currentQuiz[currentQuestionIndex].correctAnswer;

                    let buttonClass = "w-full p-6 text-left rounded-2xl border-2 transition-all flex items-center justify-between group ";
                    if (selectedOption === null) {
                      buttonClass += "border-[#1a1a1a]/10 dark:border-white/10 hover:border-[#7c1f31] dark:hover:border-[#ff4d6d] hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 bg-[#1a1a1a]/5 dark:bg-white/5";
                    } else if (isSelected) {
                      buttonClass += isCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-red-500 bg-red-50 dark:bg-red-900/20";
                    } else if (isCorrect && showExplanation) {
                      buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 opacity-60";
                    } else {
                      buttonClass += "border-[#1a1a1a]/5 dark:border-white/5 opacity-40";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        disabled={selectedOption !== null}
                        className={buttonClass}
                      >
                        <span className="text-lg font-bold text-[#1a1a1a] dark:text-white">{option}</span>
                        {selectedOption !== null && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                        {isSelected && !isCorrect && <AlertCircle className="w-6 h-6 text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-2xl border-l-4 ${selectedOption === currentQuiz[currentQuestionIndex].correctAnswer ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-bold text-lg">{selectedOption === currentQuiz[currentQuestionIndex].correctAnswer ? 'Excelent!' : 'Mai încearcă.'}</p>
                    </div>

                    <p className="text-sm opacity-90 mb-4">{currentQuiz[currentQuestionIndex].explanation}</p>

                    {selectedOption !== currentQuiz[currentQuestionIndex].correctAnswer && (
                      <div className="bg-white/40 dark:bg-white/5 p-4 rounded-xl mb-4 border border-red-200 dark:border-red-800/30">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1">Sugestie de remediere:</p>
                        <p className="text-sm italic">{currentQuiz[currentQuestionIndex].remediation}</p>
                      </div>
                    )}

                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-4 bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-gray-200 transition-all shadow-lg active:scale-95"
                    >
                      {currentQuestionIndex < currentQuiz.length - 1 ? 'Următoarea Întrebare' : 'Vezi Rezultatul Final'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-8 py-10">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-[#7c1f31]/20 blur-3xl rounded-full" />
                  <Trophy className="w-32 h-32 text-[#7c1f31] dark:text-[#ff4d6d] relative" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-[#1a1a1a] dark:text-white">Felicitări!</h3>
                  <p className="text-xl text-[#1a1a1a]/60 dark:text-white/60 font-medium">Ai finalizat quiz-ul pentru această lecție.</p>
                </div>
                <div className="bg-[#e7edeb] dark:bg-white/5 p-8 rounded-[2rem] border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm max-w-sm mx-auto">
                  <span className="text-sm font-black text-[#1a1a1a]/40 dark:text-white/40 uppercase tracking-widest">Scorul tău</span>
                  <div className="text-6xl font-black text-[#7c1f31] dark:text-[#ff4d6d] my-2">
                    {score} <span className="text-2xl text-[#1a1a1a]/20 dark:text-white/20">/ {currentQuiz.length}</span>
                  </div>
                  <p className="text-sm font-bold text-[#1a1a1a]/60 dark:text-white/60">
                    {score === currentQuiz.length ? 'Ești un expert în digital literacy!' : 'O performanță solidă. Continuă să înveți!'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="px-8 py-4 bg-white dark:bg-transparent border-2 border-[#1a1a1a]/10 dark:border-white/10 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-[#1a1a1a] dark:text-white"
                  >
                    Reia Quiz-ul
                  </button>
                  <Link
                    href="/lessons"
                    className="px-8 py-4 bg-[#7c1f31] text-white rounded-2xl font-bold flex justify-center hover:bg-[#5a1623] transition-all shadow-md"
                  >
                    Înapoi la Lecții
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
