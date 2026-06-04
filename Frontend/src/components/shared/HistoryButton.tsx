// components/shared/HistoryButton.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import { GetApprovedDraftsService } from "@/services/history.service";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function HistoryButton() {
  const { data: drafts = [] } = useQuery({
    queryKey: ["approved-drafts"],
    queryFn: GetApprovedDraftsService,
  });

  // Solo mostrar si hay drafts aprobados
  if (drafts.length === 0) {
    return null;
  }

  return (
    <Link href="/history">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full border border-border/50 text-muted-foreground transition-all hover:bg-secondary/50",
          "relative"
        )}
        title={`View ${drafts.length} approved draft${drafts.length !== 1 ? 's' : ''}`}
      >
        <History className="w-5 h-5" />
      </Button>
    </Link>
  );
}