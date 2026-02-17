import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Ye CSS load karega

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aegis Commerce",
  description: "Enterprise Merch Platform",
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