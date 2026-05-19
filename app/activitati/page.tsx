import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, SearchCode, ShieldAlert, Compass } from 'lucide-react';

export default function ActivitatiPage() {
  const activities = [
    {
      id: "swipe",
      title: "Swipe Game",
      href: "/swipe",
      icon: Zap,
      badge: "Interactiv",
      badgeVariant: "default",
      description: "Testează-ți instinctul de moment. Glisează rapid titlurile de știri și vezi dacă poți diferenția adevărul de ficțiune în mai puțin de 3 secunde.",
    },
    {
      id: "analiza",
      title: "Detector de Manipulare",
      href: "/analiza",
      icon: SearchCode,
      badge: "Analiză Text",
      badgeVariant: "secondary",
      description: "Dezbracă textul de secrete. Analizează articole suspecte și selectează cuvintele cheie care indică o tentativă clară de manipulare emoțională.",
    },
    {
      id: "erori",
      title: "Groapa cu Nisip",
      href: "/erori",
      icon: ShieldAlert,
      badge: "Gândire Critică",
      badgeVariant: "destructive",
      description: "Identifică capcanele de argumentare. Scanează discursuri și texte publice pentru a descoperi erorile logice ascunse folosite de propagandiști.",
    },
    {
      id: "navigator-reflex",
      title: "Simulator de Reflex Digital",
      href: "/navigator-reflex",
      icon: Compass,
      badge: "Antrenament Reflex",
      badgeVariant: "outline",
      description: "Antrenează-ți mușchiul detectiv. Folosește lupa de verificare pentru a inspecta autorul, data și sursele înainte ca o știre falsă să îți păcălească creierul.",
    }
  ] as const;

  return (
    <main className="flex-1 bg-[#e7edeb] dark:bg-[#0a0a0a] min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a1a1a] dark:text-white">
            Activități &amp; Laborator
          </h1>
          <p className="text-lg md:text-xl text-[#1a1a1a]/70 dark:text-white/70 max-w-2xl">
            Alege un modul de antrenament pentru a-ți dezvolta abilitățile de analiză a textului, detectare a manipulării și verificare a surselor.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <Card 
                key={activity.id} 
                className="flex flex-col h-full bg-white dark:bg-[#1a1a1a] border-[#1a1a1a]/10 dark:border-white/10 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
              >
                <CardHeader className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-[#1a1a1a]/5 dark:bg-white/5 rounded-xl">
                      <Icon className="w-6 h-6 text-[#7c1f31] dark:text-[#ff4d6d]" />
                    </div>
                    <Badge variant={activity.badgeVariant as any} className="font-bold">
                      {activity.badge}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-[#1a1a1a] dark:text-white">
                      {activity.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <CardDescription className="text-base text-[#1a1a1a]/70 dark:text-white/70 leading-relaxed font-medium">
                    {activity.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-4 border-t border-[#1a1a1a]/5 dark:border-white/5">
                  <Button 
                    asChild 
                    className="w-full bg-[#7c1f31] hover:bg-[#5a1623] text-white dark:bg-[#ff4d6d] dark:hover:bg-[#ff4d6d]/80 dark:text-[#1a1a1a] font-bold"
                  >
                    <Link href={activity.href}>
                      Începe Activitatea
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
