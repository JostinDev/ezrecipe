import Link from "next/link";
import { SignOutButton, ClerkProvider } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="mx-auto flex max-w-[1536px] flex-row items-center justify-between px-5 pt-6">
      <Link href="/">
        <h1 className="font-ptSerif text-4xl text-title md:text-5xl">ezrecipe</h1>
      </Link>
      <div className="flex flex-row gap-8 pt-2">
        <ClerkProvider>
          <SignOutButton>
            <button className="rounded-xl border-2 border-title bg-pastelYellow px-6 py-2 font-inter font-bold text-title transition hover:drop-shadow-[4px_4px_0px]">
              Logout
            </button>
          </SignOutButton>
        </ClerkProvider>
      </div>
    </div>
  );
}
