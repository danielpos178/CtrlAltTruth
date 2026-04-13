
// Licensed under the GNU AGPL-3.0-only.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, ArrowRight, CheckCircle2, AlertCircle, Trophy, HelpCircle } from 'lucide-react';

interface LessonsViewProps {
  lessons: any[];
  activeLesson: number | null;
  setActiveLesson: (id: number | null) => void;
}

export default function LessonsView({ lessons, activeLesson, setActiveLesson }: LessonsViewProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentLesson = lessons.find(l => l.id === activeLesson);
  const currentQuiz = currentLesson?.quiz || [];

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

  const handleClose = () => {
    setActiveLesson(null);
    resetQuiz();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 py-10"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1a1a] dark:text-white">Academia Ctrl+Alt+Truth</h2>
        <p className="text-xl text-[#7c1f31] dark:text-[#ff4d6d] font-medium">Educație digitală pentru o lume a dezinformării</p>
        <div className="flex justify-center gap-4 mt-6">
          <div className="bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-[#1a1a1a]/10 dark:border-white/10 text-sm font-bold text-[#1a1a1a]/60 dark:text-white/60 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> {lessons.length} Lecții
          </div>
          <div className="bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-[#1a1a1a]/10 dark:border-white/10 text-sm font-bold text-[#1a1a1a]/60 dark:text-white/60 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" /> Quiz-uri incluse
          </div>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {lessons.map((lesson) => {
          const Icon = lesson.icon;
          return (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson.id)}
              className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left flex flex-col items-start group"
            >
              <div className="bg-[#7c1f31]/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-[#7c1f31]/20 transition-colors">
                <Icon className="w-8 h-8 text-[#7c1f31] dark:text-[#ff4d6d]" />
              </div>
              <span className="text-sm font-bold text-[#7c1f31] dark:text-[#ff4d6d] mb-2 uppercase tracking-wider">{lesson.level}</span>
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-4">{lesson.title}</h3>
              <div className="text-[#1a1a1a]/80 dark:text-white/80 leading-relaxed text-lg line-clamp-3 mb-6">
                {lesson.content}
              </div>
              <div className="mt-auto pt-4 text-[#7c1f31] dark:text-[#ff4d6d] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Începe Lecția <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Notion-style Modal */}
      <AnimatePresence>
        {activeLesson !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1a1a1a]/60 backdrop-blur-md"
              onClick={handleClose}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#e7edeb] dark:bg-[#0a0a0a] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 sm:px-10 border-b border-[#1a1a1a]/10 dark:border-white/10 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="bg-[#7c1f31]/10 p-2.5 rounded-xl">
                    {React.createElement(currentLesson?.icon || BookOpen, { className: "w-6 h-6 text-[#7c1f31] dark:text-[#ff4d6d]" })}
                  </div>
                  <div>
                    <span className="font-black text-[#7c1f31] dark:text-[#ff4d6d] uppercase tracking-widest text-xs block mb-0.5">
                      {currentLesson?.level}
                    </span>
                    <h4 className="font-bold text-[#1a1a1a] dark:text-white text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
                      {currentLesson?.title}
                    </h4>
                  </div>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#1a1a1a]/10 dark:hover:bg-white/10 transition-colors text-[#1a1a1a] dark:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-8 sm:p-12 lg:p-16">
                {!quizStarted ? (
                  <div className="max-w-3xl mx-auto space-y-10">
                    <div className="space-y-6">
                      <h2 className="text-4xl sm:text-5xl font-black text-[#1a1a1a] dark:text-white leading-[1.1] tracking-tight">
                        {currentLesson?.title}
                      </h2>
                      <div className="prose prose-xl prose-stone dark:prose-invert max-w-none text-[#1a1a1a]/90 dark:text-white/90 leading-relaxed font-serif">
                        {currentLesson?.content}
                      </div>
                    </div>

                    <div className="pt-10 border-t border-[#1a1a1a]/10 dark:border-white/10">
                      <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-[2rem] border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center gap-8">
                        <div className="bg-[#7c1f31] p-6 rounded-2xl text-white">
                          <HelpCircle className="w-10 h-10" />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">Ești gata pentru verificare?</h3>
                          <p className="text-[#1a1a1a]/70 dark:text-white/70 text-lg">Testează-ți cunoștințele acumulate în această lecție printr-un scurt quiz.</p>
                        </div>
                        <button 
                          onClick={() => setQuizStarted(true)}
                          className="w-full sm:w-auto px-8 py-4 bg-[#7c1f31] text-white rounded-2xl font-bold text-lg hover:bg-[#5a1623] transition-all shadow-lg hover:shadow-xl active:scale-95"
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
                              buttonClass += "border-[#1a1a1a]/10 dark:border-white/10 hover:border-[#7c1f31] dark:hover:border-[#ff4d6d] hover:bg-white dark:hover:bg-white/5 bg-white/50 dark:bg-white/5";
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
                        <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-[2rem] border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm max-w-sm mx-auto">
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
                          <button 
                            onClick={handleClose}
                            className="px-8 py-4 bg-[#7c1f31] text-white rounded-2xl font-bold hover:bg-[#5a1623] transition-all shadow-lg"
                          >
                            Înapoi la Lecții
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
