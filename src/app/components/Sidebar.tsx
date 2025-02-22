"use client";

import { JSX } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlobeIcon } from "../icons/globe";
import { SquaresIcon } from "../icons/squares";
import { BookmarkIcon } from "../icons/bookmark";
import { ThreadIcon } from "../icons/thread";
import { PerplexityLogo } from "../icons/perplexityLogo";
import { PerplexityIcon } from "../icons/perplexity";
import { ChevronLeftIcon } from "../icons/chevronLeft";
import { ChevronRightIcon } from "../icons/chevronRight";
import { HomeIcon } from "../icons/home";
import { useSearchStore } from "../store/searchStore";
import { useGlobalSettingStateStore } from "../store/settingStorage";
import { usePathname } from "next/navigation";

interface SidebarNavItemProps {
  icon: (props: { strokeWidth: number; color?: string }) => JSX.Element;
  label: string;
  route?: string;
  subItems?: { label: string; route: string }[];
}

const labelToPathMapping: Record<string, string> = {
  "": "home",
  search: "threads",
};

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon: Icon,
  label,
  route = "",
  subItems = [],
}) => {
  const { isExpanded } = useGlobalSettingStateStore();
  const fullPath = usePathname().replace(/^\/+/, "") || "";

  const [parentPath, childPath] = fullPath
    .split("/")
    .map((pathSegment) => labelToPathMapping[pathSegment] || pathSegment);

  const isActiveParent = parentPath.toLowerCase() === label.toLowerCase();
  const hasSubItems = subItems.length > 0;

  return (
    <div className="flex flex-col rounded-xl">
      <div className="flex items-center justify-between w-full hover:bg-actionBackroundLight rounded-xl">
        <Link className="flex w-full" href={`/${route}`}>
          <button
            className={`flex items-center ${
              isExpanded ? "gap-3" : ""
            } cursor-pointer p-2 w-full text-gray-700 ${
              isActiveParent ? "font-bold" : ""
            } ${
              isActiveParent && (!childPath || !isExpanded)
                ? "bg-actionBackround rounded-xl"
                : ""
            }`}
          >
            <Icon
              color="text-gray-700"
              strokeWidth={isActiveParent ? 2 : 1.5}
            />
            <motion.div
              initial={false}
              animate={{
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? "auto" : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap truncate"
            >
              {label}
            </motion.div>
          </button>
        </Link>
      </div>

      {hasSubItems && isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="flex flex-col pl-6 w-full"
        >
          {subItems.map((subItem) => (
            <Link
              key={subItem.route}
              href={`/${subItem.route}`}
              className="w-full"
            >
              <button
                className={`text-gray-600 text-sm p-2 w-full text-left whitespace-nowrap truncate hover:bg-actionBackroundLight rounded-lg ${
                  fullPath === subItem.route ? "bg-actionBackround" : ""
                }`}
              >
                {subItem.label}
              </button>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const SidebarNav: React.FC = () => {
  const searchThreads = useSearchStore((state) => state.searchThreads);
  const threadItems = searchThreads.map((thread) => ({
    label: thread.searchTerm,
    route: `search/${thread.id}`,
  }));
  return (
    <nav className="flex justify-between flex-col h-full">
      <div className="space-y-5 p-2">
        <SidebarNavItem icon={HomeIcon} label="Home" />
        <SidebarNavItem icon={GlobeIcon} label="Discover" route="discover" />
        <SidebarNavItem icon={SquaresIcon} label="Spaces" route="spaces" />
        <SidebarNavItem
          icon={BookmarkIcon}
          label="Bookmarks"
          route="bookmarks"
        />
        <SidebarNavItem
          icon={ThreadIcon}
          label="Threads"
          route="search"
          subItems={threadItems}
        />
      </div>
    </nav>
  );
};

export const Sidebar: React.FC = () => {
  const { isExpanded, toggleSidebar } = useGlobalSettingStateStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 256 : 70 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`flex flex-col p-5 shadow-xl rounded-2xl
        ${isExpanded ? "gap-5" : "items-center gap-5"}
        bg-white/60 backdrop-blur-lg backdrop-saturate-150`}
    >
      <div className="flex items-center gap-3">
        {isExpanded ? (
          <>
            <PerplexityLogo height={50} width={165} />
            <button onClick={toggleSidebar}>
              <ChevronLeftIcon />
            </button>
          </>
        ) : (
          <button
            onClick={toggleSidebar}
            className="mb-5 flex items-center relative"
          >
            <PerplexityIcon width={32} height={32} />
            <ChevronRightIcon
              className="absolute left-7"
              width={12}
              height={12}
              strokeWidth={3}
            />
          </button>
        )}
      </div>

      <SidebarNav />
    </motion.aside>
  );
};
