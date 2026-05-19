'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, Users, LogIn, Loader2, BookOpen } from 'lucide-react';
import { joinClassAction } from '@/app/actions/clase';
import toast from 'react-hot-toast';

export function StudentClassDashboardClient({ currentClass, publicClasses }: { currentClass: any, publicClasses: any[] }) {
  const [classCode, setClassCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [joiningId, setJoiningId] = useState<string | null>(null);

  const handleJoinByCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classCode) return;
    setLoading(true);
    const result = await joinClassAction(classCode);
    setLoading(false);
    if (result.success) {
      toast.success('Te-ai înscris în clasă cu succes!');
      setClassCode('');
    } else {
      toast.error(result.error);
    }
  };

  const handleJoin = async (code: string, classId: string) => {
    setJoiningId(classId);
    const result = await joinClassAction(code);
    setJoiningId(null);
    if (result.success) {
      toast.success('Te-ai înscris în clasă cu succes!');
    } else {
      toast.error(result.error);
    }
  };

  const currentDisplayName = currentClass ? currentClass.name.replace(' [PRIVAT]', '') : '';

  return (
    <div className="space-y-8">
      {/* Current Class */}
      <Card className="border-[#1a1a1a]/10 dark:border-white/10 shadow-sm bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/10 dark:to-[#1a1a1a]">
        <CardHeader>
          <CardDescription className="font-bold uppercase tracking-wider text-xs">Clasa Curentă</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            {currentClass ? currentDisplayName : 'Nu ești înscris în nicio clasă'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentClass ? (
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#1a1a1a] rounded-xl border border-indigo-100 dark:border-indigo-900/30">
               <div>
                  <p className="text-sm font-medium text-gray-500">Cod Acces:</p>
                  <p className="text-xl font-mono font-black text-indigo-600 dark:text-indigo-400">{currentClass.code}</p>
               </div>
               <div className="ml-auto flex items-center gap-2 text-sm text-gray-500 bg-gray-50 dark:bg-[#111] px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800">
                  <BookOpen className="w-4 h-4" /> Activat
               </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Alătură-te unei clasă pentru a te întrece alături de colegii tăi și pentru a-i arăta profesorului progresul tău.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Join via Code */}
        <Card className="border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
          <CardHeader>
             <CardTitle className="text-lg font-bold">Cod de Acces</CardTitle>
             <CardDescription>Introdu codul furnizat de profesorul tău.</CardDescription>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleJoinByCode} className="flex gap-2">
               <Input 
                 placeholder="Ex: AB12CD" 
                 value={classCode}
                 onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                 className="font-mono text-center"
               />
               <Button type="submit" disabled={loading || !classCode} className="bg-[#7c1f31] hover:bg-[#5a1622] text-white dark:bg-[#ff4d6d] dark:hover:bg-[#d63d59] dark:text-black font-bold whitespace-nowrap">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Înscrie-mă'}
               </Button>
             </form>
          </CardContent>
        </Card>

        {/* Public Classes */}
        <Card className="border-[#1a1a1a]/10 dark:border-white/10 shadow-sm md:col-span-2">
           <CardHeader>
              <CardTitle className="text-lg font-bold">Clase Publice</CardTitle>
              <CardDescription>Explorați și alăturați-vă claselor disponibile pe platformă.</CardDescription>
           </CardHeader>
           <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {publicClasses.map(cls => (
                 <div key={cls.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] flex flex-col gap-3 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-colors shadow-sm">
                    <div className="flex items-start justify-between">
                       <h3 className="font-bold text-lg line-clamp-1">{cls.name.replace(' [PRIVAT]', '')}</h3>
                       <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs px-2 py-1 rounded-md font-mono font-bold tracking-wider">
                          {cls.code}
                       </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 gap-1.5 mt-auto">
                       <Users className="w-4 h-4" /> {cls.student_count || 0} elevi
                    </div>
                    <Button 
                       disabled={joiningId === cls.id || currentClass?.id === cls.id} 
                       onClick={() => handleJoin(cls.code, cls.id)}
                       variant="outline"
                       className="w-full mt-2 font-bold"
                    >
                       {joiningId === cls.id ? <Loader2 className="w-4 h-4 animate-spin" /> : (currentClass?.id === cls.id ? 'Înscris' : 'Alătură-te')}
                    </Button>
                 </div>
              ))}
              {publicClasses.length === 0 && (
                 <div className="col-span-full py-8 text-center text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                    Nu există nicio clasă pe platformă momentan.
                 </div>
              )}
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
