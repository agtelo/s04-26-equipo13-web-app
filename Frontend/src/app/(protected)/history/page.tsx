"use client";

import { useQuery } from "@tanstack/react-query";
import { GetApprovedDraftsService, ApprovedDraft } from "@/services/history.service";
import { HistoryTable } from "./component/HistoryTable";
import { toast } from "sonner";

export default function HistoryPage() {
  const { data: drafts = [], isLoading, error } = useQuery({
    queryKey: ["approved-drafts"],
    queryFn: GetApprovedDraftsService,
  });

  if (error) {
    toast.error("Failed to load approved drafts");
  }

  // Group drafts by week with proper typing
  const groupedByWeek: Record<string, ApprovedDraft[]> = drafts.reduce(
    (acc: Record<string, ApprovedDraft[]>, draft: ApprovedDraft) => {
      const date = new Date(draft.createdAt);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = `Week ${Math.ceil(date.getDate() / 7)}, ${date.getFullYear()}`;
      
      if (!acc[weekKey]) {
        acc[weekKey] = [];
      }
      acc[weekKey].push(draft);
      return acc;
    },
    {} as Record<string, ApprovedDraft[]>
  );

  const sortedWeeks = Object.entries(groupedByWeek).sort((a, b) => 
    b[0].localeCompare(a[0])
  );

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-12">
      <HistoryTable 
        groupedDrafts={Object.fromEntries(sortedWeeks)} 
        isLoading={isLoading}
      />
    </main>
  );
}