'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { joinClassAction } from '@/app/actions/clase';
import toast from 'react-hot-toast';

export function JoinClassForm({ classId, className }: { classId: string | null, className: string | null }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 5) return;
    
    setLoading(true);
    const result = await joinClassAction(code);
    setLoading(false);

    if (result.success) {
      toast.success('Te-ai înregistrat cu succes în clasă!');
      setCode('');
    } else {
      toast.error(result.error);
    }
  };

  if (classId && className) {
    return (
      <Card className="border-[#1a1a1a]/10 dark:border-white/10 shadow-sm bg-green-50/50 dark:bg-green-900/10">
        <CardContent className="pt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Clasa Ta</p>
              <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-white">{className}</h3>
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500 bg-white dark:bg-[#1a1a1a] px-3 py-1 rounded-full border">
              conectat
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
      <CardHeader className="pb-3">
        <CardDescription className="font-bold uppercase tracking-wider text-xs flex items-center gap-2">
          <Users className="w-4 h-4" />
          Afiliază-te unei clase
        </CardDescription>
        <CardTitle className="text-xl font-bold mt-1 text-[#1a1a1a] dark:text-white">Alătură-te Colegilor</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Introdu codul primit de la profesorul tău pentru a partaja rezultatele și progresul.
        </p>
        <form onSubmit={handleJoin} className="flex gap-2 relative">
          <Input 
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="EX: RO-12X3"
            className="font-mono uppercase tracking-wider"
            maxLength={10}
            disabled={loading}
          />
          <Button type="submit" disabled={loading} className="bg-[#1a1a1a] text-white hover:bg-gray-800 dark:bg-white dark:text-[#1a1a1a] dark:hover:bg-gray-200 shrink-0">
            {loading ? 'Se înscrie...' : 'Alătură-te'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
