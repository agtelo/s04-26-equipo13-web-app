"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { RefreshCw } from "lucide-react";
import { ActivityCard } from "./ActivityCard";
import ActivityCardEmpty from "./ActivityCardEmpty";
import { Activity } from "@/interfaces/activity.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CommunityFeedService } from "@/services/communityfeed.service";
import { GenerationDraftNew } from "@/services/contentdraft.service";
import { toast } from "sonner";
import { ActivityCardSkeleton } from "@/components/skeletons/ActivityCardSkeleton";

const mockActivities: Activity[] = [
  {
    id: "1",
    author: "Carlos Tech",
    source: "Discord",
    type: "question",
    content:
      "What are the best practices for implementing React Server Components in a production environment?",
    reactions: 15,
    replies: 8,
    timestamp: "May 21, 10:30",
  },
  {
    id: "2",
    author: "Maria Data",
    source: "Slack",
    type: "resource",
    content:
      "I've compiled a list of 50 open-source LLM datasets for fine-tuning. Here's the link: talentcircle.dev/datasets",
    reactions: 42,
    replies: 12,
    timestamp: "May 21, 09:15",
  },
  {
    id: "3",
    author: "Alex Dev",
    source: "Internal Feed",
    type: "post",
    content:
      "Had an amazing session today about Cloud Infrastructure. Thanks everyone for joining and sharing your setups!",
    reactions: 28,
    replies: 5,
    timestamp: "May 20, 18:00",
  },
];

export function CommunityFeed() {
  const { data, isLoading } = useQuery({
    queryKey: ["communityfeed"],
    queryFn: CommunityFeedService,
  });
    const activities = data || [];

  const { mutate } = useMutation({
    mutationFn: GenerationDraftNew,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });

  const handleAIGenerate = () => mutate();

  return (
    <Card className="rounded-[40px] border-none shadow-sm overflow-hidden flex flex-col">
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
          className="rounded-full hover:bg-primary/10 text-primary"
        >
          <RefreshCw className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pt-0 px-8 pb-8 scrollbar-thin">
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
        {activities.length > 0 && (
          <Button
            onClick={handleAIGenerate}
            className="w-full mt-10 py-8 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl hover:shadow-2xl transition-all gap-3"
          >
            <Logo className="w-6 h-6" />
            Generate AI Drafts
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
