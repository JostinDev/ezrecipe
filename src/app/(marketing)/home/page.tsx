import { ClerkProvider } from "@clerk/nextjs";
import FloatingFood from "./FloatingFood";
import SignInLandingPageButton from "./SignInLandingPageButton";

export default function Home() {
  return (
    <div className="container mx-auto px-5">
      <div className="flex items-center flex-col justify-center h-screen">
        <h1 className="md:text-7xl sm:text-6xl text-5xl mb-8 text-center font-ptSerif font-bold text-title">
          Welcome to ezrecipe
        </h1>
        <h2 className="md:text-3xl sm:text-2xl text-xl text-center font-inter text-body">
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
