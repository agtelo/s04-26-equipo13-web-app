"use client";

import { motion } from "framer-motion";
import { HistoryDraftCard } from "./HistoryDraftCard";
import { ApprovedDraft } from "@/interfaces";

interface HistoryWeekGroupProps {
  weekId: string;
  weekDrafts: ApprovedDraft[];
}

export function HistoryWeekGroup({ weekId, weekDrafts }: HistoryWeekGroupProps) {
  return (
    <div className="space-y-6">
      {/* Week Header */}
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-serif italic text-primary">{weekId}</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
      </div>

      {/* Drafts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {weekDrafts.map((draft) => (
          <motion.div
            key={draft.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <HistoryDraftCard draft={draft} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}