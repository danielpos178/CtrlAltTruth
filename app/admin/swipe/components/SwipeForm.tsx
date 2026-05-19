'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createSwipeCard, updateSwipeCard } from '../../actions';
import toast from 'react-hot-toast';
import { Gamepad2, AlertCircle, Edit3, X } from 'lucide-react';

const schema = z.object({
  text: z.string().min(5, 'Enunțul este prea scurt'),
  is_fake: z.union([z.boolean(), z.string()]).transform(val => val === 'true' || val === true),
  explanation: z.string().min(5, 'Explicația este prea scurtă'),
});

export function SwipeForm({ editingCard, onCancelEdit }: { editingCard?: any, onCancelEdit?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<z.input<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      is_fake: false,
    }
  });

  useEffect(() => {
    if (editingCard) {
      reset({
        text: editingCard.text,
        explanation: editingCard.explanation,
      });
      // Handle radio buttons appropriately
      setValue('is_fake', editingCard.is_fake ? 'true' : 'false' as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      reset({
        text: '',
        explanation: '',
      });
      setValue('is_fake', 'false' as any);
    }
  }, [editingCard, reset, setValue]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (editingCard) {
         const res = await updateSwipeCard(editingCard.id, data);
         if (res.error) {
           toast.error(res.error);
         } else {
           toast.success('Enunțul a fost actualizat!');
           if (onCancelEdit) onCancelEdit();
         }
      } else {
         const res = await createSwipeCard(data);
         if (res.error) {
           toast.error(res.error);
         } else {
           toast.success('Enunțul a fost adăugat cu succes!');
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
    <div className={`rounded-3xl p-6 md:p-8 border shadow-sm transition-all ${editingCard ? 'bg-[#7c1f31]/5 border-[#7c1f31]/20 dark:border-[#7c1f31]/40' : 'bg-white dark:bg-[#1a1a1a] border-[#1a1a1a]/10 dark:border-white/10'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold flex items-center gap-2 ${editingCard ? 'text-[#7c1f31] dark:text-[#f8b4c1]' : ''}`}>
          {editingCard ? <Edit3 className="w-6 h-6" /> : <Gamepad2 className="text-[#7c1f31]" />}
          {editingCard ? 'Editează Enunțul' : 'Adaugă Enunț Nou'}
        </h2>
        {editingCard && (
           <button onClick={onCancelEdit} className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors flex items-center gap-2 text-sm font-bold">
             <X className="w-4 h-4" /> Anulează
           </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="font-bold text-sm block">Enunț</label>
          <input 
            {...register('text')} 
            placeholder="Ex: Soarele este un bec uriaș plasat pe cer."
            className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
          />
          {errors.text && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.text.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-sm block">Tip Enunț</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" {...register('is_fake')} value="false" className="w-4 h-4" />
              <span>Adevărat</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" {...register('is_fake')} value="true" className="w-4 h-4" />
              <span>Fals</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-bold text-sm block">Explicație</label>
          <textarea 
            {...register('explanation')} 
            placeholder="Ex: Bineînțeles că nu este un bec..."
            rows={4}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
          />
          {errors.explanation && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.explanation.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`px-6 py-3 font-bold rounded-xl transition-colors disabled:opacity-50 text-white ${editingCard ? 'bg-[#5a1624] hover:bg-[#43101b]' : 'bg-[#7c1f31] hover:bg-[#5a1624]'}`}
        >
          {isSubmitting ? 'Se salvează...' : (editingCard ? 'Actualizează Enunțul' : 'Adaugă Enunțul')}
        </button>
      </form>
    </div>
  );
}
