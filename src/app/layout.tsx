// Import CSS files for global styles and specific theme-related styles
import "./globals.css";
import "./theme.css";
import "./animation.css";

// Import FontAwesome library
import "../../lib/fontawesome";

// Import necessary types from React
import type { ReactNode } from "react";

// Import and configure Inter font from Google Fonts
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// Define metadata for the application
export const metadata = {
  title: "Casumo – Payment Methods",
  description: "Manage your saved credit cards",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>{children}</body>
    </html>
  );
}
