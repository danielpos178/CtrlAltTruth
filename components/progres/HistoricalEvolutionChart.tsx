'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award } from 'lucide-react';

interface DataPoint {
  date: string;
  score: number;
}

export function HistoricalEvolutionChart({ initialScore, data }: { initialScore: number, data: DataPoint[] }) {
  const chartData = [
    { date: 'Început', score: initialScore },
    ...data
  ];

  const currentScore = chartData.length > 0 ? chartData[chartData.length - 1].score : initialScore;
  const diff = currentScore - initialScore;

  return (
    <Card className="border-[#1a1a1a]/10 dark:border-white/10 shadow-sm col-span-1 md:col-span-2 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardDescription className="font-bold uppercase tracking-wider text-xs flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-4 h-4" />
              Evoluție Istorică
            </CardDescription>
            <CardTitle className="text-2xl font-bold mt-1 text-[#1a1a1a] dark:text-white">Analiza Performanței</CardTitle>
          </div>
          <div className="bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Progres Net</p>
              <p className="font-bold text-sm">
                I: {initialScore}% → A: {currentScore}% 
                <span className={`ml-2 font-black ${diff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {diff >= 0 ? '+' : ''}{diff}%
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-gray-800" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-500 dark:text-gray-400" />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-500 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold', color: '#1a1a1a', marginBottom: '4px' }}
                itemStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#4f46e5" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
