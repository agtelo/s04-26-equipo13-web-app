// components/shared/skeletons/HistoryDraftCardSkeleton.tsx

"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function HistoryDraftCardSkeleton() {
  return (
    <div className="p-8 bg-secondary/20 rounded-[32px] border border-border/30 flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2 w-16" />
          </div>
        </div>
      </div>

      {/* Content - 4 lines */}
      <div className="space-y-2 mb-8 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Skeleton className="flex-1 h-10 rounded-2xl" />
        <Skeleton className="flex-1 h-10 rounded-2xl" />
      </div>
    </div>
  );
}