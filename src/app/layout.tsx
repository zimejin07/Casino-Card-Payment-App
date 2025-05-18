import "./globals.css";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Casumo – Payment Methods",
  description: "Manage your saved credit cards in style",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F5F7FA] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
