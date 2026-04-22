'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldAlert, Mail, Lock, AlertCircle, ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Parolele nu se potrivesc.');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      // Optional: Auto redirect after few seconds or let them click login
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'A apărut o eroare la înregistrare.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-xl text-center">
           <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
             <ShieldAlert className="w-10 h-10 text-green-600 dark:text-green-400" />
           </div>
           <h2 className="text-3xl font-extrabold text-[#1a1a1a] dark:text-white">
            Cont creat cu succes!
          </h2>
          <p className="mt-2 text-[#1a1a1a]/80 dark:text-white/80">
            Te redirecționăm către pagina de login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-xl">
        <div className="flex flex-col items-center">
          <div className="bg-[#7c1f31] p-3 rounded-2xl shadow-md mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-[#1a1a1a] dark:text-white">
            Creează cont
          </h2>
          <p className="mt-2 text-center text-sm text-[#1a1a1a]/60 dark:text-white/60">
            Alătură-te luptei împotriva dezinformării
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c1f31] focus:border-[#7c1f31] sm:text-sm transition-colors"
                  placeholder="nume@exemplu.ro"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">
                Parolă
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c1f31] focus:border-[#7c1f31] sm:text-sm transition-colors"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">
                Confirmă parola
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c1f31] focus:border-[#7c1f31] sm:text-sm transition-colors"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#7c1f31] hover:bg-[#5a1623] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c1f31] transition-all overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                'Se încarcă...'
              ) : (
                <span className="flex items-center gap-2">
                  Înregistrare
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#1a1a1a]/60 dark:text-white/60">
            Ai deja cont?{' '}
            <Link href="/login" className="font-medium text-[#7c1f31] dark:text-[#ff4d6d] hover:underline">
              Autentifică-te
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
