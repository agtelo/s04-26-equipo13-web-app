"use client";

import { Mail, Twitter, Users, Copy, ExternalLink, File, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CHANNELS = [
  { id: "newsletter", name: "Newsletter", icon: Mail, color: "text-blue-500" },
  { id: "bluesky", name: "Bluesky", icon: Users, color: "text-sky-400" },
  { id: "twitter", name: "Twitter (X)", icon: Twitter, color: "text-sky-400" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-600" },
];

interface HistoryDraftCardProps {
  draft: {
    id: number;
    typeContent: "newsletter" | "twitter" | "bluesky" | "linkedin" | "reddit";
    content: string;
    createdAt: string;
  };
}

export function HistoryDraftCard({ draft }: HistoryDraftCardProps) {
  const channel = CHANNELS.find(c => c.id === draft.typeContent);
  const IconComponent = channel?.icon || File;

  const handleCopy = () => {
    navigator.clipboard.writeText(draft.content);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="group p-8 bg-secondary/20 rounded-[32px] border border-border/30 hover:border-primary/20 transition-all flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center bg-card shadow-sm border border-border/50",
            channel?.color
          )}>
            <IconComponent className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none mb-1">
              {channel?.name || draft.typeContent}
            </p>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
              Approved
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed mb-8 flex-1 italic">
        "{draft.content}"
      </p>

      {/* Footer - Buttons */}
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCopy}
          className="flex-1 rounded-2xl h-10 text-[9px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all"
        >
          <Copy className="w-3.5 h-3.5 mr-2" /> Copy
        </Button>
        <Link href="/dashboard" className="flex-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full rounded-2xl h-10 text-[9px] font-black uppercase tracking-widest hover:bg-secondary/80 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-2" /> View
          </Button>
        </Link>
      </div>
    </div>
  );
}