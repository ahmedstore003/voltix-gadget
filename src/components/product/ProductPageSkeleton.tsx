import React from 'react';

export const ProductPageSkeleton: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10 sm:py-14 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20">
        <div className="aspect-square voltix-image-frame voltix-surface voltix-shimmer" />
        <div className="flex flex-col gap-6">
          <div className="h-3 w-24 rounded voltix-shimmer" />
          <div className="h-9 w-4/5 max-w-md rounded voltix-shimmer" />
          <div className="h-7 w-32 rounded voltix-shimmer" />
          <div className="space-y-2 pt-4">
            <div className="h-3 w-full rounded voltix-shimmer" />
            <div className="h-3 w-full rounded voltix-shimmer" />
            <div className="h-3 w-2/3 rounded voltix-shimmer" />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-24 voltix-surface voltix-shimmer" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
