import { Plus } from "lucide-react";

export function EmptyDraft() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 py-24">
      <div className="w-24 h-24 bg-secondary/40 rounded-full flex items-center justify-center mb-8 border border-border/50 shadow-inner">
        <Plus className="w-10 h-10 text-muted-foreground/20" />
      </div>
      <h3 className="text-2xl font-serif italic mb-3">No Drafts Yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
        Collect some activities and generate AI drafts to see the magic happen.
      </p>
    </div>
  );
}