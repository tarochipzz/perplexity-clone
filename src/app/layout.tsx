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
  const [darkMode, setDarkMode] = useState(
    () =>
      (typeof window !== "undefined" &&
        (localStorage.theme === "dark" ||
          window.matchMedia("(prefers-color-scheme: dark)").matches)) ||
      false
  );

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const html = document?.documentElement;

  const toggleDarkMode = () => {
    if (typeof window === "undefined") return;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  useEffect(() => {
    if (darkMode && html) {
      html.classList.add("dark");
    }
  }, [darkMode]);

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
                <div className="absolute inset-0 -z-10 bg-cover bg-center bg-[url('/background.webp')]">
                  <div className="hidden dark:block absolute inset-0 bg-background opacity-60"></div>
                </div>
              )}
              {children}
            </main>
            <button
              className="rounded-full bg-background bg-opacity-50 p-2 absolute top-5 right-5 md:bottom-5 md:top-auto"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <SunIcon className="text-foreground" width={20} height={20} />
              ) : (
                <MoonIcon className="text-foreground" width={20} height={20} />
              )}
            </button>
          </div>
        )}
      </body>
    </html>
  );
}
