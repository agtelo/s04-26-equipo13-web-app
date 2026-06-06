"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, Twitter, Users } from "lucide-react";
import { toast } from "sonner";
import { ChannelTabs } from "./ChannelTabs";
import { DraftEditor } from "./DraftEditor";
import { EmptyDraft } from "./DraftEmpty";
import { DraftI } from "@/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ContentDraftService,
  RegenerateDraft,
} from "@/services/contentdraft.service";
import { DraftEditorSkeleton } from "@/components/shared/skeletons/DraftEditorSkeleton";
import { useDraftStore } from "@/store/contentdraft.store";
import { PublishDraftService } from "@/services/publish.service";

const CHANNELS = [
  { id: "newsletter", name: "Newsletter", icon: Mail, color: "text-blue-500" },
  { id: "bluesky", name: "Bluesky", icon: Users, color: "text-sky-400" },
  { id: "twitter", name: "Twitter (X)", icon: Twitter, color: "text-sky-400" },
];

export function ContentDrafts() {
  const { drafts, setDrafts, updatedDraftContent, publishDraft } =
    useDraftStore();
  const [activeChannel, setActiveChannel] = useState("newsletter");

  const { data, isLoading } = useQuery({
    queryKey: ["contentdraft"],
    queryFn: ContentDraftService,
  });

  useEffect(() => {
    if (data) setDrafts(data);
  }, [data, setDrafts]);

  const currentDraft = drafts?.find(
    (d: DraftI) => d.typeContent === activeChannel,
  );

  const handleChange = (value: string) => {
    updatedDraftContent(activeChannel, value);
  };

  const query = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: PublishDraftService,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (data?.id && data?.content) {
        publishDraft(data.id, data.content);
      }
      query.invalidateQueries({
        queryKey: ["contentdraft"],
      });

      toast.success(data?.message || "Publicado ✅");
    },
  });

  const { mutate: mutateRegenerate, isPending: isPendindRegenerate } =
    useMutation({
      mutationFn: RegenerateDraft,
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

  const handleApprove = (
    id: string,
    isPublished: boolean,
    content: string,
    typeContent: string,
  ) => {
    mutate({
      id,
      content,
      typeContent: typeContent as
        | "bluesky"
        | "twitter"
        | "reddit"
        | "newsletter",
    });
  };

  const handleRegenerateDraft = (id: string) => {
    mutateRegenerate({ id });
  };

  return (
    <Card className="rounded-[40px] border-none shadow-sm min-h-125 md:min-h-175 flex flex-col overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-8 pb-10 pt-8 px-10 border-b">
        <div className="text-center sm:text-left">
          <CardTitle className="text-2xl md:text-3xl font-serif italic mb-1.5">
            Content Drafts
          </CardTitle>
          <CardDescription className="text-xs md:text-sm font-medium opacity-70">
            Review and approve drafts
          </CardDescription>
        </div>
        <ChannelTabs
          channels={CHANNELS}
          active={activeChannel}
          onChange={setActiveChannel}
        />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col pt-10 px-10 pb-10">
        {isLoading ? (
          <DraftEditorSkeleton />
        ) : !currentDraft ? (
          <EmptyDraft />
        ) : (
          <DraftEditor
            draft={currentDraft}
            activeChannel={activeChannel}
            channels={CHANNELS}
            onChange={handleChange}
            onApprove={handleApprove}
            isPending={isPending}
            handleRegenerateDraft={handleRegenerateDraft}
            isPendindRegenerate={isPendindRegenerate}
          />
        )}
      </CardContent>
    </Card>
  );
}

