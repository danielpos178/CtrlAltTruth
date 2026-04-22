'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, BarChart3, Globe, Smartphone } from 'lucide-react';

export default function LandingView() {
  const router = useRouter();
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [dots, setDots] = useState(Array(100).fill('neutral'));

  // Disinformation Spread Simulation
  useEffect(() => {
    // Initialize one red dot in the center
    const initialDots = Array(100).fill('neutral');
    initialDots[44] = 'infected';
    setDots(initialDots);

    let interval: NodeJS.Timeout;
    let isResetting = false;

    const runInfection = () => {
      if (isResetting) return;

      setDots(currentDots => {
        const nextDots = [...currentDots];
        let changed = false;
        
        for (let i = 0; i < 100; i++) {
          if (currentDots[i] === 'infected') {
            // Infect neighbors (up, down, left, right) with some probability
            const neighbors = [i - 10, i + 10, i - 1, i + 1];
            neighbors.forEach(n => {
              // Ensure neighbor is within bounds and in the same row/column appropriately
              if (n >= 0 && n < 100 && currentDots[n] === 'neutral' && Math.random() > 0.7) {
                // Prevent wrapping around rows
                if (Math.abs((i % 10) - (n % 10)) <= 1) {
                  nextDots[n] = 'infected';
                  changed = true;
                }
              }
            });
          }
        }
        
        // Reset if fully infected
        if (!nextDots.includes('neutral') && !isResetting) {
          isResetting = true;
          setTimeout(() => {
            const resetDots = Array(100).fill('neutral');
            resetDots[44] = 'infected';
            setDots(resetDots);
            isResetting = false;
          }, 2000);
        }
        
        return changed ? nextDots : currentDots;
      });
    };

    interval = setInterval(runInfection, 500);

    return () => clearInterval(interval);
  }, []);

  // Trigger stats animation after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setStatsAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col space-y-24 py-10"
    >
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-10">
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#1a1a1a] dark:text-white">
            Ctrl+Alt+Truth
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-[#7c1f31] dark:text-[#ff4d6d]">
            Democratizăm adevărul. Protejăm cuvântul scris de manipularea digitală.
          </p>
          <p className="text-lg md:text-xl text-[#1a1a1a]/80 dark:text-white/80 leading-relaxed max-w-3xl mx-auto">
            În era inteligenței artificiale, dezinformarea se propagă la secundă. Antrenează-ți mintea să recunoască propaganda, manipularea emoțională și conținutul fals prin analizatorul nostru interactiv.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => router.push('/analyzer')}
            className="inline-flex items-center justify-center rounded-2xl min-h-[44px] text-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c1f31] bg-[#7c1f31] text-white hover:bg-[#5a1623] hover:shadow-lg hover:-translate-y-1 h-16 px-10 gap-3"
          >
            Intră în Laboratorul de Adevăr
            <ArrowRight className="w-6 h-6" />
          </button>
          <button 
            onClick={() => router.push('/swipegame')}
            className="inline-flex items-center justify-center rounded-2xl min-h-[44px] text-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] dark:focus-visible:ring-white bg-white dark:bg-transparent border-2 border-[#1a1a1a] dark:border-white text-[#1a1a1a] dark:text-white hover:bg-[#1a1a1a] dark:hover:bg-white hover:text-white dark:hover:text-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 h-16 px-10 gap-3"
          >
            Joacă Swipe Game
          </button>
        </div>
      </div>

      {/* Purpose Section with Simulation */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-10 md:p-16 border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div className="bg-[#7c1f31]/10 p-4 rounded-2xl inline-block mb-2">
            <ShieldCheck className="w-10 h-10 text-[#7c1f31] dark:text-[#ff4d6d]" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] dark:text-white">Misiunea Noastră</h3>
          <p className="text-xl text-[#1a1a1a]/80 dark:text-white/80 leading-relaxed">
            Trăim în era în care inteligența artificială generativă poate crea mii de articole false, perfect scrise, într-o singură secundă. Algoritmii rețelelor sociale amplifică acest conținut pentru că generează reacții puternice. În acest mediu toxic, <strong>gândirea critică este singurul tău firewall</strong>. Ctrl+Alt+Truth te învață cum să detectezi tiparele manipulării înainte de a fi influențat.
          </p>
        </div>
        
        <div className="w-full lg:w-1/3 bg-[#e7edeb] dark:bg-white/5 p-6 rounded-2xl border border-[#1a1a1a]/10 dark:border-white/10">
          <h4 className="font-bold text-[#1a1a1a] dark:text-white mb-4 text-center">Simularea Răspândirii Dezinformării</h4>
          <div className="grid grid-cols-10 gap-1 aspect-square">
            {dots.map((state, i) => (
              <div 
                key={i} 
                className={`w-full h-full rounded-full transition-colors duration-300 ${state === 'infected' ? 'bg-[#7c1f31] dark:bg-[#ff4d6d] shadow-[0_0_8px_rgba(124,31,49,0.6)]' : 'bg-gray-300 dark:bg-gray-700'}`}
              />
            ))}
          </div>
          <p className="text-sm text-center text-[#1a1a1a]/60 dark:text-white/60 mt-4">O singură știre falsă &quot;infectează&quot; exponențial rețeaua.</p>
        </div>
      </div>

      {/* Data Section */}
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] dark:text-white">Radiografia Dezinformării în România</h3>
          <p className="text-xl text-[#7c1f31] dark:text-[#ff4d6d] font-medium">De ce suntem extrem de vulnerabili</p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-md flex flex-col items-center text-center space-y-6">
            <div className="bg-[#7c1f31]/10 p-4 rounded-full">
              <BarChart3 className="w-8 h-8 text-[#7c1f31] dark:text-[#ff4d6d]" />
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm font-bold text-[#1a1a1a] dark:text-white">
                <span>Competențe Digitale</span>
                <span>28%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                <div className="bg-[#7c1f31] dark:bg-[#ff4d6d] h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: statsAnimated ? '28%' : '0%' }}></div>
              </div>
            </div>
            <p className="text-[#1a1a1a]/80 dark:text-white/80 text-lg font-medium">
              Doar 28% dintre români au competențe digitale de bază (Sursa: DESI, ultimul loc în UE).
            </p>
          </div>

          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-md flex flex-col items-center text-center space-y-6">
            <div className="bg-[#7c1f31]/10 p-4 rounded-full">
              <Globe className="w-8 h-8 text-[#7c1f31] dark:text-[#ff4d6d]" />
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm font-bold text-[#1a1a1a] dark:text-white">
                <span>Educație Media (Locul 40/41)</span>
                <span>97% Vulnerabilitate</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                <div className="bg-[#7c1f31] dark:bg-[#ff4d6d] h-3 rounded-full transition-all duration-1000 ease-out delay-300" style={{ width: statsAnimated ? '97%' : '0%' }}></div>
              </div>
            </div>
            <p className="text-[#1a1a1a]/80 dark:text-white/80 text-lg font-medium">
              Locul 40 din 41 în Europa la Indexul Educației Media (Sursa: OSI Sofia).
            </p>
          </div>

          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-md flex flex-col items-center text-center space-y-6">
            <div className="bg-[#7c1f31]/10 p-4 rounded-full">
              <Smartphone className="w-8 h-8 text-[#7c1f31] dark:text-[#ff4d6d]" />
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm font-bold text-[#1a1a1a] dark:text-white">
                <span>Informare exclusivă Social Media</span>
                <span>70%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                <div className="bg-[#7c1f31] dark:bg-[#ff4d6d] h-3 rounded-full transition-all duration-1000 ease-out delay-500" style={{ width: statsAnimated ? '70%' : '0%' }}></div>
              </div>
            </div>
            <p className="text-[#1a1a1a]/80 dark:text-white/80 text-lg font-medium">
              Peste 70% din tinerii din mediul urban își extrag știrile zilnice exclusiv de pe feed-uri algoritmice (TikTok, Instagram), vulnerabile la campanii de astroturfing.
            </p>
          </div>
        </div>
      </div>

      {/* Cum funcționează analizatorul? */}
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] dark:text-white">Cum funcționează Laboratorul de Adevăr?</h3>
          <p className="text-xl text-[#7c1f31] dark:text-[#ff4d6d] font-medium">3 pași simpli pentru a-ți antrena mintea</p>
        </div>
        
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 relative">
          {/* Optional connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-[#7c1f31]/20 dark:bg-[#ff4d6d]/20 -z-10 -translate-y-1/2"></div>
          
          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-md flex flex-col items-center text-center space-y-4 relative z-0">
            <div className="w-12 h-12 rounded-full bg-[#7c1f31] dark:bg-[#ff4d6d] text-white flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">1</div>
            <h4 className="text-2xl font-bold text-[#1a1a1a] dark:text-white">Alege un subiect</h4>
            <p className="text-[#1a1a1a]/80 dark:text-white/80 text-lg">
              Selectează o temă de actualitate. AI-ul nostru va genera pe loc un articol manipulator, plin de bias-uri și limbaj toxic.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-md flex flex-col items-center text-center space-y-4 relative z-0">
            <div className="w-12 h-12 rounded-full bg-[#7c1f31] dark:bg-[#ff4d6d] text-white flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">2</div>
            <h4 className="text-2xl font-bold text-[#1a1a1a] dark:text-white">Analizează textul</h4>
            <p className="text-[#1a1a1a]/80 dark:text-white/80 text-lg">
              Citește cu atenție și dă click pe cuvintele care ți se par exagerate, menite să provoace frică sau furie. Ai 15 secunde!
            </p>
          </div>

          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-md flex flex-col items-center text-center space-y-4 relative z-0">
            <div className="w-12 h-12 rounded-full bg-[#7c1f31] dark:bg-[#ff4d6d] text-white flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">3</div>
            <h4 className="text-2xl font-bold text-[#1a1a1a] dark:text-white">Înțelege manipularea</h4>
            <p className="text-[#1a1a1a]/80 dark:text-white/80 text-lg">
              Verifică rezultatele. Vezi ce ai ratat, analizează radarul emoțional și citește explicația detaliată a AI-ului.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
