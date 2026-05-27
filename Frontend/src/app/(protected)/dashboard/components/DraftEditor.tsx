import { Copy, CheckCircle2, Sparkles, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Channel, DraftI } from "@/interfaces";
import { ModalApprovedDraft } from "@/components/shared";

interface DraftEditorProps {
  draft: DraftI;
  activeChannel: string;
  channels: Channel[];
  onChange: (value: string) => void;
  onApprove: (
    id: string,
    isPublished: boolean,
    content: string,
    type: string,
  ) => void;
  isPending: boolean;
  isPendindRegenerate: boolean;
  handleRegenerateDraft: (id: string) => void;
}

export function DraftEditor({
  draft,
  activeChannel,
  channels,
  onChange,
  onApprove,
  isPending,
  handleRegenerateDraft,
  isPendindRegenerate,
}: DraftEditorProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(draft.content);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground mb-0.5">
            {channels.find((c) => c.id === activeChannel)?.name}
          </h3>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
            Active Template
          </p>
        </div>
        {draft.is_published && (
          <span className="bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full px-5 h-8 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
          </span>
        )}
      </div>
      <Textarea
        className="flex-1 w-full p-8 bg-secondary/10 rounded-[32px] border-none text-base leading-relaxed resize-none focus-visible:ring-primary/10 transition-all min-h-75 shadow-inner"
        value={draft.content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing..."
      />
      <Separator className="my-8" />
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="rounded-full text-[10px] font-black uppercase tracking-widest px-8 h-12 gap-2"
          >
            <Copy className="w-4 h-4" /> Copy
          </Button>
          {!draft.is_published &&
            (!isPendindRegenerate ? (
              <Button
                onClick={() => handleRegenerateDraft(draft.id)}
                variant="outline"
                className="rounded-full text-[10px] font-black uppercase tracking-widest px-8 h-12 gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                AI Draft
              </Button>
            ) : (
              <Button
                variant="outline"
                className="rounded-full text-[10px] font-black uppercase tracking-widest px-8 h-12 gap-2 group"
              >
                <StarIcon size={6} className="animate-spin" />
                <StarIcon size={6} className="animate-spin" />
                <StarIcon size={6} className="animate-spin" />
              </Button>
            ))}
        </div>
        <ModalApprovedDraft
          isPublished={draft.is_published}
          id={draft.id}
          content={draft.content}
          typeContent={draft.typeContent}
          onApprove={onApprove}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
