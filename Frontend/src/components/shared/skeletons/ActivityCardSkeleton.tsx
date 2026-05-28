import { Skeleton } from "@/components/ui/skeleton"

export function ActivityCardSkeleton() {
  return (
    <div className="p-6 bg-secondary/30 rounded-[32px] border border-transparent shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        {/* Avatar + Author Info */}
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
          
          <div className="flex-1">
            <Skeleton className="w-32 h-3 mb-2" />
            <Skeleton className="w-24 h-2.5" />
          </div>
        </div>

        {/* Type badge */}
        <Skeleton className="w-20 h-5 rounded-full flex-shrink-0" />
      </div>

      {/* Content - 3 lines */}
      <div className="space-y-1.5 mb-6">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-5/6 h-3" />
      </div>

      {/* Footer */}
      <div className="flex items-center gap-5">
        <Skeleton className="w-10 h-2.5" />
        <Skeleton className="w-10 h-2.5" />
        <Skeleton className="w-20 h-2.5" />
      </div>
    </div>
  )
}