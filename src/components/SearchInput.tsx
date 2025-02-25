"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchSource, SearchType, useSearchStore } from "../store/searchStore";
import {
  MOCK_RELATED_SEARCH,
  MOCK_SEARCH_RESULT_MARKDOWN,
  MOCK_SEARCH_RESULT_WEB_MARKDOWN,
} from "@/mockData/mock";
import { ButtonDropdown } from "./ButtonDropdown";
import { ChevronDownIcon } from "../icons/chevronDown";
import { PlusCircleIcon } from "../icons/plusCircle";
import { WebGlobeIcon } from "../icons/webGlobe";
import { AcademicCapIcon } from "../icons/academicCap";
import { SocialGraphIcon } from "../icons/socialGraph";
import { CheckIcon } from "@/icons/check";

const focusGlowEffect = `
  transition-all duration-500 ease-out group 
  focus-within:ring-2 focus-within:ring-opacity-60 focus-within:bg-gradient-to-r 
  focus-within:from-[rgba(110,231,183,0.3)] focus-within:via-[rgba(253,224,71,0.1)] focus-within:to-[rgba(255,255,255,0.2)]
  focus-within:bg-[length:200%_200%] focus-within:animate-glow-gradient focus-within:backdrop-blur-xl`;

const formatStringForURI = (input: string) =>
  input.toLowerCase().replace(/\s+/g, "-").slice(0, 24);

type queryType = {
  label: SearchType;
  description: string;
};

const queryTypes: queryType[] = [
  { label: "Auto", description: "Best for daily searches" },
  { label: "Pro search", description: "3x more sources and detailed answers" },
  { label: "Deep research", description: "In-depth reports on complex topics" },
  {
    label: "Reasoning with R1",
    description: "DeepSeek's new model hosted in the US",
  },
  {
    label: "Reasoning with o3-mini",
    description: "OpenAI's newest reasoning model",
  },
];

const QueryTypeButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { selectedValue: string }
> = ({ selectedValue, ...props }) => (
  <button
    className={`flex gap-1 items-center px-3 py-1 bg-background bg-opacity-60 dark:border dark:border-textGray text-textGray rounded-lg hover:bg-hover`}
    {...props}
  >
    <p className="text-sm text-textGray">{selectedValue}</p>
    <ChevronDownIcon
      className="text-textGray"
      width={12}
      height={12}
      strokeWidth={2}
    />
  </button>
);

const renderQueryTypeOptions = (
  option: queryType,
  onOptionClick: (value: string) => void,
  selectedValue: string
) => {
  const optionSelected = selectedValue === option.label;
  return (
    <button
      key={option.label}
      onClick={() => {
        onOptionClick(option.label);
      }}
      className="block bg-contentBackground w-full text-left p-2 text-sm hover:bg-hover hover:rounded-lg"
    >
      <div className="flex justify-between">
        <p
          className={`font-semibold ${
            optionSelected ? "text-primary" : "text-foreground"
          }`}
        >
          {option.label}
        </p>
        {optionSelected && (
          <CheckIcon className="text-foreground text-primary" width={16} />
        )}
      </div>
      <p className="text-xs text-textGray">{option.description}</p>
    </button>
  );
};

export const SearchInput = ({ isFollowup = false }) => {
  const transparent = !isFollowup;
  const openUpwards = isFollowup;
  const positionStyle = isFollowup
    ? "absolute bottom-20 md:bottom-10"
    : "relative";

  const [search, setSearch] = useState("");
  const [sources, setSources] = useState<SearchSource[]>(["Web"]);

  const addSearchThread = useSearchStore((state) => state.addSearchThread);
  const setThreadLoading = useSearchStore((state) => state.setThreadLoading);
  const setIsStreaming = useSearchStore((state) => state.setIsStreaming);
  const addSearchResult = useSearchStore((state) => state.addSearchResult);
  const addRelatedSearch = useSearchStore((state) => state.addRelatedSearch);

  const router = useRouter();

  const mockFetchResult = async (threadId: string, sources: SearchSource[]) => {
    setThreadLoading(true);
    setIsStreaming(true);

    try {
      const results =
        sources.length > 0
          ? MOCK_SEARCH_RESULT_WEB_MARKDOWN
          : MOCK_SEARCH_RESULT_MARKDOWN;

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setThreadLoading(false);

      let streamingContent = "";

      addSearchResult(threadId, {
        id: "0",
        content: streamingContent,
        type: "Auto",
      });
      addRelatedSearch(threadId, MOCK_RELATED_SEARCH);

      const chunks = results.split(/\n\s*\n/);

      for (const chunk of chunks) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        streamingContent += `${chunk}\n\n`; //
        addSearchResult(threadId, {
          id: "0",
          content: streamingContent,
          type: "Auto",
        });
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const SourcesButton: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement> & { selectedValue: string }
  > = ({ selectedValue, ...props }) => (
    <button
      className="flex items-center gap-2 px-3 py-1 text-textGray rounded-2xl hover:bg-hover"
      {...props}
    >
      {sources.length === 0 && (
        <PlusCircleIcon width={18} color="text-gray-700" />
      )}
      {sources.includes("Web") && (
        <WebGlobeIcon width={18} color="text-gray-700" />
      )}
      {sources.includes("Academic") && (
        <AcademicCapIcon width={18} color="text-gray-700" />
      )}
      {sources.includes("Social") && (
        <SocialGraphIcon width={18} color="text-gray-700" />
      )}
    </button>
  );

  const renderSourceOption = (option: SearchSource) => {
    const isActive = sources.includes(option);
    return (
      <div key={option} className="flex flex-col py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {option === "Web" && (
              <WebGlobeIcon
                className={isActive ? "text-primary" : "text-foreground"}
                width={18}
              />
            )}
            {option === "Academic" && (
              <AcademicCapIcon
                className={isActive ? "text-primary" : "text-foreground"}
                width={18}
              />
            )}
            {option === "Social" && (
              <SocialGraphIcon
                className={isActive ? "text-primary" : "text-foreground"}
                width={18}
              />
            )}
            <p
              className={`font-semibold text-sm ${
                isActive ? "text-primary" : "text-foreground"
              }`}
            >
              {option}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={() =>
                setSources((prev) =>
                  isActive
                    ? prev.filter((source) => source !== option)
                    : [...prev, option]
                )
              }
              className="sr-only"
            />
            <span
              className={`${
                isActive ? "bg-primary" : "bg-gray-400"
              } relative w-7 h-5 rounded-2xl flex items-center px-1 transition`}
            >
              <span
                className={`${
                  isActive ? "translate-x-2" : "translate-x-0"
                } inline-block w-3 h-3 bg-background rounded-full transition-transform`}
              />
            </span>
          </label>
        </div>
        <p className="text-xs text-textGray ml-7">
          {option === "Web" && "Across the entire internet"}
          {option === "Academic" && "Scholarly and research papers"}
          {option === "Social" && "Discussions and opinions"}
        </p>
      </div>
    );
  };

  return (
    <div
      className={`${positionStyle} w-[90vw] md:w-[40vw] p-2 rounded-2xl border border-gray-300 shadow-sm ${
        transparent
          ? `bg-background bg-opacity-60 backdrop-blur-lg backdrop-saturate-150 ${focusGlowEffect}`
          : "ring-4 ring-foreground ring-opacity-20 bg-contentBackground"
      }`}
    >
      <input
        className={`w-full p-2 rounded-lg bg-transparent ${
          transparent ? "placeholder-textGray" : ""
        }  focus:outline-none`}
        type="text"
        placeholder={isFollowup ? "Ask a follow-up" : "Ask anything..."}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            if (isFollowup) {
              // TODO: implement follow-up search
            } else {
              const formattedSearch = formatStringForURI(search);
              const id = `${formattedSearch}-${Date.now()}`;
              addSearchThread({ id, searchTerm: search });
              mockFetchResult(id, Object.keys(sources) as SearchSource[]);
              router?.push(`/search/${id}`);
            }
            setSearch("");
          }
        }}
      />
      <div className="flex items-center gap-3 mt-2">
        <ButtonDropdown
          defaultValue="Auto"
          ButtonComponent={QueryTypeButton}
          options={queryTypes}
          renderOption={renderQueryTypeOptions}
          openUpwards={openUpwards}
        />
        <ButtonDropdown
          defaultValue="Web"
          ButtonComponent={SourcesButton}
          options={["Web", "Academic", "Social"]}
          renderOption={renderSourceOption}
          openUpwards={openUpwards}
        />
      </div>
    </div>
  );
};
