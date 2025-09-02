"use client";

import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";
import { useRouter } from "next/navigation";
import { storage } from "@/utils/sessionStorage";

export default function BackButton({ fallback = "/" }: { fallback?: string }) {
  const router = useRouter();

  const handleBack = () => {
    const navLink = storage.get("navLink");
    if (navLink) {
      router.push(storage.get("navLink")!);
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="flex items-center gap-1 py-2 pr-4 font-inter text-lg text-title sm:text-xl"
    >
      <Image src={chevron} alt="logo" width={20} height={20} />
      Back
    </button>
  );
}
