// components/shared/skeletons/HistoryWeekGroupSkeleton.tsx

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { HistoryDraftCardSkeleton } from "./HistoryDraftCardSkeleton";

export function HistoryWeekGroupSkeleton() {
  return (
    <div className="space-y-6">
      {/* Week Header Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-40" />
        <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
      </div>

      {/* Draft Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <HistoryDraftCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}