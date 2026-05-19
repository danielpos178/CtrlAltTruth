'use client';

import React, { useState } from 'react';
import { TopicForm } from './TopicForm';
import { Edit2, Trash2 } from 'lucide-react';
import { deleteTopic } from '../../actions';
import toast from 'react-hot-toast';

export function TopicManager({ topics }: { topics: any[] }) {
  const [editingTopic, setEditingTopic] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Sigur vrei să ștergi această temă?')) return;
    
    const result = await deleteTopic(id);
    if (result.error) {
       toast.error(result.error);
    } else {
       toast.success('Temă ștearsă.');
    }
  };

  return (
    <div>
      <TopicForm 
         editingTopic={editingTopic} 
         onCancelEdit={() => setEditingTopic(null)} 
      />

      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm mt-8">
        <h2 className="text-2xl font-bold mb-6">Teme Existente</h2>
        {(!topics || topics.length === 0) ? (
          <p className="text-gray-500 italic">Nu a fost adăugată nicio temă încă.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="py-3 px-4 font-bold text-sm text-gray-500">Titlu</th>
                  <th className="py-3 px-4 font-bold text-sm text-gray-500">ID</th>
                  <th className="py-3 px-4 font-bold text-sm text-gray-500">Iconiță</th>
                  <th className="py-3 px-4 font-bold text-sm text-gray-500 text-right">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.id} className={`border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${editingTopic?.id === topic.id ? 'bg-[#7c1f31]/5 dark:bg-[#7c1f31]/20' : ''}`}>
                    <td className="py-3 px-4 font-medium max-w-[200px] truncate" title={topic.title}>{topic.title}</td>
                    <td className="py-3 px-4 text-gray-500 text-sm max-w-[150px] truncate">{topic.id}</td>
                    <td className="py-3 px-4 text-sm font-mono">{topic.icon_name}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                       <button 
                         onClick={() => setEditingTopic(topic)}
                         className="text-[#7c1f31] hover:text-[#5a1624] dark:text-[#f8b4c1] dark:hover:text-white p-2 rounded-xl hover:bg-[#7c1f31]/10 dark:hover:bg-[#7c1f31]/30 transition-colors mr-2"
                         title="Editează"
                       >
                         <Edit2 className="w-4 h-4" />
                       </button>
                       <button 
                         onClick={() => handleDelete(topic.id)}
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
