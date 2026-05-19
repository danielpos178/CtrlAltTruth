'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, AlertTriangle, Loader2 } from 'lucide-react';
import { createClassAction } from '@/app/actions/clase';
import toast from 'react-hot-toast';

export function CreateClassFormClient() {
  const [className, setClassName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!className || className.length < 3) {
        toast.error('Numele clasei trebuie să aibă minim 3 caractere.');
        return;
    }
    
    setLoading(true);
    const result = await createClassAction(className, isPublic);
    setLoading(false);

    if (result.success) {
      toast.success('Clasa a fost creată cu succes!');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Card className="border-[#1a1a1a]/10 dark:border-white/10 shadow-sm text-center py-10 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">Creează o nouă clasă</CardTitle>
        <CardDescription className="text-gray-500">
          Creează o clasă pentru a-ți invita elevii și a le monitoriza progresul.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreate} className="flex flex-col gap-4 mt-2">
          <Input 
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Ex: Clasa a 10-a B"
            disabled={loading}
            className="text-center font-bold"
          />
          <div className="flex items-center justify-between px-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-3 border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm font-bold">{isPublic ? 'Vizibilitate: Publică' : 'Vizibilitate: Privată'}</span>
              <span className="text-xs text-gray-500 text-left">{isPublic ? 'Orice elev o poate găsi în lista de clase.' : 'Accesibilă doar folosind codul de acces.'}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isPublic ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublic ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <Button type="submit" disabled={loading} className="bg-[#7c1f31] hover:bg-[#9e2a3f] text-white dark:bg-[#ff4d6d] dark:hover:bg-[#ff708a] dark:text-[#1a1a1a] h-12">
            {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <GraduationCap className="w-5 h-5 mr-2" />}
            {loading ? 'Se generează...' : 'Generează ClasĂ'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
