import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Inter } from "next/font/google";
import "./main.scss";

const inter = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
