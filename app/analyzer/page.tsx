// Licensed under the GNU AGPL-3.0-only.

import React from 'react';
import AnalyzerView from '@/components/views/AnalyzerView';
import { getTopics } from '@/lib/fetchData';

export const revalidate = 60; // Cache for 60s

export default async function AnalyzerPage() {
  const topics = await getTopics();

  return (
    <div className="py-12 md:py-20">
      <AnalyzerView topics={topics} />
    </div>
  );
}
