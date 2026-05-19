'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import dynamic from 'next/dynamic';
import { createLesson, updateLesson } from '../../actions';
import toast from 'react-hot-toast';
import { BookOpen, AlertCircle, Edit3, X } from 'lucide-react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// Dynamically import MDEditor with SSR false for Next.js compatibility
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false, loading: () => <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg text-gray-400">Se încarcă editorul...</div> }
);

const schema = z.object({
  title: z.string().min(3, 'Titlul este prea scurt'),
  content: z.string().min(10, 'Conținutul este prea scurt'),
  icon_name: z.string().min(1, 'Selectează o iconiță'),
  slug: z.string().min(2, 'Slug-ul este obligatoriu (fără spații)'),
  level: z.string().min(2, 'Nivelul este obligatoriu'),
});

export function LessonForm({ editingLesson, onCancelEdit }: { editingLesson?: any, onCancelEdit?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: 'Scrie textul lecției aici folosind **Markdown**...',
      icon_name: 'BookOpen',
      level: 'Începător',
    }
  });

  useEffect(() => {
    if (editingLesson) {
      reset({
        title: editingLesson.title,
        content: editingLesson.content,
        icon_name: editingLesson.icon_name,
        slug: editingLesson.slug,
        level: editingLesson.level,
      });
      // Scroll to form automatically when editing starts
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      reset({
        title: '',
        content: 'Scrie textul lecției aici folosind **Markdown**...',
        icon_name: 'BookOpen',
        slug: '',
        level: 'Începător',
      });
    }
  }, [editingLesson, reset]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      if (editingLesson) {
        const res = await updateLesson(editingLesson.id, data);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success('Lecția a fost actualizată!');
          if (onCancelEdit) onCancelEdit();
        }
      } else {
        const res = await createLesson(data);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success('Lecția a fost creată cu succes!');
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
    <div className={`rounded-3xl p-6 md:p-8 border shadow-sm transition-all ${editingLesson ? 'bg-[#7c1f31]/5 border-[#7c1f31]/20 dark:border-[#7c1f31]/40' : 'bg-white dark:bg-[#1a1a1a] border-[#1a1a1a]/10 dark:border-white/10'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold flex items-center gap-2 ${editingLesson ? 'text-[#7c1f31] dark:text-[#f8b4c1]' : ''}`}>
          {editingLesson ? <Edit3 className="w-6 h-6" /> : <BookOpen className="text-[#7c1f31]" />}
          {editingLesson ? 'Editează Lecția' : 'Adaugă Lecție Nouă'}
        </h2>
        {editingLesson && (
          <button onClick={onCancelEdit} className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors flex items-center gap-2 text-sm font-bold">
            <X className="w-4 h-4" /> Anulează
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold text-sm block">Titlu Lecție</label>
            <input
              {...register('title')}
              placeholder="Ex: Cum funcționează Deepfakes"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
            />
            {errors.title && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm block">Slug (URL)</label>
            <input
              {...register('slug')}
              placeholder="ex: cum-functioneaza-deepfakes"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
            />
            {errors.slug && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.slug.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm block">Nivel Dificultate</label>
            <input
              {...register('level')}
              placeholder="ex: Începător, Intermediar"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
            />
            {errors.level && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.level.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm block">Nume Iconiță (ex: Search, FileText)</label>
            <input
              {...register('icon_name')}
              placeholder="ex: Search"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
            />
            {errors.icon_name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.icon_name.message}</p>}
          </div>
        </div>

        <div className="space-y-2" data-color-mode="light">
          <label className="font-bold text-sm block dark:text-white">Conținut Lecție (Markdown)</label>
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  height={400}
                />
              )}
            />
          </div>
          {errors.content && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.content.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 font-bold rounded-xl transition-colors disabled:opacity-50 text-white ${editingLesson ? 'bg-[#5a1624] hover:bg-[#43101b]' : 'bg-[#7c1f31] hover:bg-[#5a1624]'}`}
        >
          {isSubmitting ? 'Se salvează...' : (editingLesson ? 'Actualizează Lecția' : 'Salvează Lecția')}
        </button>
      </form>
    </div>
  );
}
