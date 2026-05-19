'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Search, Camera, User, Calendar, ShieldCheck, ArrowRight, ExternalLink, Globe, FileText } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface Scenario {
  id: number;
  title: string;
  author_name: string;
  author_metadata: any;
  publish_date: string;
  date_metadata: any;
  image_url: string;
  cross_check_metadata: any;
  domain_name?: string;
  domain_metadata?: any;
  content_excerpt?: string;
  content_metadata?: any;
}

export function ReflexSimulatorView({ scenarios }: { scenarios: Scenario[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // States for the 5 checks
  const [checkedAuthor, setCheckedAuthor] = useState(false);
  const [checkedDate, setCheckedDate] = useState(false);
  const [checkedSource, setCheckedSource] = useState(false);
  const [checkedDomain, setCheckedDomain] = useState(false);
  const [checkedContent, setCheckedContent] = useState(false);

  // Inspection Popups
  const [inspecting, setInspecting] = useState<'author' | 'date' | 'source' | 'domain' | 'content' | null>(null);

  const currentScenario = scenarios[currentIndex];

  const isAllChecked = checkedAuthor && checkedDate && checkedSource && checkedDomain && checkedContent;

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setCheckedAuthor(false);
    setCheckedDate(false);
    setCheckedSource(false);
    setCheckedDomain(false);
    setCheckedContent(false);
    setInspecting(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] dark:text-white mb-2 tracking-tight flex items-center justify-center gap-3">
          <Search className="w-8 h-8 text-[#7c1f31] dark:text-[#ff4d6d]" /> Simulator Reflex Digital
        </h1>
        <p className="text-[#1a1a1a]/70 dark:text-white/70 font-medium">
          Lupa de Verificare: Formează-ți reflexul de a verifica informația înainte de a o crede.
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 relative">

        {/* Simulated Browser */}
        <div className="flex-1 bg-white dark:bg-[#1a1a1a] rounded-t-3xl rounded-b-xl border border-[#1a1a1a]/20 dark:border-white/20 shadow-2xl overflow-hidden flex flex-col relative">

          {/* Browser Chrome */}
          <div className="bg-gray-100 dark:bg-[#0a0a0a] px-4 py-3 border-b border-[#1a1a1a]/10 dark:border-white/10 flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div
              onClick={() => { setCheckedDomain(true); setInspecting('domain'); }}
              className={`flex-1 rounded-lg border px-3 py-1.5 flex items-center justify-center text-xs font-mono cursor-pointer transition-colors ${checkedDomain ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300' : 'bg-white dark:bg-[#1a1a1a] border-[#1a1a1a]/10 dark:border-white/10 text-gray-500 hover:bg-gray-50 dark:hover:bg-[#111]'}`}
            >
              <ShieldCheck className={`w-4 h-4 mr-2 ${checkedDomain ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
              https://<span className={`underline decoration-2 underline-offset-4 ${!checkedDomain && 'hover:text-[#7c1f31] dark:hover:text-[#ff4d6d]'}`}>{currentScenario.domain_name || 'stirile-adevarului.pseudo'}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="flex-1 p-6 md:p-10 overflow-y-auto relative bg-[#f9fafb] dark:bg-[#111]">

            {/* Reverse Image Search Target */}
            <div className="relative group cursor-crosshair inline-block w-full mb-6" onClick={() => { setCheckedSource(true); setInspecting('source'); }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentScenario.image_url} alt="Article cover" className={`w-full h-64 md:h-80 object-cover rounded-2xl shadow-sm ${!checkedSource ? 'hover:outline hover:outline-4 hover:outline-[#7c1f31]/50' : ''} transition-all`} />

              {!checkedSource && (
                <div className="absolute inset-0 bg-[#7c1f31]/0 group-hover:bg-[#7c1f31]/20 transition-colors rounded-2xl flex items-center justify-center">
                  <div className="bg-white text-[#1a1a1a] px-4 py-2 rounded-xl font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#7c1f31]" /> Verifică Sursa Imaginii
                  </div>
                </div>
              )}
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] dark:text-gray-100 mb-6 leading-tight">
              {currentScenario.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 mb-8 border-y border-gray-200 dark:border-gray-800 py-4">
              {/* Author Target */}
              <div
                onClick={() => { setCheckedAuthor(true); setInspecting('author'); }}
                className={`flex items-center gap-2 cursor-pointer p-2 -m-2 rounded-lg transition-colors ${checkedAuthor ? 'text-green-600 dark:text-green-400' : 'text-[#7c1f31] font-bold hover:bg-[#7c1f31]/10 dark:hover:bg-[#ff4d6d]/20'}`}
              >
                <User className="w-5 h-5" />
                <span className="underline decoration-2 underline-offset-4">{currentScenario.author_name}</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-gray-400" />

              {/* Date Target */}
              <div
                onClick={() => { setCheckedDate(true); setInspecting('date'); }}
                className={`flex items-center gap-2 cursor-pointer p-2 -m-2 rounded-lg transition-colors ${checkedDate ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-200 dark:hover:bg-gray-800'}`}
              >
                <Calendar className="w-5 h-5" />
                <span className="underline decoration-2 underline-offset-4">{currentScenario.publish_date}</span>
              </div>
            </div>

            {/* Blurred Body Content to force focus on verification */}
            <div
              onClick={() => { setCheckedContent(true); setInspecting('content'); }}
              className={`space-y-4 p-4 rounded-xl cursor-pointer transition-all duration-1000 ${checkedContent ? 'bg-green-50 dark:bg-green-900/10' : 'hover:bg-gray-100 dark:hover:bg-[#1a1a1a]'} ${isAllChecked ? 'opacity-30' : 'opacity-100'}`}
            >
              {currentScenario.content_excerpt ? (
                <div className="relative">
                  <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">{currentScenario.content_excerpt}</p>
                  {!checkedContent && (
                    <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-[#7c1f31] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Analizează Textul
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="blur-[6px] select-none pointer-events-none">
                  <p className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-full" />
                  <p className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-5/6" />
                  <p className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-4/6" />
                  <br />
                  <p className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-full" />
                  <p className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-full" />
                  <p className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-3/4" />
                </div>
              )}
            </div>
          </div>

          {/* Inspection Popups Floating over content */}
          <AnimatePresence>
            {inspecting === 'domain' && checkedDomain && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="absolute z-20 top-16 left-1/2 -translate-x-1/2 max-w-sm w-[90%] bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-2xl p-6 border border-b-4 border-[#1a1a1a]/10 border-b-purple-500 dark:border-white/10 dark:border-b-purple-500">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                  <Globe className="w-5 h-5 text-purple-500" />
                  <h4 className="font-bold text-[#1a1a1a] dark:text-white">Analiză Domeniu</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p>{currentScenario.domain_metadata?.analysis || 'Domeniul pare suspect datorită numelui inedit sau extensiei.'}</p>
                </div>
                <button onClick={() => setInspecting(null)} className="mt-4 w-full bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 py-2 rounded-lg text-sm font-bold">Am înțeles</button>
              </motion.div>
            )}

            {inspecting === 'content' && checkedContent && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="absolute z-20 bottom-10 left-1/2 -translate-x-1/2 max-w-md w-[90%] bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-2xl p-6 border border-b-4 border-[#1a1a1a]/10 border-b-orange-500 dark:border-white/10 dark:border-b-orange-500">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <h4 className="font-bold text-[#1a1a1a] dark:text-white">Analiză Conținut</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p>{currentScenario.content_metadata?.analysis}</p>
                  {currentScenario.content_metadata?.emotional_language && <p className="text-orange-600 dark:text-orange-400 font-bold mt-2">⚠️ Conține limbaj emoțional / de panică.</p>}
                  {currentScenario.content_metadata?.capitalization_abuse && <p className="text-orange-600 dark:text-orange-400 font-bold mt-1">⚠️ Abuz de majuscule pentru senzaționalism.</p>}
                </div>
                <button onClick={() => setInspecting(null)} className="mt-4 w-full bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 py-2 rounded-lg text-sm font-bold">Închide Meniul</button>
              </motion.div>
            )}
            {inspecting === 'author' && checkedAuthor && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="absolute z-20 top-1/2 left-4 md:left-20 max-w-sm bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-2xl p-6 border border-[#1a1a1a]/10 dark:border-white/10">
                <h4 className="font-bold border-b pb-2 mb-3 text-[#1a1a1a] dark:text-white">Analiză Autor</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Urmăritori:</strong> {currentScenario.author_metadata?.followers || 0}</p>
                  <p><strong>Cont creat:</strong> {currentScenario.author_metadata?.created_at}</p>
                  {currentScenario.author_metadata?.is_bot && <p className="text-red-500 font-bold">⚠️ Comportament de tip bot detectat</p>}
                </div>
                <button onClick={() => setInspecting(null)} className="mt-4 w-full bg-gray-100 dark:bg-white/10 py-2 rounded-lg text-sm font-bold">Închide Meniul</button>
              </motion.div>
            )}

            {inspecting === 'date' && checkedDate && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="absolute z-20 top-1/2 right-4 md:right-20 max-w-sm bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-2xl p-6 border border-[#1a1a1a]/10 dark:border-white/10">
                <h4 className="font-bold border-b pb-2 mb-3 text-[#1a1a1a] dark:text-white">Integritate Temporală</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Data Originală:</strong> {currentScenario.date_metadata?.actual_date}</p>
                  <p><strong>Context Real:</strong> {currentScenario.date_metadata?.explanation}</p>
                </div>
                <button onClick={() => setInspecting(null)} className="mt-4 w-full bg-gray-100 dark:bg-white/10 py-2 rounded-lg text-sm font-bold">Închide Meniul</button>
              </motion.div>
            )}

            {inspecting === 'source' && checkedSource && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="absolute z-20 top-1/4 left-1/2 -translate-x-1/2 max-w-md w-[90%] bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-2xl p-6 border border-b-4 border-[#1a1a1a]/10 border-b-blue-500 dark:border-white/10 dark:border-b-blue-500">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                  <ExternalLink className="w-5 h-5 text-blue-500" />
                  <h4 className="font-bold text-[#1a1a1a] dark:text-white">Rezultate Căutare Inversă</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p>Imaginea a fost găsită pe: <span className="font-bold">{currentScenario.cross_check_metadata?.source_found}</span></p>
                  {!currentScenario.cross_check_metadata?.is_reliable && <p className="text-red-500 font-bold mt-2">⚠️ Această sursă nu este de încredere.</p>}
                </div>
                <button onClick={() => setInspecting(null)} className="mt-4 w-full bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 py-2 rounded-lg text-sm font-bold">Am înțeles</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reflex Checklist Dock */}
        <div className="lg:w-80 bg-[#7c1f31] dark:bg-[#5a1623] rounded-3xl p-6 shadow-xl flex flex-col justify-between order-first lg:order-last border border-white/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
            <ShieldCheck className="w-48 h-48 text-white transform rotate-12" />
          </div>

          <div className="relative z-10">
            <h3 className="text-white font-extrabold text-2xl mb-6">Lista de Reflexe</h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${checkedDomain ? 'border-green-400 bg-green-500/20' : 'border-white/20 bg-white/10'}`}>
                <span className={`font-bold ${checkedDomain ? 'text-green-300' : 'text-white'}`}>Unde? (Domeniu URL)</span>
                {checkedDomain && <CheckCircle className="w-5 h-5 text-green-400" />}
              </div>

              <div className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${checkedAuthor ? 'border-green-400 bg-green-500/20' : 'border-white/20 bg-white/10'}`}>
                <span className={`font-bold ${checkedAuthor ? 'text-green-300' : 'text-white'}`}>Cine? (Autorul)</span>
                {checkedAuthor && <CheckCircle className="w-5 h-5 text-green-400" />}
              </div>

              <div className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${checkedDate ? 'border-green-400 bg-green-500/20' : 'border-white/20 bg-white/10'}`}>
                <span className={`font-bold ${checkedDate ? 'text-green-300' : 'text-white'}`}>Când? (Vechimea)</span>
                {checkedDate && <CheckCircle className="w-5 h-5 text-green-400" />}
              </div>

              <div className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${checkedSource ? 'border-green-400 bg-green-500/20' : 'border-white/20 bg-white/10'}`}>
                <span className={`font-bold ${checkedSource ? 'text-green-300' : 'text-white'}`}>De unde? (Sursa imaginii)</span>
                {checkedSource && <CheckCircle className="w-5 h-5 text-green-400" />}
              </div>

              <div className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${checkedContent ? 'border-green-400 bg-green-500/20' : 'border-white/20 bg-white/10'}`}>
                <span className={`font-bold ${checkedContent ? 'text-green-300' : 'text-white'}`}>Cum? (Limbajul textului)</span>
                {checkedContent && <CheckCircle className="w-5 h-5 text-green-400" />}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-white/70 text-sm font-medium relative z-10 bg-black/20 p-4 rounded-xl">
            <p>Apasă direct pe elementele articolului pentru a le verifica cu lupa.</p>
          </div>
        </div>

      </div>

      <Dialog.Root open={isAllChecked && inspecting === null}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1a1a1a] p-8 md:p-10 rounded-3xl shadow-2xl z-50 w-[90vw] max-w-lg animate-in zoom-in-95 outline-none">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <Dialog.Title className="text-3xl font-extrabold text-[#1a1a1a] dark:text-white mb-4">Adevărul Deblocat!</Dialog.Title>
              <p className="text-lg text-[#1a1a1a]/70 dark:text-white/70 mb-8 font-medium">
                Felicitări! Data viitoare când vezi o știre pe internet, creierul tău va căuta automat aceste 5 puncte înainte de a da Share!
              </p>

              <button onClick={handleNext} className="w-full bg-[#7c1f31] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#5a1623] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95">
                Următorul Scenariu <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  );
}
