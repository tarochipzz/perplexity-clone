// https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
"use client";

import { SearchInput } from "@/app/components/SearchInput";
import { TypingText } from "@/app/components/TypingText";
import { MagnifyingGlassIcon } from "@/app/icons/magnifyingGlass";
import { PerplexityIcon } from "@/app/icons/perplexity";
import { useSearchStore } from "@/app/store/searchStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchThread() {
  const params = useParams();
  const { getSearchThread, threadLoading, isStreaming } = useSearchStore();

  const searchThread = getSearchThread(params.id as string);

  const [markdownContent, setMarkdownContent] = useState("");
  const [relatedSearches, setRelatedSearches] = useState([]);

  useEffect(() => {
    if (!threadLoading) {
      const searchThread = getSearchThread(params.id as string);
      if (!searchThread) return;

      const { results, relatedSearches } = searchThread;
      const result = results[0];
      console.log(result.content);
      setMarkdownContent(result.content);
      setRelatedSearches(relatedSearches);
    }
  }, [threadLoading]);

  return (
    <div className="grid grid-cols-3 gap-8 pt-20 pb-[200px] mx-20 overflow-y-auto scrollbar-hide">
      {/* Left Section: 2x width */}
      <div className="col-span-2 flex flex-col">
        <div className="flex items-center gap-2 py-6">
          <MagnifyingGlassIcon />
          <input
            type="text"
            className="text-2xl w-fit font-bold p-2 focus:outline-none rounded-xl border border-gray"
            value={searchThread?.searchTerm}
            readOnly
          />
        </div>

        {threadLoading ? (
          <div className="flex text-gray-700">
            <PerplexityIcon className="animate-spin" /> <div>...</div>
          </div>
        ) : isStreaming ? (
          <TypingText text={markdownContent} />
        ) : (
          markdownContent
        )}
      </div>

      {/* Right Section: 1x width */}
      {!!relatedSearches?.length && (
        <div className="pt-4 text-gray-700">
          <h2 className="text-lg font-semibold">Related Searches</h2>
          <ul className="mt-2 space-y-2">
            {relatedSearches[0].map((query, index) => (
              <li
                key={index}
                className="text-primary cursor-pointer hover:underline"
              >
                {query}
              </li>
            ))}
          </ul>
        </div>
      )}
      <SearchInput isFollowup />
    </div>
  );
}
