import { Inter, PT_Serif } from "next/font/google";
import "./globals.css";

const ptSerif = PT_Serif({
  weight: ["400", "700"], // or just ['400'] if you only need one
  style: ["normal"], // or just ['normal'] if you only need one
  subsets: ["latin"],
  variable: "--font-ptSerif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ptSerif.variable} scroll-smooth`}>
        <div className="fixed inset-0 z-[-100] bg-background bg-[url(/noisy-texture-200x200.png)] bg-[length:200px_200px] bg-repeat"></div>
        {children}
      </body>
    </html>
  );
}
