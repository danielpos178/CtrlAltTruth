'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Copy, AlertCircle, BarChart3, Trophy, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

export function TeacherClassDashboardClient({ 
  classData, 
  studentsCount, 
  classStruggles,
  lessonsProgressStats = [],
  highestSwipeScores = []
}: { 
  classData: any, 
  studentsCount: number, 
  classStruggles: {name: string, count: number}[],
  lessonsProgressStats?: {name: string, lessonsCount: number}[],
  highestSwipeScores?: {name: string, score: number}[]
}) {
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(classData.code);
    toast.success('Codul clasei a fost copiat în clipboard!');
  };

  const displayName = classData.name.replace(' [PRIVAT]', '');
  const isPrivate = classData.name.includes('[PRIVAT]');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Card className="col-span-1 border-[#1a1a1a]/10 dark:border-white/10 shadow-sm bg-indigo-50/50 dark:bg-indigo-900/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription className="font-bold uppercase tracking-wider text-xs">Informații ClasĂ</CardDescription>
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${isPrivate ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'}`}>
              {isPrivate ? 'Privată' : 'Publică'}
            </span>
          </div>
          <CardTitle className="text-2xl font-bold">{displayName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-xl border flex justify-between items-center bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1a1a] dark:to-[#121212]">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Cod de Acces Elevi</p>
              <p className="text-2xl font-mono font-black text-indigo-600 dark:text-indigo-400 tracking-widest">{classData.code}</p>
            </div>
            <button 
              onClick={handleCopyCode}
              title="Copiază Codul"
              className="p-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
               <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-black text-[#1a1a1a] dark:text-white leading-none">{studentsCount}</p>
              <p className="text-sm font-medium text-gray-500">Elevi Înscriși</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
        <CardHeader>
          <CardDescription className="font-bold uppercase tracking-wider text-xs flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Vulnerabilități Identificate
          </CardDescription>
          <CardTitle className="text-xl font-bold">La ce erori logice au dificultăți elevii?</CardTitle>
        </CardHeader>
        <CardContent>
          {classStruggles.length === 0 ? (
             <div className="h-48 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-800">
               <AlertCircle className="w-8 h-8 text-gray-400 mb-2" />
               <p className="text-gray-500 font-medium text-sm">Nu există suficiente date din partea elevilor.</p>
               <p className="text-gray-400 text-xs mt-1">Roagă-i să rezolve provocări în Groapa cu Nisip.</p>
             </div>
          ) : (
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classStruggles} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="currentColor" className="text-gray-200 dark:text-gray-800" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-600 dark:text-gray-400 font-medium" axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#ff4d6d" radius={[0, 4, 4, 0]} barSize={24} name="Greșeli" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-1 border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
        <CardHeader>
           <CardDescription className="font-bold uppercase tracking-wider text-xs flex items-center gap-2 text-orange-600 dark:text-orange-400">
             <Trophy className="w-4 h-4" />
             Top Scoruri
           </CardDescription>
           <CardTitle className="text-lg font-bold">Top Scor Swipe Game</CardTitle>
        </CardHeader>
        <CardContent>
          {highestSwipeScores.length === 0 ? (
             <div className="py-8 text-center border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-800 text-sm text-gray-500">
                Niciun elev nu a jucat încă.
             </div>
          ) : (
             <div className="space-y-4">
               {highestSwipeScores.map((score, i) => (
                 <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                    <span className="font-bold">{score.name}</span>
                    <span className="font-mono text-orange-600 dark:text-orange-400 font-black">{score.score} pct</span>
                 </div>
               ))}
             </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2 border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
        <CardHeader>
           <CardDescription className="font-bold uppercase tracking-wider text-xs flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
             <BookOpen className="w-4 h-4" />
             Evoluție Învățare
           </CardDescription>
           <CardTitle className="text-lg font-bold">Lecții Parcurse (Top Elevi)</CardTitle>
        </CardHeader>
        <CardContent>
           {lessonsProgressStats.length === 0 ? (
             <div className="py-8 text-center border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-800 text-sm text-gray-500">
                Nicio lecție parcursă de elevii tăi deocamdată.
             </div>
           ) : (
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lessonsProgressStats} layout="horizontal" margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-gray-800" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-600 dark:text-gray-400 font-medium" axisLine={false} tickLine={false} />
                  <YAxis type="number" hide />
                  <RechartsTooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="lessonsCount" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={32} name="Lecții Parcurse" />
                </BarChart>
              </ResponsiveContainer>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
