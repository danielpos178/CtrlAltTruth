'use client';

import React, { useState } from 'react';
import { BadgeForm } from './BadgeForm';
import { Edit2, Trash2 } from 'lucide-react';
import { deleteBadge } from '../../actions';
import toast from 'react-hot-toast';

export function BadgesManager({ badges }: { badges: any[] }) {
  const [editingBadge, setEditingBadge] = useState<any>(null);

  const handleDelete = async (id: string) => {
    const result = await deleteBadge(id);
    if (result.error) {
       toast.error(result.error);
    } else {
       toast.success('Insignă ștearsă.');
    }
  };

  return (
    <div>
      <BadgeForm 
         editingBadge={editingBadge} 
         onCancelEdit={() => setEditingBadge(null)} 
      />

      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border border-[#1a1a1a]/10 dark:border-white/10 shadow-sm mt-8">
        <h2 className="text-2xl font-bold mb-6">Insigne Existente</h2>
        {(!badges || badges.length === 0) ? (
          <p className="text-gray-500 italic">Nu a fost adăugată nicio insignă.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="py-3 px-4 font-bold text-sm text-gray-500">Nume & Descriere</th>
                  <th className="py-3 px-4 font-bold text-sm text-gray-500">Criteriu</th>
                  <th className="py-3 px-4 font-bold text-sm text-gray-500">Icon</th>
                  <th className="py-3 px-4 font-bold text-sm text-gray-500 text-right">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {badges.map((badge) => (
                  <tr key={badge.id} className={`border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${editingBadge?.id === badge.id ? 'bg-[#7c1f31]/5 dark:bg-[#7c1f31]/20' : ''}`}>
                    <td className="py-3 px-4">
                      <div className="font-medium max-w-[250px] truncate" title={badge.name}>{badge.name}</div>
                      <div className="text-xs text-gray-500 max-w-[250px] truncate" title={badge.description}>{badge.description}</div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="bg-[#7c1f31]/10 text-[#7c1f31] dark:bg-[#7c1f31]/30 dark:text-[#f8b4c1] px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap">
                        {badge.criteria}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{badge.icon_name}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                       <button 
                         onClick={() => setEditingBadge(badge)}
                         className="text-[#7c1f31] hover:text-[#5a1624] dark:text-[#f8b4c1] dark:hover:text-white p-2 rounded-xl hover:bg-[#7c1f31]/10 dark:hover:bg-[#7c1f31]/30 transition-colors mr-2"
                         title="Editează"
                       >
                         <Edit2 className="w-4 h-4" />
                       </button>
                       <button 
                         onClick={() => handleDelete(badge.id)}
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
