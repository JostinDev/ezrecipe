import "@/app/globals.css";
import Header from "./component/Header";
import NavTracker from "@/app/(app)/component/NavTracker";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: RootLayoutProps) {
  return (
    <div className="px-5">
      <NavTracker />
      <Header />
      <div className="mt-10 pb-10 md:mt-24">{children}</div>
    </div>
  );
}
