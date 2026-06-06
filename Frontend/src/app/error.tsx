"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6">
          <div className="text-center space-y-4 max-w-md">
            <Logo className="w-16 h-16 mx-auto text-primary opacity-80" />
            <h1 className="text-3xl font-serif italic font-light">
              Oops, something went wrong
            </h1>
            <p className="text-sm text-muted-foreground">
              {error.message || "An unexpected error occurred. Our team has been notified."}
            </p>
            {error.digest && (
              <p className="text-[10px] text-muted-foreground/50 font-mono">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={reset}
              className="rounded-full px-8 font-bold uppercase tracking-widest text-[10px]"
            >
              Try Again
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 font-bold uppercase tracking-widest text-[10px]"
            >
              <a href="/">Back Home</a>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
