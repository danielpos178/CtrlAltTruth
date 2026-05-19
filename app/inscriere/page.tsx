'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  AlertCircle, 
  ArrowRight, 
  UserPlus,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

import { supabase } from '@/lib/supabase';
import { registerSchema, type RegisterFormValues } from '@/lib/schemas/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

import { signUpAction } from '@/app/actions/auth';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [strength, setStrength] = useState(0);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
    },
    mode: 'onChange',
  });

  const watchPassword = form.watch('password');

  useEffect(() => {
    const criteria = [
      { label: 'Cel puțin 8 caractere', met: watchPassword.length >= 8 },
      { label: 'Conține o literă mare', met: /[A-Z]/.test(watchPassword) },
      { label: 'Conține un număr', met: /[0-9]/.test(watchPassword) },
      { label: 'Conține un caracter special', met: /[@$!%*#?&]/.test(watchPassword) },
    ];
    const metCount = criteria.filter(c => c.met).length;
    setStrength((metCount / criteria.length) * 100);
  }, [watchPassword]);

  const strengthCriteria = [
    { label: 'Cel puțin 8 caractere', met: watchPassword.length >= 8 },
    { label: 'Conține o literă mare', met: /[A-Z]/.test(watchPassword) },
    { label: 'Conține un număr', met: /[0-9]/.test(watchPassword) },
    { label: 'Conține un caracter special', met: /[@$!%*#?&]/.test(watchPassword) },
  ];

  const getStrengthColor = () => {
    const metCount = strengthCriteria.filter(c => c.met).length;
    if (metCount === 0) return 'bg-muted';
    if (metCount === 1) return 'bg-red-500';
    if (metCount <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    const metCount = strengthCriteria.filter(c => c.met).length;
    if (metCount === 0) return '';
    if (metCount === 1) return 'Slabă';
    if (metCount <= 3) return 'Medie';
    return 'Puternică';
  };

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const result = await signUpAction(values);
      if (!result.success) throw new Error(result.error);
      setIsSuccess(true);
      toast.success('Cont creat cu succes!');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      toast.error(err.message || 'A apărut o eroare la înregistrare.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8 bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-xl text-center"
        >
           <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
             <ShieldAlert className="w-10 h-10 text-green-600 dark:text-green-400" />
           </div>
           <h2 className="text-3xl font-extrabold text-[#1a1a1a] dark:text-white">
            Cont creat cu succes!
          </h2>
          <p className="mt-2 text-[#1a1a1a]/80 dark:text-white/80">
            Te redirecționăm către pagina de login în câteva secunde...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-[#1a1a1a]/10 dark:border-white/10 shadow-xl"
      >
        <div className="flex flex-col items-center">
          <div className="bg-[#7c1f31] p-3 rounded-2xl shadow-md mb-4 text-white">
            <UserPlus className="w-8 h-8" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-[#1a1a1a] dark:text-white">
            Creează cont
          </h2>
          <p className="mt-2 text-center text-sm text-[#1a1a1a]/60 dark:text-white/60">
            Alătură-te comunității și învață să identifici dezinformarea
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tip Cont</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-xl flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="student" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">
                            Cont Elev
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-xl flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="profesor" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">
                            Cont Profesor
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          placeholder="nume@exemplu.ro" 
                          className="pl-10 h-12 rounded-xl"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parolă</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••" 
                          className="pl-10 pr-10 h-12 rounded-xl"
                          {...field} 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <AnimatePresence>
                      {watchPassword && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 pt-2"
                        >
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500 font-medium">Putere parolă:</span>
                              <span className={cn("font-bold", {
                                "text-red-500": strength <= 25,
                                "text-yellow-500": strength > 25 && strength <= 75,
                                "text-green-500": strength > 75,
                              })}>
                                {getStrengthLabel()}
                              </span>
                            </div>
                            <Progress value={strength} className="h-1.5" indicatorClassName={getStrengthColor()} />
                          </div>
                          
                          <ul className="grid grid-cols-1 gap-1.5 pt-1">
                            {strengthCriteria.map((criterion, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-xs">
                                {criterion.met ? (
                                  <Check className="w-3.5 h-3.5 text-green-500" />
                                ) : (
                                  <X className="w-3.5 h-3.5 text-red-400" />
                                )}
                                <span className={cn(criterion.met ? "text-green-600 dark:text-green-400" : "text-gray-400")}>
                                  {criterion.label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmă parola</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••" 
                          className="pl-10 pr-10 h-12 rounded-xl"
                          {...field} 
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-[#7c1f31] hover:bg-[#5a1623] text-white font-bold transition-all group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Se încarcă...
                </>
              ) : (
                <span className="flex items-center gap-2">
                  Înregistrare
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#1a1a1a]/60 dark:text-white/60">
            Ai deja cont?{' '}
            <Link href="/login" className="font-medium text-[#7c1f31] dark:text-[#ff4d6d] hover:underline">
              Autentifică-te
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
