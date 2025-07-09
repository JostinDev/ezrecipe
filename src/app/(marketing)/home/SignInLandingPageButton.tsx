"use client";

import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function SignInLandingPageButton() {
  const router = useRouter();
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-pastelYellow text-title rounded-xl mt-10 px-8 py-4 font-inter font-bold border-2 transition border-title hover:drop-shadow-[4px_4px_0px] drop-shadow-shadow">
            Get Started
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <button
          onClick={() => router.push("/")}
          className="bg-pastelYellow text-title rounded-xl mt-10 px-8 py-4 font-inter font-bold border-2 transition border-title hover:drop-shadow-[4px_4px_0px] drop-shadow-shadow"
        >
          Go to website
        </button>
      </SignedIn>
    </div>
  );
}
