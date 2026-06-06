import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

export default function LandingHeader() {
  return (
    <header className="border-b bg-card px-6 md:px-12 py-5 md:py-8 flex flex-col md:flex-row items-center justify-between sticky top-0 z-30 gap-6">
      <div className="flex items-center gap-4 self-start md:self-auto">
        <Logo className="text-primary w-8 h-8 md:w-10 md:h-10" />
        <div>
          <h1 className="text-xl md:text-2xl font-serif italic font-medium leading-none mb-1">
            Distiller
          </h1>
          <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">
            Automated Community Editor
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <a
          href="#how"
          className="text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground transition"
        >
          How it works
        </a>
        <ModeToggle />
        <Button asChild variant="outline" size="sm" className="uppercase font-bold">
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </header>
  );
}
