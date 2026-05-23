import Header from "@/components/shared/Header";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-background flex-col items-center justify-center relative">
      <Header />
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
