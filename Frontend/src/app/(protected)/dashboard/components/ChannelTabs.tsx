import { Channel } from "@/interfaces";

interface ChannelTabsProps {
  channels: Channel[];
  active: string;
  onChange: (id: string) => void;
}

export function ChannelTabs({ channels, active, onChange }: ChannelTabsProps) {
  return (
    <div className="flex gap-2.5 flex-wrap justify-center p-1.5 bg-secondary/50 rounded-[24px]">
      {channels.map((channel) => (
        <button
          key={channel.id}
          onClick={() => onChange(channel.id)}
          className={`p-3 md:p-3.5 rounded-[18px] transition-all duration-300 ${
            active === channel.id
              ? "bg-primary text-primary-foreground shadow-lg scale-105"
              : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
          }`}
        >
          <channel.icon className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      ))}
    </div>
  );
}