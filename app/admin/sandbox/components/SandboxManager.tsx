'use client';

import React, { useState } from 'react';
import { FallacyForm, FallacyChallengeForm } from './SandboxForms';
import { Trash2, ShieldAlert, FileText, AlertCircle } from 'lucide-react';
import { deleteFallacy, deleteFallacyChallenge } from '../actions';
import { toast } from 'react-hot-toast';

export function SandboxManager({ fallacies, challenges }: { fallacies: any[], challenges: any[] }) {
  const [activeTab, setActiveTab] = useState<'fallacies' | 'challenges'>('fallacies');
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingFallacy, setEditingFallacy] = useState<any>(null);
  const [editingChallenge, setEditingChallenge] = useState<any>(null);

  const handleDeleteFallacy = async (id: number) => {
    if (!confirm('Ești sigur că vrei să ștergi această eroare? Provocările asociate vor fi de asemenea șterse.')) return;
    setIsDeleting(true);
    const result = await deleteFallacy(id);
    setIsDeleting(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Eroarea logică a fost ștearsă!');
    }
  };

  const handleDeleteChallenge = async (id: number) => {
    if (!confirm('Ești sigur că vrei să ștergi această provocare?')) return;
    setIsDeleting(true);
    const result = await deleteFallacyChallenge(id);
    setIsDeleting(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Provocarea a fost ștearsă!');
    }
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex bg-white dark:bg-[#1a1a1a] p-2 rounded-2xl border border-[#1a1a1a]/10 dark:border-white/10 w-fit">
        <button
          onClick={() => { setActiveTab('fallacies'); setEditingFallacy(null); setEditingChallenge(null); }}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'fallacies'
              ? 'bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a] shadow-sm'
              : 'text-[#1a1a1a]/60 dark:text-white/60 hover:text-[#1a1a1a] dark:hover:text-white hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5'
          }`}
        >
          <AlertCircle className="w-4 h-4" /> Categorii Erori Logice
        </button>
        <button
          onClick={() => { setActiveTab('challenges'); setEditingFallacy(null); setEditingChallenge(null); }}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'challenges'
              ? 'bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a] shadow-sm'
              : 'text-[#1a1a1a]/60 dark:text-white/60 hover:text-[#1a1a1a] dark:hover:text-white hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5'
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> Provocări Sandbox
        </button>
      </div>

      {activeTab === 'fallacies' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
             <FallacyForm 
                editingFallacy={editingFallacy} 
                onCancelEdit={() => setEditingFallacy(null)} 
             />
          </div>
          <div className="lg:col-span-2 space-y-4">
             {fallacies.length === 0 ? (
               <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 border border-[#1a1a1a]/10 dark:border-white/10 text-center">
                 <p className="text-gray-500 italic">Nu a fost adăugată nicio eroare logică.</p>
               </div>
             ) : (
               fallacies.map((f) => (
                 <div key={f.id} className={`bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border transition-all relative group ${editingFallacy?.id === f.id ? 'border-[#7c1f31] ring-2 ring-[#7c1f31]/20' : 'border-[#1a1a1a]/10 dark:border-white/10'}`}>
                   <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                       onClick={() => setEditingFallacy(f)}
                       className="p-2 text-[#7c1f31] bg-[#7c1f31]/5 dark:bg-[#7c1f31]/20 rounded-xl hover:bg-[#7c1f31]/10 dark:hover:bg-[#7c1f31]/40"
                       title="Editează eroarea"
                     >
                       <FileText className="w-4 h-4" />
                     </button>
                     <button 
                       onClick={() => handleDeleteFallacy(f.id)}
                       disabled={isDeleting}
                       className="p-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40"
                       title="Șterge eroarea"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                   <h3 className="font-bold text-lg mb-2 text-[#1a1a1a] dark:text-white">{f.name}</h3>
                   <p className="text-sm text-[#1a1a1a]/70 dark:text-white/70 mb-4">{f.definition}</p>
                   <div className="bg-[#1a1a1a]/5 dark:bg-white/5 p-4 rounded-xl">
                     <p className="text-xs font-bold text-[#1a1a1a]/50 dark:text-white/50 uppercase tracking-wider mb-1">Exemplu</p>
                     <p className="text-sm italic text-[#1a1a1a] dark:text-white">„{f.example}”</p>
                   </div>
                 </div>
               ))
             )}
          </div>
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
             <FallacyChallengeForm 
                fallacies={fallacies} 
                editingChallenge={editingChallenge}
                onCancelEdit={() => setEditingChallenge(null)}
             />
          </div>
          <div className="lg:col-span-2 space-y-4">
             {challenges.length === 0 ? (
               <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 border border-[#1a1a1a]/10 dark:border-white/10 text-center">
                 <p className="text-gray-500 italic">Nu a fost adăugată nicio provocare.</p>
               </div>
             ) : (
               challenges.map((c) => (
                 <div key={c.id} className={`bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border transition-all relative group ${editingChallenge?.id === c.id ? 'border-[#7c1f31] ring-2 ring-[#7c1f31]/20' : 'border-[#1a1a1a]/10 dark:border-white/10'}`}>
                   <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                        onClick={() => setEditingChallenge(c)}
                        className="p-2 text-[#7c1f31] bg-[#7c1f31]/5 dark:bg-[#7c1f31]/20 rounded-xl hover:bg-[#7c1f31]/10 dark:hover:bg-[#7c1f31]/40"
                        title="Editează provocarea"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                     <button 
                       onClick={() => handleDeleteChallenge(c.id)}
                       disabled={isDeleting}
                       className="p-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40"
                       title="Șterge provocarea"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                   <div className="mb-4">
                     <span className="inline-block px-3 py-1 bg-[#7c1f31]/10 text-[#7c1f31] dark:bg-[#7c1f31]/20 dark:text-[#f8b4c1] rounded-lg text-xs font-bold mb-3 uppercase tracking-wider">
                       Răspuns: {c.fallacies_registry?.name}
                     </span>
                     <p className="text-base font-medium text-[#1a1a1a] dark:text-white">„{c.text_content}”</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-gray-50 dark:bg-[#1a1a1a] border border-[#1a1a1a]/5 dark:border-white/5 p-4 rounded-xl">
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Explicație</p>
                       <p className="text-sm text-[#1a1a1a]/80 dark:text-white/80">{c.explanation}</p>
                     </div>
                     <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-4 rounded-xl">
                       <p className="text-xs font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wider mb-1">Indiciu</p>
                       <p className="text-sm text-amber-800 dark:text-amber-400">{c.hint}</p>
                     </div>
                   </div>
                 </div>
               ))
             )}
          </div>
        </div>
      )}
    </div>
  );
}
