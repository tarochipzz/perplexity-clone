"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MoonIcon } from "@/icons/moon";
import { SunIcon } from "@/icons/sun";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => setMounted(true), []);

  return (
    <html lang="en">
      <head>
        <title>Perplexity</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${hankenGrotesk.variable} antialiased`}>
        {mounted && (
          <div className="flex flex-col md:flex-row w-full h-screen p-2 gap-2">
            <Sidebar />
            <main
              className={`flex-1 flex flex-col max-h-[100vh] overflow-y-auto ${
                !isHomePage ? "pb-[64px] md:pb-0" : ""
              }`}
            >
              {isHomePage && (
                <div className="absolute inset-0 -z-10 bg-cover bg-center bg-[url('/background.webp')]"></div>
              )}
              {children}
            </main>
            <button
              className="rounded-full bg-white bg-opacity-50 p-2 absolute top-5 right-5 md:bottom-5 md:top-auto"
              onClick={() => setIsDarkMode((prev) => !prev)}
            >
              {isDarkMode ? (
                <SunIcon width={20} height={20} />
              ) : (
                <MoonIcon width={20} height={20} />
              )}
            </button>
          </div>
        )}
      </body>
    </html>
  );
}
