import { MessageSquare, ThumbsUp} from "lucide-react";
import { Activity } from "@/interfaces";
import { formatDate } from "@/utils/formatDate";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="p-6 bg-secondary/30 rounded-[32px] border border-transparent hover:border-primary/10 transition-all shadow-sm hover:shadow-md group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center font-bold text-xs shadow-sm border border-border/50">
            {activity.author.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold leading-tight mb-0.5">
              {activity.author}
            </p>
            <p className="text-[10px] text-muted-foreground font-mono font-bold uppercase tracking-wider opacity-60">
              {activity.source}
            </p>
          </div>
        </div>
        <span className="text-[9px] uppercase tracking-widest font-black border border-primary/20 text-primary h-6 px-4 rounded-full flex items-center">
          {activity.type}
        </span>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed font-medium">
        {activity.content}
      </p>

      <div className="flex items-center gap-5 text-[10px] font-mono text-muted-foreground/50">
        <span className="flex items-center gap-1.5 group-hover:text-primary transition-colors font-black">
          <ThumbsUp className="w-3.5 h-3.5" /> {activity.reactions}  
        </span>
        <span className="flex items-center gap-1.5 group-hover:text-primary transition-colors font-black">
          <MessageSquare className="w-3.5 h-3.5" /> {activity.replies}
        </span>
        <span className="font-bold">{formatDate(activity.timestamp)}</span>
      </div>
    </div>
  );
}