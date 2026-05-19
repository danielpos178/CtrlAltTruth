'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createTopic, updateTopic } from '../../actions';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

const topicSchema = z.object({
  id: z.string().min(2, 'ID-ul este prea scurt'),
  title: z.string().min(3, 'Titlul este prea scurt'),
  icon_name: z.string().min(1, 'Selectează o iconiță'),
  description: z.string().min(5, 'Descrierea este prea scurt'),
});

type TopicFormData = z.infer<typeof topicSchema>;

export function TopicForm({ editingTopic, onCancelEdit }: { editingTopic?: any, onCancelEdit: () => void }) {
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<TopicFormData>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      id: '',
      title: '',
      icon_name: 'BookOpen',
      description: ''
    }
  });

  useEffect(() => {
    if (editingTopic) {
      reset({
        id: editingTopic.id,
        title: editingTopic.title,
        icon_name: editingTopic.icon_name,
        description: editingTopic.description
      });
    } else {
      reset({
        id: '',
        title: '',
        icon_name: 'BookOpen',
        description: ''
      });
    }
  }, [editingTopic, reset]);

  const onSubmit = async (data: TopicFormData) => {
    let result;
    if (editingTopic) {
      result = await updateTopic(editingTopic.id, data);
    } else {
      result = await createTopic(data);
    }

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(editingTopic ? 'Temă actualizată!' : 'Temă adăugată!');
      if (!editingTopic) reset();
      onCancelEdit();
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{editingTopic ? 'Editează Tema' : 'Adaugă Temă Nouă'}</h2>
        {editingTopic && (
          <button onClick={onCancelEdit} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">ID (Slug - ex: propaganda-razboi)</label>
            <input 
              {...register('id')}
              disabled={!!editingTopic}
              className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-[#7c1f31] font-medium" 
              placeholder="id-unic"
            />
            {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Titlu Tema</label>
            <input 
              {...register('title')}
              className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-[#7c1f31] font-medium" 
              placeholder="Titlul vizibil"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Nume Iconiță Lucide-react (ex: ShieldAlert, Zap, BookOpen)</label>
          <input 
            {...register('icon_name')}
            className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-[#7c1f31] font-medium" 
            placeholder="SearchCode"
          />
          {errors.icon_name && <p className="text-red-500 text-xs mt-1">{errors.icon_name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Descriere / Conținut (Textul de analizat)</label>
          <textarea 
            {...register('description')}
            rows={6}
            className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-[#7c1f31] font-medium min-h-[150px]" 
            placeholder="Introduceți aici textul care trebuie analizat pentru manipulare..."
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="pt-4 flex gap-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-[#7c1f31] hover:bg-[#5a1623] text-white py-3 rounded-xl font-bold transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'Se salvează...' : editingTopic ? 'Actualizează Tema' : 'Adaugă Tema'}
          </button>
          
          {editingTopic && (
            <button 
              type="button" 
              onClick={onCancelEdit}
              className="px-6 bg-gray-100 dark:bg-white/5 text-[#1a1a1a] dark:text-white py-3 rounded-xl font-bold transition-all hover:bg-gray-200 dark:hover:bg-white/10"
            >
              Anulează
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
