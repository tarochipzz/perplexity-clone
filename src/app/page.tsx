"use client";

import { SearchInput } from "@/components/SearchInput";

const trendingTopics = [
  { title: "Spotify Explores Premium Tier", link: "#" },
  { title: "ChatGPT Removes Content Warnings", link: "#" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full items-center justify-center h-[100vh]">
      <h2 className="text-4xl text-white font-hanken mb-5 [text-shadow:_0_0_12px_rgba(0,0,0,0.6)]">
        What do you want to know?
      </h2>
      <SearchInput />
    </div>
  );
}
