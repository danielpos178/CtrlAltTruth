'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Save, AlertCircle } from 'lucide-react';
import { createFallacy, createFallacyChallenge, updateFallacy, updateFallacyChallenge } from '../actions';
import { fallacySchema, fallacyChallengeSchema } from '../schemas';

export function FallacyForm({ editingFallacy, onCancelEdit }: { editingFallacy?: any, onCancelEdit?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof fallacySchema>>({
    resolver: zodResolver(fallacySchema),
  });

  useEffect(() => {
    if (editingFallacy) {
      reset({
        name: editingFallacy.name,
        definition: editingFallacy.definition,
        example: editingFallacy.example
      });
    } else {
      reset({
        name: '',
        definition: '',
        example: ''
      });
    }
  }, [editingFallacy, reset]);

  const onSubmit = async (data: z.infer<typeof fallacySchema>) => {
    setIsSubmitting(true);
    let result;
    if (editingFallacy) {
      result = await updateFallacy(editingFallacy.id, data);
    } else {
      result = await createFallacy(data);
    }
    setIsSubmitting(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(editingFallacy ? 'Specificația a fost actualizată!' : 'Eroarea logică a fost adăugată!');
      if (!editingFallacy) reset();
      if (onCancelEdit) onCancelEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-white flex items-center gap-2">
          {editingFallacy ? 'Editează Categoria' : 'Adaugă Categorie'}
        </h2>
        {editingFallacy && onCancelEdit && (
          <button type="button" onClick={onCancelEdit} className="text-xs text-gray-400 hover:text-gray-600 underline">Anulează</button>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Nume Eroare (ex: Ad Hominem)</label>
          <input 
            {...register('name')}
            className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c1f31] focus:ring-1 focus:ring-[#7c1f31] transition-all text-[#1a1a1a] dark:text-white font-medium"
            placeholder="Numele erorii logice..."
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Definiție</label>
          <textarea 
            {...register('definition')}
            rows={3}
            className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c1f31] focus:ring-1 focus:ring-[#7c1f31] transition-all resize-none text-[#1a1a1a] dark:text-white font-medium"
            placeholder="Explică ce înseamnă această eroare..."
          />
          {errors.definition && <p className="text-red-500 text-xs mt-1 font-medium">{errors.definition.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Exemplu Concret</label>
          <textarea 
            {...register('example')}
            rows={2}
            className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c1f31] focus:ring-1 focus:ring-[#7c1f31] transition-all resize-none text-[#1a1a1a] dark:text-white font-medium"
            placeholder="ex: Dacă nu mă asculți pe mine, clar ești cu ei..."
          />
          {errors.example && <p className="text-red-500 text-xs mt-1 font-medium">{errors.example.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#7c1f31] dark:hover:bg-[#ff4d6d] dark:hover:text-white transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Se salvează...' : 'Salvează Categoria'}
        </button>
      </div>
    </form>
  );
}

export function FallacyChallengeForm({ fallacies, editingChallenge, onCancelEdit }: { fallacies: any[], editingChallenge?: any, onCancelEdit?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.input<typeof fallacyChallengeSchema>>({
    resolver: zodResolver(fallacyChallengeSchema),
  });

  useEffect(() => {
    if (editingChallenge) {
      reset({
        text_content: editingChallenge.text_content,
        correct_fallacy_id: editingChallenge.correct_fallacy_id,
        explanation: editingChallenge.explanation,
        hint: editingChallenge.hint
      });
    } else {
      reset({
        text_content: '',
        correct_fallacy_id: undefined,
        explanation: '',
        hint: ''
      });
    }
  }, [editingChallenge, reset]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    let result;
    if (editingChallenge) {
      result = await updateFallacyChallenge(editingChallenge.id, data);
    } else {
      result = await createFallacyChallenge(data);
    }
    setIsSubmitting(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(editingChallenge ? 'Provocarea a fost actualizată!' : 'Provocarea a fost adăugată!');
      if (!editingChallenge) reset();
      if (onCancelEdit) onCancelEdit();
    }
  };

  if (fallacies.length === 0) {
    return (
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-6 rounded-3xl sticky top-24">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-800 dark:text-amber-500 mb-2">Adaugă mai întâi erori logice</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Pentru a crea provocări, ai nevoie de cel puțin un tip de eroare logică definit în tab-ul alăturat.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-white flex items-center gap-2">
          {editingChallenge ? 'Editează Provocarea' : 'Adaugă Provocare'}
        </h2>
        {editingChallenge && onCancelEdit && (
          <button type="button" onClick={onCancelEdit} className="text-xs text-gray-400 hover:text-gray-600 underline">Anulează</button>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Textul Manipulator (Enunț)</label>
          <textarea 
            {...register('text_content')}
            rows={4}
            className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c1f31] focus:ring-1 focus:ring-[#7c1f31] transition-all resize-none text-[#1a1a1a] dark:text-white font-medium"
            placeholder="Știrea sau declarația care conține eroarea..."
          />
          {errors.text_content && <p className="text-red-500 text-xs mt-1 font-medium">{errors.text_content.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Eroarea logică corectă</label>
          <select
            {...register('correct_fallacy_id', { valueAsNumber: true })}
            className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c1f31] focus:ring-1 focus:ring-[#7c1f31] transition-all text-[#1a1a1a] dark:text-white font-medium"
          >
            <option value="">-- Selectează eroarea --</option>
            {fallacies.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          {errors.correct_fallacy_id && <p className="text-red-500 text-xs mt-1 font-medium">{errors.correct_fallacy_id.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Explicație pentru utilizator</label>
          <textarea 
            {...register('explanation')}
            rows={3}
            className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c1f31] focus:ring-1 focus:ring-[#7c1f31] transition-all resize-none text-[#1a1a1a] dark:text-white font-medium"
            placeholder="De ce este textul selectat un exemplu pntru această eroare?"
          />
          {errors.explanation && <p className="text-red-500 text-xs mt-1 font-medium">{errors.explanation.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Indiciu (în caz că greșește)</label>
          <input 
            {...register('hint')}
            className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c1f31] focus:ring-1 focus:ring-[#7c1f31] transition-all text-[#1a1a1a] dark:text-white font-medium"
            placeholder="Fii atent la atacurile verbale..."
          />
          {errors.hint && <p className="text-red-500 text-xs mt-1 font-medium">{errors.hint.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#7c1f31] dark:hover:bg-[#ff4d6d] dark:hover:text-white transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Se salvează...' : 'Salvează Provocarea'}
        </button>
      </div>
    </form>
  );
}
