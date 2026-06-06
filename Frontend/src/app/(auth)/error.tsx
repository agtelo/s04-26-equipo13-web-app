"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif italic font-light">
          Something went wrong
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={reset}
          className="rounded-full px-8 font-bold uppercase tracking-widest text-[10px]"
        >
          Try again
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full px-8 font-bold uppercase tracking-widest text-[10px]"
        >
          <Link href="/login">Back to login</Link>
        </Button>
      </div>
    </div>
  );
}
