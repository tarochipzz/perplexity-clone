"use client";

import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { ChevronDownIcon } from "./icons/chevronDown";
import { WebGlobeIcon } from "./icons/webGlobe";
import { AcademicCapIcon } from "./icons/academicCap";
import { SocialGraphIcon } from "./icons/socialGraph";
import { ButtonDropdown } from "./components/ButtonDropdown";

const trendingTopics = [
  { title: "Spotify Explores Premium Tier", link: "#" },
  { title: "ChatGPT Removes Content Warnings", link: "#" },
];

type queryType = {
  label: string;
  description: string;
};
const queryTypes = [
  { label: "Auto", description: "Best for daily searches" },
  { label: "Pro search", description: "3x more sources and detailed answers" },
  { label: "Deep Research", description: "In-depth reports on complex topics" },
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
    className="flex gap-1 items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
    {...props}
  >
    <p className="text-sm">{selectedValue}</p>
    <ChevronDownIcon width={12} height={12} />
  </button>
);

const renderQueryTypeOptions = (
  option: queryType,
  onOptionClick: (value: string) => void
) => (
  <button
    key={option.label}
    onClick={() => onOptionClick(option.label)}
    className="block w-full text-left py-2 text-sm hover:bg-gray-100"
  >
    <p className="font-medium">{option.label}</p>
    <p className="text-xs text-gray-500">{option.description}</p>
  </button>
);

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [sources, setSources] = useState({
    Web: true,
    Academic: false,
    Social: false,
  });

  const SourcesButton: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement> & { selectedValue: string }
  > = ({ selectedValue, ...props }) => (
    <button
      className="flex items-center gap-2 px-3 py-1 text-gray-600 rounded-2xl hover:bg-gray-200"
      {...props}
    >
      {sources.Web && <WebGlobeIcon width={18} color="text-gray-700" />}
      {sources.Academic && <AcademicCapIcon width={18} color="text-gray-700" />}
      {sources.Social && <SocialGraphIcon width={18} color="text-gray-700" />}
    </button>
  );

  const renderSourceOption = ([key, value]: [string, boolean]) => (
    <div key={key} className="flex flex-col py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {key === "Web" && (
            <WebGlobeIcon color={value ? "#20808D" : "gray"} width={18} />
          )}
          {key === "Academic" && (
            <AcademicCapIcon color={value ? "#20808D" : "gray"} width={18} />
          )}
          {key === "Social" && (
            <SocialGraphIcon color={value ? "#20808D" : "gray"} width={18} />
          )}
          {/* Title */}
          <p
            className={`font-bold text-sm ${
              value ? "text-primary" : "text-gray-500"
            }`}
          >
            {key}
          </p>
        </div>
        {/* Toggle switch */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xs text-gray-600"></span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={() =>
                setSources((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
              className="sr-only"
            />
            <span
              className={`${
                value ? "bg-primary" : "bg-gray-400"
              } relative w-7 h-5 rounded-2xl flex items-center px-1 transition`}
            >
              <span
                className={`${
                  value ? "translate-x-2" : "translate-x-0"
                } inline-block w-3 h-3 bg-white rounded-full transition-transform`}
              />
            </span>
          </label>
        </div>
      </div>
      <p className="text-xs text-gray-500 ml-7">
        {key === "Web" && "Across the entire internet"}
        {key === "Academic" && "Scholarly and research papers"}
        {key === "Social" && "Discussions and opinions"}
      </p>
    </div>
  );
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center p-10">
        <h2 className="text-3xl font-hanken mb-5">What do you want to know?</h2>
        <div className="relative w-full max-w-xl mx-auto p-2 bg-white rounded-2xl border border-gray-300 shadow-sm">
          <input
            type="text"
            placeholder="Ask anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded-lg focus:outline-none"
          />
          <div className="flex items-center gap-3 mt-2">
            <ButtonDropdown
              defaultValue="Auto"
              ButtonComponent={QueryTypeButton}
              options={queryTypes}
              renderOption={renderQueryTypeOptions}
            />
            <ButtonDropdown
              defaultValue="Web"
              ButtonComponent={SourcesButton}
              options={Object.entries(sources)}
              renderOption={renderSourceOption}
            />
          </div>
        </div>
        {/* Weather & Trending Topics */}
        <div className="flex gap-4 mt-6">
          <div className="p-4 flex items-center gap-2">
            <span>52°F Partly Cloudy</span>
          </div>
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="p-4 cursor-pointer hover:shadow-lg transition"
            >
              <a href={topic.link}>{topic.title}</a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
