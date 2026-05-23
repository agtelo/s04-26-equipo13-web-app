import { MessageSquare } from 'lucide-react'
import React from 'react'

export default function ActivityCardEmpty() {
  return (
    <div className="text-center py-20 border-2 border-dashed border-border rounded-[32px]">
            <MessageSquare className="w-10 h-10 text-muted-foreground/20 mx-auto mb-6" />
            <p className="text-sm text-muted-foreground font-bold tracking-wide">
              No activity collected for this week yet.
            </p>
          </div>
  )
}
