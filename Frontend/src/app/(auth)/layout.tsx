import { ModeToggle } from "@/components/shared/ModeToggle";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>
      {children}
    </div>
  );
}
