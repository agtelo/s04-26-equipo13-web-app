// components/HistoryTable.tsx

"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HistoryWeekGroup } from "./HistoryWeekGroup";
import { HistoryEmpty } from "./HistoryEmpty";
import { HistoryTableSkeleton } from "@/components/shared/skeletons/HistoryTableSkeleton";
import Link from "next/link";

interface HistoryTableProps {
  groupedDrafts: Record<string, any[]>;
  isLoading: boolean;
}

export function HistoryTable({ groupedDrafts, isLoading }: HistoryTableProps) {
  const totalDrafts = Object.values(groupedDrafts).flat().length;

  // Mostrar skeleton mientras carga
  if (isLoading) {
    return <HistoryTableSkeleton />;
  }

  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10"
    >
      <div className="lg:col-span-12 space-y-10">
        <Card className="rounded-[40px] border-none shadow-sm min-h-[700px] overflow-hidden flex flex-col">
          
          {/* HEADER */}
          <CardHeader className="flex flex-row items-center justify-between pb-10 pt-10 px-10 border-b">
            <div>
              <CardTitle className="text-3xl md:text-4xl font-serif italic mb-2">
                History
              </CardTitle>
              <CardDescription className="text-sm font-medium opacity-70">
                Archive of approved drafts
              </CardDescription>
            </div>
            <Link href="/dashboard">
              <Button 
                variant="outline"
                className="rounded-full px-8 h-12 uppercase font-black text-[10px] tracking-widest border-muted"
              >
                Back to Editor
              </Button>
            </Link>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="p-10 flex-1">
            <div className="space-y-12">
              {totalDrafts === 0 ? (
                <HistoryEmpty />
              ) : (
                Object.entries(groupedDrafts)
                  .map(([weekId, weekDrafts]) => (
                    <HistoryWeekGroup 
                      key={weekId} 
                      weekId={weekId} 
                      weekDrafts={weekDrafts}
                    />
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}