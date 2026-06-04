// components/shared/skeletons/HistoryTableSkeleton.tsx

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryWeekGroupSkeleton } from "./HistoryWeekGroupSkeleton";

export function HistoryTableSkeleton() {
  return (
    <Card className="rounded-[40px] border-none shadow-sm min-h-[700px] overflow-hidden flex flex-col">
      
      {/* Header Skeleton */}
      <CardHeader className="flex flex-row items-center justify-between pb-10 pt-10 px-10 border-b">
        <div className="flex-1">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-12 w-32 rounded-full" />
      </CardHeader>

      {/* Content Skeleton */}
      <CardContent className="p-10 flex-1">
        <div className="space-y-12">
          {/* Week Group Skeletons */}
          {Array.from({ length: 3 }).map((_, i) => (
            <HistoryWeekGroupSkeleton key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}