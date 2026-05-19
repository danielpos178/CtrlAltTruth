import React from 'react';
import { SmartLoader } from '@/components/smart-loader';

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <SmartLoader />
    </div>
  );
}
