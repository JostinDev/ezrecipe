"use client";
import { SignOutButton, ClerkProvider } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="container mx-auto px-5 text-center">
      <h1 className="md:text-7xl sm:text-6xl text-5xl mb-8 text-center font-ptSerif font-bold text-title">
        Welcome to ezrecipe
      </h1>
      <h2 className="md:text-3xl sm:text-2xl text-xl text-center font-inter text-body">
        Your no-bullshit recipes saver
      </h2>
      <ClerkProvider>
        <SignOutButton>
          <button className="bg-pastelYellow text-title rounded-xl mt-10 px-8 py-4 font-inter font-bold border-2 transition border-title hover:drop-shadow-[4px_4px_0px] drop-shadow-shadow">
            Logout
          </button>
        </SignOutButton>
      </ClerkProvider>
    </div>
  );
}
