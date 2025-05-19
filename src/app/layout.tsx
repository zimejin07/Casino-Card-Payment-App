import "./globals.css";
import "./theme.css";
import "./animation.css";
import "../../lib/fontawesome";

import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import ToastProvider from "./payment-methods/components/ToastProvider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Casumo – Payment Methods",
  description: "Manage your saved credit cards",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
