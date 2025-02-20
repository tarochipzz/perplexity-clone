"use client";

import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { MoonIcon } from "./icons/moon";
import { SunIcon } from "./icons/sun";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <html lang="en">
      <head>
        <title>Perplexity</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hankenGrotesk.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 flex flex-col max-h-[100vh] justify-center">
            {children}
          </main>
          <button
            className="rounded-full bg-white bg-opacity-50 p-2 absolute bottom-5 right-5"
            onClick={() => setIsDarkMode((prev) => !prev)}
          >
            {isDarkMode ? (
              <SunIcon width={20} height={20} />
            ) : (
              <MoonIcon width={20} height={20} />
            )}
          </button>
        </div>
      </body>
    </html>
  );
}
