import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export function DraftEditorSkeleton() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="w-32 h-3 mb-2" />
          <Skeleton className="w-24 h-2.5" />
        </div>
        {/* Badge skeleton (cuando está aprobado) */}
        <Skeleton className="w-32 h-8 rounded-full" />
      </div>

      {/* Textarea grande */}
      <Skeleton className="flex-1 w-full min-h-75 rounded-[32px] mb-8" />

      <Separator className="my-8" />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Left buttons group */}
        <div className="flex gap-3">
          <Skeleton className="w-32 h-12 rounded-full" />
          <Skeleton className="w-32 h-12 rounded-full" />
        </div>

        {/* Right button */}
        <Skeleton className="w-40 h-12 rounded-full" />
      </div>
    </div>
  )
}