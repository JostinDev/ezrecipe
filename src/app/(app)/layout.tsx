import "@/app/globals.css";
import Header from "./component/Header";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <Header />
      <div className="mt-10 px-4 pb-10 md:mt-24">{children}</div>
    </div>
  );
}
