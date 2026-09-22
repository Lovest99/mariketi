import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mariketi — Verified Livestock Marketplace",
  description: "Discover, verify and trade livestock with confidence across Zimbabwe.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
