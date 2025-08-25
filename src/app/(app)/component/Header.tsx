"use client";
import Link from "next/link";
import { SignOutButton, ClerkProvider } from "@clerk/nextjs";
import { Button } from "react-aria-components";

export default function Header() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-row items-center justify-between pt-6">
      <Link href="/">
        <h1 className="font-ptSerif text-[42px] text-title sm:text-5xl">ezrecipe</h1>
      </Link>
      <div className="flex flex-row gap-8 pt-2">
        <ClerkProvider>
          <SignOutButton>
            <Button className="rounded-xl border-2 border-title bg-pastelYellow px-6 py-2 font-inter font-bold text-title transition hover:shadow-[4px_4px_0px_#12100c]">
              Logout
            </Button>
          </SignOutButton>
        </ClerkProvider>
      </div>
    </div>
  );
}
