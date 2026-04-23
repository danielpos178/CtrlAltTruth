// Licensed under the GNU AGPL-3.0-only.
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Info, Check } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  targetId?: string;
  position: 'top' | 'bottom' | 'center';
}

interface TutorialOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  steps: TutorialStep[];
}

export default function TutorialOverlay({ isOpen, onClose, steps }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentStep(0);
      setIsCompleting(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleting(true);
      setTimeout(() => {
        onClose();
        setIsCompleting(false);
      }, 1200);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div className="bg-[#7c1f31]/10 p-3 rounded-2xl">
                <Info className="w-6 h-6 text-[#7c1f31] dark:text-[#ff4d6d]" />
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                aria-label="Închide tutorialul"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-lg text-[#1a1a1a]/70 dark:text-white/70 leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex gap-1.5">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-[#7c1f31]' : 'w-2 bg-gray-200 dark:bg-white/10'
                      }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={isCompleting}
                className={`inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg min-h-[44px] ${isCompleting
                  ? 'bg-green-600 shadow-green-600/20'
                  : 'bg-[#7c1f31] hover:bg-[#5a1623] shadow-[#7c1f31]/20'
                  }`}
              >
                {currentStep === steps.length - 1 ? (
                  isCompleting ? (
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <span>Finalizat</span>
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
                      >
                        <Check className="w-5 h-5 flex-shrink-0" strokeWidth={3} />
                      </motion.div>
                    </motion.div>
                  ) : (
                    'Am înțeles'
                  )
                ) : (
                  <>
                    Continuă
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
