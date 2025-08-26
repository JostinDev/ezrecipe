"use client";

import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
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
