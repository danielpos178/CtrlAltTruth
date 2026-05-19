'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const timerInit = setTimeout(() => {
      const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      setIsIOS(isIosDevice);
  
      const isInStandaloneMode = () => 
        ('standalone' in window.navigator) && (window.navigator as any).standalone;
      
      // Check if already installed
      if (window.matchMedia('(display-mode: standalone)').matches || isInStandaloneMode()) {
        return;
      }
  
      if (isIosDevice && !isInStandaloneMode()) {
        setShowPrompt(true);
      }
    }, 3000);

    const handler = (e: Event) => {
      e.preventDefault();
      setTimeout(() => {
        setDeferredPrompt(e);
        setShowPrompt(true);
      }, 0);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timerInit);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 100 }}
           transition={{ type: 'spring', damping: 25, stiffness: 300 }}
           className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-[#1a1a1a] border border-[#1a1a1a]/10 dark:border-white/10 shadow-2xl rounded-2xl p-6 z-50 overflow-hidden will-change-transform"
        >
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#7c1f31]/10 dark:bg-[#7c1f31]/20 rounded-xl flex items-center justify-center shrink-0">
              <Download className="w-6 h-6 text-[#7c1f31] dark:text-[#ff4d6d]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1a1a1a] dark:text-white text-lg">Instalează aplicația</h3>
              <p className="text-sm text-[#1a1a1a]/70 dark:text-white/70 mt-1 mb-4">
                Instalează aplicația pe ecranul tău pentru acces rapid și offline!
              </p>
              
              {isIOS && !deferredPrompt ? (
                <div className="text-xs text-[#1a1a1a]/60 dark:text-white/60 bg-[#1a1a1a]/5 dark:bg-white/5 p-3 rounded-xl flex flex-col gap-2">
                  <p className="flex items-center gap-2">1. Apasă pe butonul de Partajare (Share) <Share className="w-4 h-4 inline" /></p>
                  <p>2. Alege &quot;Adaugă pe ecranul principal&quot;</p>
                </div>
              ) : (
                <Button 
                  onClick={handleInstallClick}
                  className="w-full bg-[#7c1f31] hover:bg-[#5a1623] text-white rounded-xl h-10 font-bold"
                >
                  Instalează Acum
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
