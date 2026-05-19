'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createBadge, updateBadge } from '../../actions';
import toast from 'react-hot-toast';
import { Trophy, AlertCircle, Edit3, X } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă minim 2 caractere'),
  description: z.string().min(5, 'Descrierea trebuie să aibă minim 5 caractere'),
  icon_name: z.string().min(1, 'Selectează o iconiță'),
  criteria: z.string().min(2, 'Criteriul este obligatoriu'),
});

export function BadgeForm({ editingBadge, onCancelEdit }: { editingBadge?: any, onCancelEdit?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      icon_name: 'Trophy',
    }
  });

  useEffect(() => {
    if (editingBadge) {
      reset({
        name: editingBadge.name,
        description: editingBadge.description,
        icon_name: editingBadge.icon_name,
        criteria: editingBadge.criteria,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      reset({
        name: '',
        description: '',
        icon_name: 'Trophy',
        criteria: '',
      });
    }
  }, [editingBadge, reset]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      if (editingBadge) {
        const res = await updateBadge(editingBadge.id, data);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success('Insigna a fost actualizată!');
          if (onCancelEdit) onCancelEdit();
        }
      } else {
        const res = await createBadge(data);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success('Insigna a fost creată cu succes!');
          reset();
        }
      }
    } catch {
      toast.error('A apărut o eroare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`rounded-3xl p-6 md:p-8 border shadow-sm transition-all ${editingBadge ? 'bg-[#7c1f31]/5 border-[#7c1f31]/20 dark:border-[#7c1f31]/40' : 'bg-white dark:bg-[#1a1a1a] border-[#1a1a1a]/10 dark:border-white/10'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold flex items-center gap-2 ${editingBadge ? 'text-[#7c1f31] dark:text-[#f8b4c1]' : ''}`}>
          {editingBadge ? <Edit3 className="w-6 h-6" /> : <Trophy className="text-[#7c1f31]" />}
          {editingBadge ? 'Editează Insigna' : 'Adaugă Insignă Nouă'}
        </h2>
        {editingBadge && (
          <button onClick={onCancelEdit} className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors flex items-center gap-2 text-sm font-bold">
            <X className="w-4 h-4" /> Anulează
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold text-sm block">Nume Insignă</label>
            <input
              {...register('name')}
              placeholder="Ex: Începător"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
            />
            {errors.name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm block">Criteriu (Acțiune necesară)</label>
            <input
              {...register('criteria')}
              placeholder="ex: first_lesson, perfect_swipe"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
            />
            {errors.criteria && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.criteria.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="font-bold text-sm block">Nume Iconiță (ex: Trophy, Flame, Star)</label>
            <input
              {...register('icon_name')}
              placeholder="ex: Trophy"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
            />
            {errors.icon_name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.icon_name.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="font-bold text-sm block">Descriere</label>
            <textarea
              {...register('description')}
              placeholder="Ex: Ai parcurs prima ta lecție."
              rows={3}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
            />
            {errors.description && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 font-bold rounded-xl transition-colors disabled:opacity-50 text-white ${editingBadge ? 'bg-[#5a1624] hover:bg-[#43101b]' : 'bg-[#7c1f31] hover:bg-[#5a1624]'}`}
        >
          {isSubmitting ? 'Se salvează...' : (editingBadge ? 'Actualizează Insigna' : 'Adaugă Insigna')}
        </button>
      </form>
    </div>
  );
}
