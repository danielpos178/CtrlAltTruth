'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Download, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareProgressProps {
  userName: string;
  score: number;
  avatarUrl: string;
  lessons: number;
  totalLessonsPlatform: number;
  minutes: number;
  fallacy: string;
}

export function ShareProgress({ userName, score, avatarUrl, lessons, totalLessonsPlatform, minutes, fallacy }: ShareProgressProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [ogUrl, setOgUrl] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Construct OG image URL
    const urlOptions = new URLSearchParams({
      nume: userName,
      scor: score.toString(),
      lectii: lessons.toString(),
      totalLectii: totalLessonsPlatform.toString(),
      minute: minutes.toString(),
      inamic: fallacy,
    });
    if (avatarUrl) {
      urlOptions.append('avatar', avatarUrl);
    }
    
    const timer = setTimeout(() => {
      setMounted(true);
      setCanNativeShare(!!(navigator && navigator.share));
      setOgUrl(`${window.location.origin}/api/og?${urlOptions.toString()}`);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [userName, score, avatarUrl, lessons, totalLessonsPlatform, minutes, fallacy]);

  const shareText = `Mi-am testat imunitatea la fake-news și dezinformare pe platforma Scutul Digital! Scorul meu este de ${score}%. Antrenează-te și tu!`;

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: 'Scutul Digital - Progres',
        text: shareText,
        url: window.location.origin + '/progres',
      });
    } catch (error) {
      console.error('Eroare la partajare:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ogUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Eroare la copiere", err);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = ogUrl;
    link.download = `scutul-digital-${userName.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prevent hydration mismatch
  if (!mounted) {
     return (
        <Button disabled className="bg-[#7c1f31] text-white gap-2 rounded-xl opacity-50 shadow-md">
           <Share2 className="w-4 h-4" />
           Se încarcă...
        </Button>
     );
  }

  // Native share option for mobile
  if (canNativeShare) {
    return (
      <Button onClick={handleNativeShare} className="bg-[#7c1f31] hover:bg-[#5a1623] text-white gap-2 rounded-xl transition-all shadow-md">
        <Share2 className="w-4 h-4" />
        Partajează Progresul
      </Button>
    );
  }

  // Fallback options for desktop
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[#7c1f31] hover:bg-[#5a1623] text-white gap-2 rounded-xl transition-all shadow-md active:scale-95">
          <Share2 className="w-4 h-4" />
          Partajează Progresul
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl border-[#1a1a1a]/10 dark:border-white/10 shadow-xl">
        <DropdownMenuItem onClick={copyToClipboard} className="gap-2 cursor-pointer font-medium p-3 hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5">
          {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          <span className={isCopied ? "text-green-500" : ""}>{isCopied ? 'Link Copiat!' : 'Copiază Link Imagine'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadImage} className="gap-2 cursor-pointer font-medium p-3 hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5">
          <Download className="w-4 h-4" />
          <span>Descarcă PNG</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
