'use client';

import React, { useState } from 'react';
import { elevateToAdmin } from './actions';
import { Lock, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/components/providers/AuthProvider';

export default function AccessAdminPage() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { session } = useAuth();

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    try {
      if (session?.access_token) {
        formData.append('accessToken', session.access_token);
      }
      const result = await elevateToAdmin(formData);
      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success('Acces Administrator acordat cu succes!');
        // Reload to update AuthContext state
        window.location.href = '/admin';
      }
    } catch (e) {
      toast.error('A apărut o eroare.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#1a1a1a] border border-[#1a1a1a]/10 dark:border-white/10 rounded-3xl p-8 shadow-sm text-center">
        <div className="bg-red-50 dark:bg-red-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">Elevare Privilegii</h1>
        <p className="text-[#1a1a1a]/60 dark:text-white/60 mb-8 text-sm">
          Introduceți parola secretă pentru a obține drepturi de administrare pe platformă.
        </p>

        <form action={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-2">
            <label htmlFor="secretKey" className="block text-sm font-bold text-[#1a1a1a] dark:text-white">
              Parolă Secretă
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="secretKey"
                name="secretKey"
                required
                placeholder="Introdu parola..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7c1f31] dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 bg-[#1a1a1a] hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin"></div>
            ) : (
              'Autentificare Admin'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
