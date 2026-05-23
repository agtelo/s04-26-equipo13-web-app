"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Users, Linkedin, Twitter} from "lucide-react";
import { toast } from "sonner";
import { ChannelTabs } from "./ChannelTabs";
import { DraftEditor } from "./DraftEditor";
import { EmptyDraft } from "./DraftEmpty";
import { Draft , Channel} from "@/interfaces";



const CHANNELS = [
  { id: 'newsletter', name: 'Newsletter', icon: Mail, color: 'text-blue-500' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
  { id: 'twitter', name: 'Twitter (X)', icon: Twitter, color: 'text-sky-400' },
  { id: 'internal', name: 'Internal Feed', icon: Users, color: 'text-purple-500' },
];

const mockDrafts: Record<string, Draft> = {
  newsletter: {
    content: "This week in our community: We dove deep into React Server Components, explored 50 new LLM datasets, and had an incredible Cloud Infrastructure session. Here's your weekly digest...",
    status: "draft",
  },
  linkedin: {
    content: "Exciting week at TalentCircle! 🚀 Our community shared valuable insights on React Server Components and Cloud Infrastructure. Grateful for every member who contributes!",
    status: "draft",
  },
  twitter: {
    content: "This week's highlights from our community: ⚡ RSC best practices 📦 50 LLM datasets shared ☁️ Cloud Infra deep dive #TalentCircle #DevCommunity",
    status: "approved",
  },
  internal: {
    content: "",
    status: "draft",
  },
};

export function ContentDrafts() {
  const [activeChannel, setActiveChannel] = useState("newsletter");
  const [drafts, setDrafts] = useState(mockDrafts);

  const currentDraft = drafts[activeChannel];

  const handleChange = (value: string) => {
    setDrafts((prev) => ({
      ...prev,
      [activeChannel]: { ...prev[activeChannel], content: value },
    }));
  };

  const handleApprove = () => {
    setDrafts((prev) => ({
      ...prev,
      [activeChannel]: { ...prev[activeChannel], status: "approved" },
    }));
    toast.success("Draft approved!");
  };

  return (
    <Card className="rounded-[40px] border-none shadow-sm min-h-[500px] md:min-h-[700px] flex flex-col overflow-hidden">
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
        {!currentDraft.content ? (
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