'use client';

import React from 'react';
import { Shield, Clock, Brain, Target, Award, ArrowUpRight, Trophy, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'motion/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ShareProgress } from '@/components/share-progress';
import { HistoricalEvolutionChart } from '@/components/progres/HistoricalEvolutionChart';
import { JoinClassForm } from '@/components/progres/JoinClassForm';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon_name: string;
}

interface UserBadge {
  badge_id: string;
  earned_at: string;
}

interface InteractionData {
  immunityScore: number;
  minutesSaved: number;
  topEnemy: { name: string; count: number } | null;
  streak: { current_streak: number; longest_streak: number; last_activity_date: string | null };
  totalAttempts: number;
  totalLessons: number;
  totalPlatformLessons: number;
  lastActivityDate: string | null;
  lastLessonDate: string | null;
  badges: Badge[];
  userBadges: UserBadge[];
  userName: string;
  avatarUrl: string;
  role: string;
  classId: string | null;
  className: string | null;
  initialScore: number;
  historicalData: { date: string, score: number }[];
}

export function ScutulDigitalView({ data }: { data: InteractionData }) {
  const getBadgeIcon = (name: string) => {
    switch (name) {
      case 'Flame': return <Flame className="w-6 h-6" />;
      case 'ShieldAlert': return <Shield className="w-6 h-6" />;
      default: return <Trophy className="w-6 h-6" />;
    }
  };

  if (data.totalAttempts === 0) {
    return (
      <div className="py-12 space-y-8 max-w-4xl mx-auto px-4 md:px-0 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-[#1a1a1a] p-12 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-lg">
          <Shield className="w-20 h-20 text-[#7c1f31] dark:text-[#ff4d6d] mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-[#1a1a1a] dark:text-white mb-4">Bun venit în centrul de comandă!</h2>
          <p className="text-lg text-[#1a1a1a]/70 dark:text-white/70 mb-8 max-w-xl mx-auto">
            Acesta este Scutul Tău Digital, locul unde îți poți urmări evoluția în lupta împotriva fake news-ului. Încă nu ai înregistrat nicio activitate. Începe acum și îmbunătățește-ți imunitatea cognitivă!
          </p>
          <div className="flex justify-center gap-4">
            <a href="/activitati" className="bg-[#7c1f31] hover:bg-[#5a1623] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md">
              Descoperă Activitățile
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 space-y-8 max-w-4xl mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] dark:text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#7c1f31] dark:text-[#ff4d6d]" />
            Scutul Tău Digital
          </h1>
          <p className="text-[#1a1a1a]/70 dark:text-white/70 text-lg">
            Tabloul tău de bord pentru imunitatea cognitivă și impact.
          </p>
        </div>
        <ShareProgress 
          userName={data.userName} 
          score={data.immunityScore} 
          avatarUrl={data.avatarUrl}
          lessons={data.totalLessons}
          totalLessonsPlatform={data.totalPlatformLessons}
          minutes={data.minutesSaved}
          fallacy={data.topEnemy ? data.topEnemy.name : 'Niciunul'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nivel de Imunitate */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}>
          <Card className="h-full border-[#1a1a1a]/10 dark:border-white/10 shadow-sm bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1a1a] dark:to-[#121212]">
            <CardHeader className="pb-2">
              <CardDescription className="font-bold uppercase tracking-wider text-xs">Nivel de Imunitate</CardDescription>
              <CardTitle className="text-4xl font-black text-green-600 dark:text-green-400">
                {data.immunityScore}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={data.immunityScore} className="h-2 mb-3 bg-gray-200 dark:bg-gray-800" indicatorClassName="bg-green-500" />
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-tight">
                {data.immunityScore > 80 
                  ? "Super! Imun la manipulare! Propagandiștii plâng în colț când văd profilul tău."
                  : "Ești pe drumul cel bun! Antrenează-te zilnic pentru a deveni un adevărat vânător de fake news."}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lecții Finalizate */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}>
          <Card className="h-full border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardDescription className="font-bold uppercase tracking-wider text-xs">Lecții Parcurse</CardDescription>
                <CardTitle className="text-3xl font-bold mt-1 text-[#1a1a1a] dark:text-white flex items-baseline gap-1">
                  {data.totalLessons} <span className="text-lg text-gray-400 font-medium">/ {data.totalPlatformLessons}</span>
                  <span className="text-sm font-normal text-gray-500 ml-1">lecții</span>
                </CardTitle>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  {data.lastLessonDate ? `Ultima lecție: ${new Date(data.lastLessonDate).toLocaleDateString('ro-RO')}` : 'Cunoștințe teoretice acumulate în domeniu.'}
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Serii Zilnice (Daily Streak) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.4, ease: "easeOut" }}>
          <Card className="h-full border-[#1a1a1a]/10 dark:border-white/10 shadow-sm relative overflow-hidden">
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none transition-all duration-500 ${data.streak.current_streak > 0 ? 'bg-orange-500' : 'bg-gray-400'}`}></div>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0 relative z-10">
              <div>
                <CardDescription className="font-bold uppercase tracking-wider text-xs">Serii Zilnice</CardDescription>
                <CardTitle className="text-3xl font-bold mt-1 text-[#1a1a1a] dark:text-white flex items-baseline gap-1">
                  {data.streak.current_streak}
                  <span className="text-sm font-normal text-gray-500 ml-1">zile la rând</span>
                </CardTitle>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner ${data.streak.current_streak > 0 ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                <Flame className={`w-5 h-5 ${data.streak.current_streak > 0 ? 'text-orange-500 fill-orange-500 animate-pulse' : 'text-gray-400'}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-2 relative z-10">
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1.5 font-medium">
                <Trophy className="w-4 h-4 text-yellow-500" /> Record personal: <span className="font-bold text-[#1a1a1a] dark:text-white">{data.streak.longest_streak} zile</span>
              </p>
              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                  <div className="bg-orange-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.min((data.streak.current_streak / (data.streak.longest_streak || 1)) * 100, 100)}%` }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timp Economisit */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}>
          <Card className="h-full border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardDescription className="font-bold uppercase tracking-wider text-xs">Timp Economisit</CardDescription>
                <CardTitle className="text-3xl font-bold mt-1 text-[#1a1a1a] dark:text-white flex items-baseline gap-1">
                  {data.minutesSaved}
                  <span className="text-sm font-normal text-gray-500">minute salvate</span>
                </CardTitle>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Echivalentul timpului pe care nu l-ai pierdut citind manipulări.</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cel Mai Mare Inamic */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }} className="md:col-span-1">
          <Card className={`h-full border-[#1a1a1a]/10 dark:border-white/10 shadow-sm relative overflow-hidden group ${!data.topEnemy ? 'border-dashed bg-gray-50/50 dark:bg-[#1a1a1a]/50' : ''}`}>
            {data.topEnemy && (
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Target className="w-32 h-32" />
              </div>
            )}
            <CardHeader className="pb-2">
              <CardDescription className="font-bold uppercase tracking-wider text-xs">
                {data.topEnemy ? "Cel Mai Mare Inamic Învins" : "Inamic Neidentificat"}
              </CardDescription>
              <CardTitle className={`text-xl font-bold mt-2 leading-snug ${data.topEnemy ? 'text-[#7c1f31] dark:text-[#ff4d6d]' : 'text-gray-500'}`}>
                {data.topEnemy ? data.topEnemy.name : "Nicio tehnică învinsă... încă"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {data.topEnemy ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" /> Ai identificat această tehnică de manipulare de <span className="font-bold text-[#1a1a1a] dark:text-white">{data.topEnemy.count}</span> ori corect.
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Încă nu ai învins nicio tehnică de manipulare. Joacă în Groapa cu Nisip pentru a-ți antrena scutul!
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Join Class form (for students) */}
        {data.role === 'student' && (
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }} className="md:col-span-1">
              <JoinClassForm classId={data.classId} className={data.className} />
           </motion.div>
        )}

        {/* Historical Evolution Tracking */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }} className="md:col-span-2">
           <HistoricalEvolutionChart initialScore={data.initialScore} data={data.historicalData} />
        </motion.div>
      </div>

      {/* Badges Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }} className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-[#1a1a1a] dark:text-white">
          <Trophy className="w-5 h-5 text-yellow-500" /> Insignele Tale
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <TooltipProvider>
            {data.badges.map(badge => {
              const isEarned = data.userBadges.find(ub => ub.badge_id === badge.id);

              return (
                <Tooltip key={badge.id}>
                  <TooltipTrigger asChild>
                    <div className={`flex flex-col items-center gap-2 p-4 text-center rounded-2xl border transition-all ${
                      isEarned 
                      ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/10' 
                      : 'border-gray-100 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-800 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
                    }`}>
                      <div className={`p-3 rounded-full flex items-center justify-center ${isEarned ? 'bg-[#7c1f31] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                        {getBadgeIcon(badge.icon_name)}
                      </div>
                      <div>
                        <p className="font-bold text-xs leading-tight text-[#1a1a1a] dark:text-white">{badge.name}</p>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.description}</p>
                    {isEarned && <p className="text-[10px] text-yellow-600 dark:text-yellow-400 mt-1">Obținut la: {new Date(isEarned.earned_at).toLocaleDateString('ro-RO')}</p>}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
        {data.badges.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Trophy className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-3" />
            <p className="text-gray-500 font-medium">Urmează să adăugăm insigne noi în curând!</p>
            <p className="text-sm text-gray-400 mt-1">Sistemul de recompense vizuale este în curs de dezvoltare.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
