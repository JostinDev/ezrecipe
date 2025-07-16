import "@/app/globals.css";

import Header from "./component/Header";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <Header />
      <div className="relative max-w-[1800px] px-4 pt-[121px] md:pt-[180px]">
        {children}
      </div>
    </div>
  );
}
