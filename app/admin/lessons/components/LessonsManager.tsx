'use client';

import React, { useState } from 'react';
import { LessonForm } from './LessonForm';
import { Edit2, Trash2 } from 'lucide-react';
import { deleteLesson } from '../../actions';
import toast from 'react-hot-toast';

export function LessonsManager({ lessons }: { lessons: any[] }) {
  const [editingLesson, setEditingLesson] = useState<any>(null);

  const handleDelete = async (id: number) => {
    const result = await deleteLesson(id);
    if (result.error) {
       toast.error(result.error);
    } else {
       toast.success('Lecție ștearsă.');
    }
  };

  return (
    <div>
      <LessonForm 
         editingLesson={editingLesson} 
         onCancelEdit={() => setEditingLesson(null)} 
      />

      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm mt-8">
        <h2 className="text-2xl font-bold mb-6">Lecții Existente</h2>
        {(!lessons || lessons.length === 0) ? (
          <p className="text-gray-500 italic">Nu a fost adăugată nicio lecție încă.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="py-3 px-4 font-bold text-sm text-gray-500">Titlu</th>
                  <th className="py-3 px-4 font-bold text-sm text-gray-500">Slug</th>
                  <th className="py-3 px-4 font-bold text-sm text-gray-500">Nivel</th>
                  <th className="py-3 px-4 font-bold text-sm text-gray-500 text-right">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className={`border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${editingLesson?.id === lesson.id ? 'bg-[#7c1f31]/5 dark:bg-[#7c1f31]/20' : ''}`}>
                    <td className="py-3 px-4 font-medium max-w-[200px] truncate" title={lesson.title}>{lesson.title}</td>
                    <td className="py-3 px-4 text-gray-500 text-sm max-w-[150px] truncate">{lesson.slug}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="bg-[#7c1f31]/10 text-[#7c1f31] dark:bg-[#7c1f31]/30 dark:text-[#f8b4c1] px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap">
                        {lesson.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                       <button 
                         onClick={() => setEditingLesson(lesson)}
                         className="text-[#7c1f31] hover:text-[#5a1624] dark:text-[#f8b4c1] dark:hover:text-white p-2 rounded-xl hover:bg-[#7c1f31]/10 dark:hover:bg-[#7c1f31]/30 transition-colors mr-2"
                         title="Editează"
                       >
                         <Edit2 className="w-4 h-4" />
                       </button>
                       <button 
                         onClick={() => handleDelete(lesson.id)}
                         className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                         title="Șterge"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
