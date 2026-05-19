"use client";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
}
