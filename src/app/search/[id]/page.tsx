// https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
"use client";

import { SearchInput } from "@/app/components/SearchInput";
import { MagnifyingGlassIcon } from "@/app/icons/magnifyingGlass";
import { PerplexityIcon } from "@/app/icons/perplexity";
import { useSearchStore } from "@/app/store/searchStore";
import { useParams } from "next/navigation";

export default function SearchThread() {
  const params = useParams();
  const { getSearchThread, threadLoading } = useSearchStore();
  const searchThread = getSearchThread(params.id as string);

  if (threadLoading) return <p>Loading...</p>;
  if (!searchThread) return <p>No results found.</p>;

  const { results, relatedSearches } = searchThread;
  const result = results[0]; // Assuming single result
  if (!result) return <p>No results found.</p>;
  const { term, content } = result;
  const { introduction, content: sections } = content;

  return (
    <div className="flex flex-col align-left pt-20 pb-[200px] mx-20 overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-2 py-6">
        <MagnifyingGlassIcon />
        <input
          type="'text"
          className="text-2xl w-fit font-bold p-2 focus:outline-none rounded-xl border border-gray"
          value={term}
        />
      </div>

      <p className="mt-2 text-gray-700">{introduction}</p>
      {sections.map((section, index) => (
        <div key={index} className="mt-2 text-gray-700">
          <h2 className="text-md font-semibold">{section.title}</h2>
          <ul className="mt-2 list-disc list-inside space-y-2">
            {section.data.map((item, i) => (
              <li key={i}>
                <span className="text-sm font-semibold">
                  {item.subtitle ? `${item.subtitle}: ` : ""}
                </span>
                {item.description}
                {item.sources?.length > 0 && (
                  <sup className="ml-1 text-sm text-gray-500">
                    {item.sources.map((s) => `[${s}]`).join(" ")}
                  </sup>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {relatedSearches.length > 0 && (
        <div className="mt-8 border-t pt-4 text-gray-700">
          <h2 className="text-lg font-semibold">Related</h2>
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
