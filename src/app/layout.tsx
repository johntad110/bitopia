import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bitopia - Tap to Earn",
  description: "A captivating play-to-earn game where users tap to earn digital tokens, promoting the widespread adoption and integration of Bitcoin in a fun and engaging way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/favicon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/favicon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/favicon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/favicon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/favicon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/favicon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/favicon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/favicon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon-180x180.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
