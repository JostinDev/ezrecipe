import "@/app/globals.css";

import Header from "./component/Header";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <Header />
      <div className="px-4 mt-24">{children}</div>
    </div>
  );
}
