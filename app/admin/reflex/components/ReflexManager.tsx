'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Save, Trash2 } from 'lucide-react';
import { createScenario, updateScenario, deleteScenario } from '../actions';
import { verificationScenarioSchema } from '../schemas';

export function ReflexManager({ scenarios }: { scenarios: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingScenario, setEditingScenario] = useState<any>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
    resolver: zodResolver(verificationScenarioSchema),
    defaultValues: {
      author_metadata: '{"followers": 0, "created_at": "Acum 2 zile", "is_bot": true}',
      date_metadata: '{"actual_date": "2018-05-10", "explanation": "Poză veche de la alt eveniment", "is_recent": false}',
      cross_check_metadata: '{"source_found": "Site de satiră / Site obscur", "is_reliable": false}',
      domain_name: 'stirile-adevarului.pseudo',
      domain_metadata: '{"analysis": "Domeniul folosește o extensie exotică.", "is_reliable": false}',
      content_excerpt: 'Acesta este un text exagerat!',
      content_metadata: '{"emotional_language": true, "capitalization_abuse": true, "analysis": "Textul folosește majuscule nejustificat și limbaj senzaționalist pentru a provoca panică."}',
      is_published: true
    }
  });

  React.useEffect(() => {
    if (editingScenario) {
      reset({
        title: editingScenario.title,
        author_name: editingScenario.author_name,
        author_metadata: JSON.stringify(editingScenario.author_metadata, null, 2),
        publish_date: editingScenario.publish_date,
        date_metadata: JSON.stringify(editingScenario.date_metadata, null, 2),
        image_url: editingScenario.image_url,
        cross_check_metadata: JSON.stringify(editingScenario.cross_check_metadata, null, 2),
        domain_name: editingScenario.domain_name,
        domain_metadata: JSON.stringify(editingScenario.domain_metadata || {}, null, 2),
        content_excerpt: editingScenario.content_excerpt,
        content_metadata: JSON.stringify(editingScenario.content_metadata || {}, null, 2),
        is_published: editingScenario.is_published
      });
    } else {
      reset({
        title: '',
        author_name: '',
        author_metadata: '{"followers": 0, "created_at": "Acum 2 zile", "is_bot": true}',
        publish_date: '',
        date_metadata: '{"actual_date": "2018-05-10", "explanation": "Poză veche de la alt eveniment", "is_recent": false}',
        image_url: '',
        cross_check_metadata: '{"source_found": "Site de satiră / Site obscur", "is_reliable": false}',
        domain_name: 'stirile-adevarului.pseudo',
        domain_metadata: '{"analysis": "Domeniul folosește o extensie exotică.", "is_reliable": false}',
        content_excerpt: 'Acesta este un text exagerat!',
        content_metadata: '{"emotional_language": true, "capitalization_abuse": true, "analysis": "Textul folosește majuscule nejustificat și limbaj senzaționalist pentru a provoca panică."}',
        is_published: true
      });
    }
  }, [editingScenario, reset]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    let result;
    if (editingScenario) {
      result = await updateScenario(editingScenario.id, data);
    } else {
      result = await createScenario(data);
    }
    setIsSubmitting(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(editingScenario ? 'Scenariul a fost actualizat!' : 'Scenariul a fost adăugat cu succes!');
      if (!editingScenario) reset();
      setEditingScenario(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Sigur vrei să ștergi acest scenariu?')) return;
    setIsDeleting(true);
    const result = await deleteScenario(id);
    setIsDeleting(false);
    if (result?.error) toast.error(result.error);
    else toast.success('Scenariul a fost șters!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-white">
              {editingScenario ? 'Editează Scenariul' : 'Adaugă Scenariu Nou'}
            </h2>
            {editingScenario && (
              <button
                type="button"
                onClick={() => setEditingScenario(null)}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Anulează
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Titlu Articol Fals</label>
              <input {...register('title')} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-[#7c1f31] font-medium" />
              {errors.title && <p className="text-red-500 text-xs mt-1">{String(errors.title.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Nume Autor</label>
              <input {...register('author_name')} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-[#7c1f31] font-medium" />
              {errors.author_name && <p className="text-red-500 text-xs mt-1">{String(errors.author_name.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Metadata Autor (JSON)</label>
              <textarea {...register('author_metadata')} rows={3} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 font-mono text-xs outline-none focus:border-[#7c1f31]" />
              {errors.author_metadata && <p className="text-red-500 text-xs mt-1">{String(errors.author_metadata.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Data Afișată</label>
              <input {...register('publish_date')} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-[#7c1f31] font-medium" />
              {errors.publish_date && <p className="text-red-500 text-xs mt-1">{String(errors.publish_date.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Data Reală / Metadata (JSON)</label>
              <textarea {...register('date_metadata')} rows={3} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 font-mono text-xs outline-none focus:border-[#7c1f31]" />
              {errors.date_metadata && <p className="text-red-500 text-xs mt-1">{String(errors.date_metadata.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Imagine URL (Momeală)</label>
              <input {...register('image_url')} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-[#7c1f31] font-medium" />
              {errors.image_url && <p className="text-red-500 text-xs mt-1">{String(errors.image_url.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Metadata Sursă (JSON)</label>
              <textarea {...register('cross_check_metadata')} rows={3} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 font-mono text-xs outline-none focus:border-[#7c1f31]" />
              {errors.cross_check_metadata && <p className="text-red-500 text-xs mt-1">{String(errors.cross_check_metadata.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Nume Domeniu</label>
              <input {...register('domain_name')} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-[#7c1f31] font-medium" />
              {errors.domain_name && <p className="text-red-500 text-xs mt-1">{String(errors.domain_name.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Metadata Domeniu (JSON)</label>
              <textarea {...register('domain_metadata')} rows={3} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 font-mono text-xs outline-none focus:border-[#7c1f31]" />
              {errors.domain_metadata && <p className="text-red-500 text-xs mt-1">{String(errors.domain_metadata.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Extras Conținut</label>
              <textarea {...register('content_excerpt')} rows={3} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 outline-none focus:border-[#7c1f31] font-medium" />
              {errors.content_excerpt && <p className="text-red-500 text-xs mt-1">{String(errors.content_excerpt.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a]/80 dark:text-white/80 mb-2">Metadata Conținut (JSON)</label>
              <textarea {...register('content_metadata')} rows={3} className="w-full bg-[#1a1a1a]/5 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 rounded-xl px-4 py-2 font-mono text-xs outline-none focus:border-[#7c1f31]" />
              {errors.content_metadata && <p className="text-red-500 text-xs mt-1">{String(errors.content_metadata.message)}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#7c1f31] dark:hover:bg-[#ff4d6d] dark:hover:text-white transition-all disabled:opacity-50 mt-4"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Se salvează...' : 'Salvează Scenariu'}
            </button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {scenarios.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 border border-[#1a1a1a]/10 dark:border-white/10 text-center">
            <p className="text-gray-500 italic">Nu a fost adăugat niciun scenariu.</p>
          </div>
        ) : (
          scenarios.map((s) => (
            <div key={s.id} className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border border-[#1a1a1a]/10 dark:border-white/10 relative group">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingScenario(s)}
                  className="p-2 text-[#7c1f31] bg-[#7c1f31]/5 dark:bg-[#7c1f31]/20 rounded-xl hover:bg-[#7c1f31]/10 dark:hover:bg-[#7c1f31]/40"
                  title="Editează scenariul"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  disabled={isDeleting}
                  className="p-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40"
                  title="Șterge scenariul"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#1a1a1a] dark:text-white">{s.title}</h3>
              <p className="text-sm text-gray-500">Autor: {s.author_name} • Data: {s.publish_date}</p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                  <p className="text-xs font-bold text-gray-400">METADATA AUTOR</p>
                  <pre className="text-xs mt-1 overflow-auto">{JSON.stringify(s.author_metadata, null, 2)}</pre>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                  <p className="text-xs font-bold text-gray-400">METADATA DATĂ</p>
                  <pre className="text-xs mt-1 overflow-auto">{JSON.stringify(s.date_metadata, null, 2)}</pre>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                  <p className="text-xs font-bold text-gray-400">METADATA SURSĂ</p>
                  <pre className="text-xs mt-1 overflow-auto">{JSON.stringify(s.cross_check_metadata, null, 2)}</pre>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                  <p className="text-xs font-bold text-gray-400">METADATA DOMENIU & CONTINUT</p>
                  <pre className="text-xs mt-1 overflow-auto">Domeniu: {s.domain_name}{'\n'}{JSON.stringify(s.domain_metadata, null, 2)}{'\n'}Conținut: {s.content_excerpt?.substring(0, 20)}...{'\n'}{JSON.stringify(s.content_metadata, null, 2)}</pre>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
