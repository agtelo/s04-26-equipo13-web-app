"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { ChannelTabs } from "./ChannelTabs";
import { DraftEditor } from "./DraftEditor";
import { EmptyDraft } from "./DraftEmpty";
import { DraftI } from "@/interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ContentDraftService,
  IsPublishedDraftService,
} from "@/services/contentdraft.service";

const CHANNELS = [
  { id: "newsletter", name: "Newsletter", icon: Mail, color: "text-blue-500" },
  { id: "twitter", name: "Twitter (X)", icon: Twitter, color: "text-sky-400" },
  { id: "reddit", name: "reddit", icon: Linkedin, color: "text-blue-700" },
];

export function ContentDrafts() {
  const [activeChannel, setActiveChannel] = useState("newsletter");
  const [drafts, setDrafts] = useState<Array<DraftI>>();
  const { data } = useQuery({
    queryKey: ["contentdraft"],
    queryFn: ContentDraftService,
  });

  useEffect(() => {
    if (data) setDrafts(data);
    console.log({ drafts });
  }, [data]);

  const currentDraft = drafts?.find(
    (d: DraftI) => d.typeContent === activeChannel,
  );

  const handleChange = (value: string) => {
    setDrafts((prev) =>
      prev?.map((draft) =>
        draft.typeContent === activeChannel
          ? { ...draft, content: value }
          : draft,
      ),
    );
  };

  const { mutate } = useMutation({
    mutationFn: IsPublishedDraftService,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });

  const handleApprove = (
    id: string,
    isPublished: boolean,
    content: string,
    type: string,
  ) => {
    mutate({ id, isPublished, content, type });
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
        {!currentDraft ? (
          <EmptyDraft />
        ) : (
          <DraftEditor
            draft={currentDraft}
            activeChannel={activeChannel}
            channels={CHANNELS}
            onChange={handleChange}
            onApprove={handleApprove}
          />
        )}
      </CardContent>
    </Card>
  );
}
