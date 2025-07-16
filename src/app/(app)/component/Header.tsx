import Link from "next/link";
import { SignOutButton, ClerkProvider } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="max-w-[1536px] mx-auto px-5 flex flex-row pt-6 justify-between items-center">
      <Link href="/">
        <h1 className="md:text-5xl text-4xl font-ptSerif text-title">
          ezrecipe
        </h1>
      </Link>
      <div className="flex flex-row gap-8 pt-2">
        <ClerkProvider>
          <SignOutButton>
            <button className="bg-pastelYellow text-title rounded-xl px-6 py-2 font-inter font-bold border-2 border-title transition hover:drop-shadow-[4px_4px_0px]">
              Logout
            </button>
          </SignOutButton>
        </ClerkProvider>
      </div>
    </div>
  );
}
