'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Loader2, ArrowRight, RefreshCcw, ThumbsUp, MessageCircle, Share2, Globe, Clock, User, Brain } from 'lucide-react';
import { calculateStylometry } from '@/utils/stylometry';

interface ArticleData {
  text: string;
  toxicWords: string[];
  explanation: string;
  emotions: {
    fear: number;
    anger: number;
    urgency: number;
    validation: number;
  };
}

type AppState = 'select-topic' | 'analyzing' | 'results';

interface AnalyzerViewProps {
  topics: any[];
}

export default function AnalyzerView({ topics }: AnalyzerViewProps) {
  const [appState, setAppState] = useState<AppState>('select-topic');
  const [isLoading, setIsLoading] = useState(false);
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(25);
  const [uiStyle, setUiStyle] = useState<'facebook' | 'news'>('news');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cleanWord = (w: string) => w.toLowerCase().replace(/[^a-z0-9ăâîșț-]/g, '');

  const startTimer = () => {
    setTimeLeft(25);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleSubmitAnalysis();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSelectTopic = async (topic: any) => {
    setIsLoading(true);
    setAppState('select-topic');
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicTitle: topic.title, topicDescription: topic.description })
      });
      
      if (!res.ok) {
        throw new Error('Eroare la generarea articolului');
      }
      
      const data = await res.json();
      data.toxicWords = data.toxicWords.map((w: string) => cleanWord(w));
      setArticleData(data);
      setSelectedWordIndices([]);
      setUiStyle(Math.random() > 0.5 ? 'facebook' : 'news');
      setAppState('analyzing');
      startTimer();
    } catch (error) {
      console.error(error);
      alert("A apărut o eroare la generarea conținutului. Vă rugăm să încercați din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWordSelection = (index: number) => {
    if (appState !== 'analyzing') return;
    setSelectedWordIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleSubmitAnalysis = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setAppState('results');
  };

  const handlePlayAgain = () => {
    setAppState('select-topic');
    setArticleData(null);
    setSelectedWordIndices([]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Calculate Accuracy
  let accuracy = 0;
  let flattenedToxicWords: string[] = [];
  if (articleData && appState === 'results') {
    flattenedToxicWords = articleData.toxicWords
      .flatMap(phrase => phrase.split(/\s+/))
      .map(w => cleanWord(w))
      .filter(w => w.length > 0);

    const correctlyIdentified = selectedWordIndices.filter(index => {
      const word = articleData.text.split(' ')[index];
      return flattenedToxicWords.includes(cleanWord(word));
    }).length;

    // To avoid division by zero
    const totalToxic = flattenedToxicWords.length || 1;
    accuracy = Math.round((correctlyIdentified / totalToxic) * 100);
    // Cap at 100% just in case of duplicate words
    if (accuracy > 100) accuracy = 100;
  }

  const renderInteractiveText = () => {
    if (!articleData) return null;

    const words = articleData.text.split(' ');
    
    const textContent = (
      <div className="flex flex-wrap gap-x-1.5 gap-y-3">
        {words.map((word, index) => {
          const isSelected = selectedWordIndices.includes(index);
          const cleanedWord = cleanWord(word);
          const isToxic = appState === 'results' ? flattenedToxicWords.includes(cleanedWord) : false;
          
          let wordClasses = "px-1.5 rounded transition-colors duration-200 min-h-[44px] inline-flex items-center ";
          
          if (appState === 'analyzing') {
            wordClasses += isSelected 
              ? "bg-[#7c1f31]/40 dark:bg-[#ff4d6d]/40 text-[#1a1a1a] dark:text-white cursor-pointer" 
              : "cursor-pointer hover:bg-[#1a1a1a]/10 dark:hover:bg-white/10";
          } else if (appState === 'results') {
            if (isSelected && isToxic) {
              wordClasses += "bg-green-200 dark:bg-green-900/40 text-green-900 dark:text-green-300 font-medium font-sans";
            } else if (!isSelected && isToxic) {
              wordClasses += "bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-300 underline decoration-red-500 decoration-2 underline-offset-4 font-sans";
            } else if (isSelected && !isToxic) {
              wordClasses += "bg-[#1a1a1a]/20 dark:bg-white/20 text-[#1a1a1a]/60 dark:text-white/60 line-through decoration-[#1a1a1a]/40 dark:decoration-white/40 font-sans";
            } else {
              wordClasses += "opacity-80";
            }
          }

          return (
            <span 
              key={index} 
              onClick={() => toggleWordSelection(index)}
              className={wordClasses}
            >
              {word}
            </span>
          );
        })}
      </div>
    );

    if (uiStyle === 'facebook') {
      return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden font-sans">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900">Adevărul Necenzurat</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                Sponsored <Globe className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="px-4 pb-4 text-[15px] leading-relaxed text-gray-900">
            {textContent}
          </div>
          <div className="px-4 py-2 flex items-center justify-between border-t border-gray-100 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <ThumbsUp className="w-3 h-3 text-white" />
              </div>
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center -ml-1">
                <span className="text-white text-[10px] font-bold">❤</span>
              </div>
              <span className="ml-1">12K</span>
            </div>
            <div>4.2K Comments • 8.1K Shares</div>
          </div>
          <div className="px-4 py-1 border-t border-gray-100 flex items-center justify-between">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 text-gray-600 font-semibold text-sm rounded-md transition-colors">
              <ThumbsUp className="w-5 h-5" /> Like
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 text-gray-600 font-semibold text-sm rounded-md transition-colors">
              <MessageCircle className="w-5 h-5" /> Comment
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 text-gray-600 font-semibold text-sm rounded-md transition-colors">
              <Share2 className="w-5 h-5" /> Share
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="max-w-2xl mx-auto bg-[#fdfdfc] dark:bg-[#1a1a1a] rounded-sm shadow-sm border border-gray-300 dark:border-white/10 p-8 md:p-12 font-serif">
          <div className="border-b-2 border-black dark:border-white pb-4 mb-6">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2 uppercase tracking-tight">The Daily Chronicle</h1>
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-white/60 font-sans uppercase tracking-widest">
              <span>Published Today</span>
              <span>By Editorial Board</span>
            </div>
          </div>
          <div className="text-xl md:text-2xl leading-loose md:leading-loose text-[#1a1a1a] dark:text-white/90">
            {textContent}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 space-y-6"
        >
          <Loader2 className="w-16 h-16 text-[#7c1f31] animate-spin" />
          <p className="text-xl font-medium text-[#1a1a1a]/70 animate-pulse">Generăm un articol manipulator...</p>
        </motion.div>
      ) : (
        <>
          {appState === 'select-topic' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-extrabold tracking-tight text-[#1a1a1a] dark:text-white">Laboratorul de Adevăr</h2>
                <p className="text-lg text-[#1a1a1a]/80 dark:text-white/80 max-w-2xl mx-auto">
                  Selectează un subiect de mai jos pentru a citi un articol generat. Scopul tău este să identifici și să marchezi cuvintele încărcate emoțional, subiective sau toxice folosite pentru a manipula cititorul.
                </p>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => handleSelectTopic(topic)}
                      className="group relative flex flex-col items-start p-8 bg-white dark:bg-[#1a1a1a] rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#7c1f31] transition-all text-left min-h-[44px]"
                    >
                      <div className="bg-[#7c1f31]/10 p-4 rounded-2xl mb-6 group-hover:bg-[#7c1f31]/20 transition-colors">
                        <Icon className="w-8 h-8 text-[#7c1f31] dark:text-[#ff4d6d]" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-[#1a1a1a] dark:text-white">{topic.title}</h3>
                      <p className="text-base text-[#1a1a1a]/70 dark:text-white/70 leading-relaxed">{topic.description}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {(appState === 'analyzing' || appState === 'results') && articleData && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10 max-w-5xl mx-auto"
            >
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center rounded-full border border-transparent bg-[#7c1f31]/10 px-4 py-1.5 text-sm font-bold text-[#7c1f31] dark:text-[#ff4d6d]">
                  {appState === 'analyzing' ? 'Analizează Textul' : 'Raportul de Analiză'}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] dark:text-white">
                  {appState === 'analyzing' ? 'Identifică Manipularea' : 'Cum te-ai descurcat?'}
                </h2>
                <p className="text-lg text-[#1a1a1a]/80 dark:text-white/80">
                  {appState === 'analyzing' 
                    ? 'Apasă pe cuvintele care ți se par exagerate, subiective sau care încearcă să te manipuleze emoțional.' 
                    : 'Compară selecțiile tale cu analiza realizată de Inteligența Artificială.'}
                </p>
              </div>

              {appState === 'analyzing' && (
                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-lg text-[#1a1a1a] dark:text-white">
                      <Clock className="w-5 h-5 text-[#7c1f31] dark:text-[#ff4d6d]" />
                      Timp rămas: <span className={timeLeft <= 5 ? "text-red-600 dark:text-red-400" : ""}>{timeLeft}s</span>
                    </div>
                    <div className="text-sm font-medium text-[#1a1a1a]/60 dark:text-white/60">
                      Cuvinte selectate: {selectedWordIndices.length}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? 'bg-red-500 animate-pulse' : 'bg-[#7c1f31] dark:bg-[#ff4d6d]'}`}
                      style={{ width: `${(timeLeft / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {renderInteractiveText()}

              {appState === 'analyzing' && (
                <div className="flex justify-center mt-8">
                  <button 
                    onClick={handleSubmitAnalysis}
                    className="inline-flex items-center justify-center rounded-xl text-lg font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c1f31] bg-[#7c1f31] text-white hover:bg-[#5a1623] hover:shadow-md h-14 px-10 min-h-[44px]"
                  >
                    Verifică Analiza Acum
                  </button>
                </div>
              )}

              {appState === 'results' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="bg-white dark:bg-[#1a1a1a] p-8 md:p-10 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-full bg-[#7c1f31]/10 dark:bg-[#7c1f31]/20 flex items-center justify-center text-3xl font-black text-[#7c1f31] dark:text-[#ff4d6d]">
                            {accuracy}%
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white">Acuratețe</h3>
                            <p className="text-[#1a1a1a]/70 dark:text-white/70">Ai identificat corect {accuracy}% din cuvintele toxice.</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-3 flex items-center gap-2">
                            <Brain className="w-6 h-6 text-[#7c1f31] dark:text-[#ff4d6d]" />
                            Explicația AI-ului
                          </h3>
                          <p className="text-lg text-[#1a1a1a]/80 dark:text-white/80 leading-relaxed bg-[#e7edeb] dark:bg-white/5 p-6 rounded-2xl border border-[#7c1f31]/20 dark:border-white/10">
                            {articleData.explanation}
                          </p>
                        </div>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800/30 text-yellow-800 dark:text-yellow-200 text-sm">
                          <strong>Notă despre formatare:</strong> Ai observat cum arăta textul? L-am încadrat intenționat într-un format de {uiStyle === 'facebook' ? 'postare social media' : 'articol de știri premium'}. Acest &quot;Efect de Halo&quot; vizual influențează subconștient cât de multă încredere acordăm informației, chiar înainte de a citi primul cuvânt.
                        </div>
                      </div>

                      <div className="w-full md:w-1/3 space-y-6">
                        <div className="bg-[#e7edeb] dark:bg-white/5 p-6 rounded-2xl border border-[#1a1a1a]/10 dark:border-white/10">
                          <h4 className="font-bold text-[#1a1a1a] dark:text-white mb-4">Radar Emoțional</h4>
                          <div className="space-y-3">
                            {Object.entries(articleData.emotions || {}).map(([emotion, score]) => (
                              <div key={emotion}>
                                <div className="flex justify-between text-sm font-medium text-[#1a1a1a] dark:text-white mb-1 capitalize">
                                  <span>{emotion === 'urgency' ? 'Urgență' : emotion === 'validation' ? 'Validare' : emotion === 'fear' ? 'Frică' : 'Furie'}</span>
                                  <span>{score}%</span>
                                </div>
                                <div className="w-full bg-white dark:bg-gray-800 rounded-full h-2">
                                  <div className="bg-[#7c1f31] dark:bg-[#ff4d6d] h-2 rounded-full" style={{ width: `${score}%` }}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                          <div className="bg-[#e7edeb] dark:bg-white/5 p-6 rounded-2xl border border-[#1a1a1a]/10 dark:border-white/10 flex flex-col h-full">
                            <h4 className="font-bold text-[#1a1a1a] dark:text-white mb-4 flex items-center gap-2">
                              <Brain className="w-5 h-5 text-[#7c1f31] dark:text-[#ff4d6d]" />
                              Amprenta AI (Stilometrie)
                            </h4>
                            
                            <div className="space-y-4 flex-1">
                              {(() => {
                                const stylometry = calculateStylometry(articleData.text);
                                const isAI = stylometry.stdDev < 5 || stylometry.lexicalDiversity < 40;
                                return (
                                  <>
                                    <div>
                                      <div className="flex justify-between text-sm font-bold text-[#1a1a1a] dark:text-white mb-1">
                                        <span>Varianța Frazei (Burstiness)</span>
                                        <span>{stylometry.stdDev}</span>
                                      </div>
                                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                                        <div className="bg-[#7c1f31] dark:bg-[#ff4d6d] h-2 rounded-full" style={{ width: `${Math.min(100, (stylometry.stdDev / 10) * 100)}%` }}></div>
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex justify-between text-sm font-bold text-[#1a1a1a] dark:text-white mb-1">
                                        <span>Diversitate Lexicală</span>
                                        <span>{stylometry.lexicalDiversity}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                                        <div className="bg-[#1a1a1a] dark:bg-white h-2 rounded-full" style={{ width: `${stylometry.lexicalDiversity}%` }}></div>
                                      </div>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-[#1a1a1a]/10 dark:border-white/10">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]/60 dark:text-white/60">Verdict Analiză Locală</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${isAI ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>
                                          {isAI ? 'Probabil AI' : 'Probabil Uman'}
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <button 
                      onClick={handlePlayAgain}
                      className="inline-flex items-center justify-center rounded-xl text-lg font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] dark:focus-visible:ring-white bg-white dark:bg-transparent border-2 border-[#1a1a1a] dark:border-white text-[#1a1a1a] dark:text-white hover:bg-[#1a1a1a] dark:hover:bg-white hover:text-white dark:hover:text-[#1a1a1a] h-14 px-10 gap-3 min-h-[44px]"
                    >
                      <RefreshCcw className="w-5 h-5" />
                      Analizează alt subiect
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
