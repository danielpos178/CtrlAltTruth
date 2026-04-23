// Licensed under the GNU AGPL-3.0-only.
import React from 'react';
import SwipeGameView from '@/components/views/SwipeGameView';
import { getSwipeCards } from '@/lib/fetchData';

export const revalidate = 60; // Cache for 60s

export default async function SwipeGamePage() {
  const initialCards = await getSwipeCards();

  return (
    <div className="py-12 md:py-20">
      <SwipeGameView initialCards={initialCards} />
    </div>
  );
}
