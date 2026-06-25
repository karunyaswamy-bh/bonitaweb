import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white border border-neutral-charcoal/5 shadow-premium rounded overflow-hidden animate-pulse">
      {/* Photo Placeholder */}
      <div className="aspect-[2/3] w-full bg-neutral-200"></div>
      
      {/* Copy Placeholders */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="h-3 w-1/3 bg-neutral-200 rounded mb-2"></div>
          <div className="h-5 w-3/4 bg-neutral-200 rounded mb-3"></div>
          <div className="h-4 w-1/2 bg-neutral-200 rounded mb-4"></div>
        </div>
        <div className="h-10 w-full bg-neutral-200 rounded"></div>
      </div>
    </div>
  );
}
