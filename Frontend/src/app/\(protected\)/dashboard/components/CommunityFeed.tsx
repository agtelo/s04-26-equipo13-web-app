"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/shared/Logo";
import { RefreshCw } from "lucide-react";
import { ActivityCard } from "./ActivityCard";
import ActivityCardEmpty from "./ActivityCardEmpty";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommunityFeedService } from "@/services/communityfeed.service";
import { GenerationDraftNew } from "@/services/contentdraft.service";
import { toast } from "sonner";
import { ActivityCardSkeleton } from "@/components/shared/skeletons/ActivityCardSkeleton";

export function CommunityFeed() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["communityfeed"],
    queryFn: CommunityFeedService,
  });
  const activities = data || [];

  const query = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: GenerationDraftNew,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      query.invalidateQueries({
        queryKey: ["contentdraft"],
      });
      toast.success(data?.message);
    },
  });

  // Función para refrescar solo el feed
  const handleRefresh = () => {
    query.invalidateQueries({
      queryKey: ["communityfeed"],
    });
  };

  // Función para generar drafts de IA
  const handleAIGenerate = () => mutate();

  return (
    <div className="p-1.78 flex flex-col gap-6">
      <Card className="h-210 rounded-[40px] border-none shadow-sm overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-8 pt-8 px-8">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-serif italic mb-1.5">
              Community Feed
            </CardTitle>
            <CardDescription className="text-xs md:text-sm font-medium opacity-70">
              Weekly activity summary
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isFetching}
            className="rounded-full hover:bg-primary/10 text-primary"
          >
            <RefreshCw
              className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`}
            />
          </Button>
        </CardHeader>
        <ScrollArea className="min-h-0 flex-1">
          <CardContent className="flex flex-col pt-0 px-8 pb-8">
            {isLoading ? (
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ActivityCardSkeleton key={i} />
                ))}
              </div>
            ) : activities.length === 0 ? (
              <ActivityCardEmpty />
            ) : (
              <div className="space-y-6">
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            )}
          </CardContent>
        </ScrollArea>
        <CardFooter className=" bg-card flex border-none items-center justify-end pt-0 px-8 pb-8">
          {activities.length > 0 &&
          (isPending ? (
            <Button
              disabled
              onClick={handleAIGenerate}
              className="w-full py-8 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl hover:shadow-2xl transition-all gap-3"
            >
              <Logo className="animate-spin" />
              Generating draft
            </Button>
          ) : (
            <Button
              onClick={handleAIGenerate}
              className="w-full rounded-full py-8  font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl hover:shadow-2xl transition-all gap-3"
            >
              <Logo className="w-6 h-6" />
              Generate AI Drafts
            </Button>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}
