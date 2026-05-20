"use client";

import { useTransition } from "react";
import { LogoutService } from "@/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const message = await LogoutService();
        toast.success(message);
        router.push("/login");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Logout failed"
        );
      }
    });
  };

  return (
    <DropdownMenuItem
      onSelect={handleLogout}
      disabled={isPending}
      className={className}
    >
      <LogOut className="w-4 h-4" />
      {isPending ? "Signing out..." : "sign out of distiller"}
    </DropdownMenuItem>
  );
}