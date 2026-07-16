import React from 'react';

export const CategoryPageSkeleton: React.FC = () => {
  return (
    <div>
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
          <div className="h-3 w-36 rounded mb-5 sm:mb-6 voltix-shimmer" />
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8 mb-5 lg:mb-6">
            <div className="flex-1 space-y-2">
              <div className="h-9 sm:h-10 w-64 max-w-full rounded voltix-shimmer" />
              <div className="h-4 w-40 max-w-full rounded voltix-shimmer" />
            </div>
            <div className="h-8 w-28 rounded-full voltix-shimmer shrink-0" />
          </div>
          <div className="h-10 w-full max-w-[240px] rounded voltix-shimmer lg:ms-auto" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="aspect-[4/5] voltix-image-frame voltix-surface voltix-shimmer" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded voltix-shimmer" />
                <div className="h-4 w-2/3 rounded voltix-shimmer" />
                <div className="h-3 w-20 rounded mt-2 voltix-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
