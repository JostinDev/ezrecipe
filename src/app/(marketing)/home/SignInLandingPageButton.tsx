"use client";

import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/nextjs";

export default function SignInLandingPageButton() {
  const router = useRouter();

  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <SignInButton mode="modal">
        <button className="drop-shadow-shadow mt-10 rounded-xl border-2 border-title bg-pastelYellow px-8 py-4 font-inter font-bold text-title transition hover:shadow-[4px_4px_0px_#12100c]">
          Get Started
        </button>
      </SignInButton>
    );
  }

  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="drop-shadow-shadow mt-10 rounded-xl border-2 border-title bg-pastelYellow px-8 py-4 font-inter font-bold text-title transition hover:shadow-[4px_4px_0px_#12100c]">
            Get Started
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <button
          onClick={() => router.push("/")}
          className="drop-shadow-shadow mt-10 rounded-xl border-2 border-title bg-pastelYellow px-8 py-4 font-inter font-bold text-title transition hover:shadow-[4px_4px_0px_#12100c]"
        >
          Go to website
        </button>
      </SignedIn>
    </div>
  );
}
