'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Clock } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

const HEADLINES = [

  { id: 1, text: "DEZASTRU TOTAL: Guvernul a decis să interzică complet mașinile pe benzină de mâine!", isFake: true, explanation: "Hiperbolă ('DEZASTRU TOTAL') și informație falsă (interzicerea nu se întâmplă 'de mâine')." },
  { id: 2, text: "Banca Națională a menținut dobânda cheie la 7% pentru al treilea trimestru consecutiv.", isFake: false, explanation: "Limbaj neutru, factual, raportând o decizie economică standard." },
  { id: 3, text: "ȘOCANT! Ce au găsit medicii în corpul acestui bărbat te va lăsa fără cuvinte. Click aici!", isFake: true, explanation: "Sintaxă clasică de clickbait ('ȘOCANT!', 'te va lăsa fără cuvinte') pentru a genera curiozitate artificială." },
  { id: 4, text: "Ministerul Educației anunță modificări ale calendarului examenelor de Bacalaureat pentru anul viitor.", isFake: false, explanation: "Informație clară, lipsită de încărcătură emoțională, citând o instituție oficială." },
  { id: 5, text: "Oculta mondială lovește din nou: Cum ne otrăvesc intenționat apa de la robinet!", isFake: true, explanation: "Teorie a conspirației ('Oculta mondială') și apel la frică ('ne otrăvesc intenționat')." },
  { id: 6, text: "Un nou studiu publicat în revista Nature arată o creștere a temperaturilor medii globale.", isFake: false, explanation: "Raportare obiectivă a unui studiu științific dintr-o sursă recunoscută." },
  { id: 7, text: "Nu o să-ți vină să crezi ce a spus acest politician în direct la TV! A distrus complet opoziția!", isFake: true, explanation: "Limbaj senzaționalist ('Nu o să-ți vină să crezi', 'A distrus complet') menit să polarizeze." },
  { id: 8, text: "Echipa națională de fotbal a obținut o remiză, 1-1, în meciul de calificare de aseară.", isFake: false, explanation: "Prezentare simplă și directă a unui rezultat sportiv." },
  { id: 9, text: "TRĂDARE NAȚIONALĂ! Ne-au vândut țara străinilor pentru doi bani! Ieșiți în stradă ACUM!", isFake: true, explanation: "Apel direct la acțiune ('Ieșiți în stradă ACUM!') bazat pe furie și acuzații extreme ('TRĂDARE NAȚIONALĂ')." },
  { id: 10, text: "Compania locală de transport public anunță introducerea a 20 de noi autobuze electrice.", isFake: false, explanation: "Știre locală utilitară, fără elemente de manipulare emoțională." },
  { id: 11, text: "Cercetătorii au descoperit că lămâia vindecă cancerul în 24 de ore, dar marile companii farmaceutice ascund adevărul!", isFake: true, explanation: "Promisiuni de vindecări miraculoase și teorii ale conspirației împotriva 'Big Pharma'." },
  { id: 12, text: "Organizația Mondială a Sănătății a publicat un nou ghid privind consumul de zahăr la copii.", isFake: false, explanation: "Știre de sănătate publică, citând o organizație internațională recunoscută." },
  { id: 13, text: "BREAKING: NASA a confirmat că un asteroid uriaș va lovi Pământul săptămâna viitoare. Autoritățile păstrează tăcerea!", isFake: true, explanation: "Apel la panică ('BREAKING', 'asteroid uriaș') și acuzații de mușamalizare." },
  { id: 14, text: "Sonda spațială Voyager 1 a reluat trimiterea datelor științifice către Pământ după o pauză de câteva luni.", isFake: false, explanation: "Informație tehnică despre o misiune spațială reală, raportată neutru." },
  { id: 15, text: "O celebră actriță de la Hollywood a fost arestată în secret pentru participarea la ritualuri oculte!", isFake: true, explanation: "Zvonuri nefondate despre celebrități și elemente de senzaționalism ocult." },
  { id: 16, text: "Festivalul Internațional de Film de la Cannes și-a anunțat selecția oficială pentru ediția din acest an.", isFake: false, explanation: "Știre culturală standard despre un eveniment internațional major." },
  { id: 17, text: "Banii cash vor fi interziși complet în România de la 1 iulie! Totul va fi controlat digital!", isFake: true, explanation: "Dezinformare economică menită să genereze panică și rezistență față de digitalizare." },
  { id: 18, text: "Parlamentul a adoptat o nouă lege care simplifică procedurile de înmatriculare a vehiculelor.", isFake: false, explanation: "Raportare administrativă despre o schimbare legislativă concretă." },
  { id: 19, text: "Experiment secret în Munții Bucegi: S-a deschis o poartă energetică spre o altă dimensiune!", isFake: true, explanation: "Pseudostiință și mituri locale folosite pentru a genera trafic pe site-uri obscure." },
  { id: 20, text: "O echipă de arheologi a descoperit vestigii dacice inedite în timpul lucrărilor la noua autostradă.", isFake: false, explanation: "Știre arheologică legată de proiecte de infrastructură reale." }
];

const shuffleHeadlines = () => [...HEADLINES].sort(() => Math.random() - 0.5);

export default function SwipeGameView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [cards, setCards] = useState(shuffleHeadlines);
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
    setCards([...HEADLINES].sort(() => Math.random() - 0.5));
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

      <div className="relative w-full aspect-4/3 max-w-md">
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
              className={`absolute inset-0 rounded-3xl shadow-2xl border p-8 flex flex-col justify-center text-center ${
                feedback.isCorrect 
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
                <br/><br/>
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
          className="flex-1 h-20 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 min-h-11"
        >
          <X className="w-6 h-6" /> SUSPECT
        </button>
        <button
          onClick={() => handleSwipe(false)}
          disabled={!!feedback}
          className="flex-1 h-20 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 min-h-11"
        >
          <Check className="w-6 h-6" /> CREDIBIL
        </button>
      </div>
      <p className="text-[#1a1a1a]/50 dark:text-white/50 text-sm mt-6 text-center">
        Apasă SUSPECT dacă titlul folosește manipulare emoțională sau clickbait.<br/>
        Apasă CREDIBIL dacă este o știre factuală, neutră.
      </p>
    </div>
  );
}
