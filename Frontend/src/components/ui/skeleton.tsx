import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sm" | "md" | "lg"
}

function Skeleton({ className, variant = "md", ...props }: SkeletonProps) {
  const sizeClasses = {
    sm: "h-4",
    md: "h-8",
    lg: "h-12",
  }

  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-muted",
        sizeClasses[variant],
        "w-full",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }