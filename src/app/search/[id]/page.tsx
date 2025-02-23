// https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
"use client";
import { useEffect, useRef, useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { MagnifyingGlassIcon } from "@/icons/magnifyingGlass";
import { PerplexityIcon } from "@/icons/perplexity";
import { useSearchStore } from "@/store/searchStore";
import { useParams } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const ContentStream = ({
  markdownContent,
  isStreaming,
  scrollRef,
}: {
  markdownContent: string;
  isStreaming: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) => {
  if (!markdownContent || markdownContent === "") return <></>;

  const [displayedContent, setDisplayedContent] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const fullContentRef = useRef("");
  const currentIndexRef = useRef(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const updateTyping = () => {
      const allWords = markdownContent.split(" ");
      interval = setInterval(() => {
        if (currentIndexRef.current < allWords.length) {
          fullContentRef.current += allWords[currentIndexRef.current] + " ";
          setDisplayedContent(fullContentRef.current);
          currentIndexRef.current += 1;

          scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        } else {
          clearInterval(interval);
        }
      }, 20);
    };

    if (isStreaming) {
      updateTyping();
    } else {
      fullContentRef.current = markdownContent;
      currentIndexRef.current = markdownContent.split(" ").length;
      setDisplayedContent(markdownContent);
    }
    return () => clearInterval(interval);
  }, [markdownContent, isStreaming]);

  return (
    <div ref={contentRef} className="relative transition-all">
      <MarkdownRenderer markdownContent={displayedContent} />
    </div>
  );
};

export default function SearchThread() {
  const params = useParams();
  const scrollableComponentRef = useRef<HTMLDivElement>(null);

  const { getSearchThread, threadLoading, isStreaming } = useSearchStore();

  const searchThread = getSearchThread(params.id as string);
  const markdownContent = searchThread?.results?.[0]?.content || "";
  const relatedSearches = searchThread?.relatedSearches || [];

  if (!searchThread) return <div></div>;
  return (
    <div
      ref={scrollableComponentRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 pb-[200px] mx-4 md:mx-20 overflow-y-auto scrollbar-hide"
    >
      {/* L Section, 2x width on desktop */}
      <div className="md:col-span-2 flex flex-col">
        <div className="flex items-center gap-2 py-6">
          <MagnifyingGlassIcon />
          <h1 className="text-2xl font-semibold p-2">
            {searchThread?.searchTerm}
          </h1>
        </div>
        {threadLoading ? (
          <div className="flex text-gray-700">
            <PerplexityIcon className="animate-spin" /> <div>...</div>
          </div>
        ) : (
          <ContentStream
            markdownContent={markdownContent}
            isStreaming={isStreaming}
            scrollRef={scrollableComponentRef}
          />
        )}
      </div>

      {/* R Section (stacks below on mobile) */}
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

      {/* Search Input is always at bottom */}
      <SearchInput isFollowup />
    </div>
  );
}
