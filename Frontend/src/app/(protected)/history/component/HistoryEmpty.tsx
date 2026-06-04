"use client";

import { History } from "lucide-react";

export function HistoryEmpty() {
  return (
    <div className="py-40 text-center">
      <History className="w-16 h-16 text-muted/10 mx-auto mb-6" />
      <h3 className="text-2xl font-serif italic opacity-30">
        Archive is empty
      </h3>
      <p className="text-sm text-muted-foreground mt-2">
        Approve some drafts to see them here.
      </p>
    </div>
  );
}