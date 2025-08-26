import { ClerkProvider } from "@clerk/nextjs";
import FloatingFood from "./FloatingFood";
import SignInLandingPageButton from "./SignInLandingPageButton";

export default function Home() {
  return (
    <div className="container mx-auto overflow-hidden px-5">
      <div style={{ height: "100dvh" }} className="flex h-dvh flex-col items-center justify-center">
        <h1 className="mb-8 text-center font-ptSerif text-5xl font-bold text-title sm:text-6xl md:text-7xl">
          Welcome to ezrecipe
        </h1>
        <h2 className="text-center font-inter text-xl text-body sm:text-2xl md:text-3xl">
          Your no-bullshit recipes saver
        </h2>
        <ClerkProvider>
          <SignInLandingPageButton />
        </ClerkProvider>
      </div>
      <FloatingFood />
    </div>
  );
}
