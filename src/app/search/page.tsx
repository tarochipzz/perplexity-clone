"use client";

import { MagnifyingGlassIcon } from "@/icons/magnifyingGlass";
import { useSearchStore } from "@/store/searchStore";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

const debounce = <T extends (...args: any[]) => void>(
  callbackFn: T,
  ms = 200
) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callbackFn(...args), ms);
  };
};

export default function Search() {
  const { searchThreads } = useSearchStore();

  const [searchInput, setSearchInput] = useState("");
  const [visibleThreads, setVisibleThreads] = useState(searchThreads);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setVisibleThreads(searchThreads);
    } else {
      const filteredThreads = searchThreads.filter((thread) =>
        thread.searchTerm.toLowerCase().includes(searchInput.toLowerCase())
      );
      setVisibleThreads(filteredThreads);
    }
  }, [searchInput, searchThreads]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="flex flex-col gap-8 py-20 px-[10%] md:px-[20%]">
      <div className="flex relative items-center">
        <input
          type="text"
          placeholder="Search your threads..."
          className="flex items-center border pl-[40px] py-1 rounded-2xl w-full outline-none focus:outline-none focus:ring-primary"
          value={searchInput}
          onChange={handleChange}
        />
        <div className="left-md absolute flex items-center rounded-l-lg p-1">
          <MagnifyingGlassIcon height={18} color="gray" />
        </div>
      </div>
      <div>
        {searchThreads.length === 0 ? (
          <p className="text-gray-500 px-2 text-sm">No threads yet.</p>
        ) : (
          visibleThreads.map((thread) => (
            <Link key={thread.id} href={`/search/${thread.id}`}>
              <div
                key={thread.id}
                className="border cursor-pointer rounded p-4 mb-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {thread.searchTerm}
                </h3>
                <ul>
                  {thread.results.map((result) => (
                    <li key={result.id} className="mb-2">
                      <p className="text-textGray text-sm mb-1 line-clamp-2">
                        {result.content}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {result.timestamp}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
