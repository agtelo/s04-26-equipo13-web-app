"use client";
import { Button } from "@/components/ui/button";
import { fontSecondary } from "@/utils/font";
import { ArrowLeft, HouseIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <Image
          src="/logo.svg"
          alt="Logo Corporativo"
          width={60}
          height={60}
          className="text-[#DDD9D5]"
        />
      </div>
      <h1
        className={`${fontSecondary.className} antialiased text-[160px] text-[#DDD9D5] `}
      >
        404
      </h1>
      <h2
        className={`${fontSecondary.className} antialiased text-[32px] pb-2 `}
      >
        Lost in the Distillery?
      </h2>
      <p className="text-[16px] w-110 text-center text-[#48473E]">
        The content you're looking for has either been distilled into another
        form or never existed
      </p>
      <div className="flex items-center justify-around mt-4 gap-4">
        <Button className="py-2 px-4" variant="secondary" asChild>
          <Link href="/">
            <ArrowLeft />
            Go Back
          </Link>
        </Button>
        <Button className="py-2 px-4">
          <HouseIcon />
          Dashboard
        </Button>
      </div>
    </div>
  );
}
