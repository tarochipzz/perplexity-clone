"use client";

import { JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

interface SidebarNavItemProps {
  icon: (props: { strokeWidth: number; color?: string }) => JSX.Element;
  label?: string;
  route?: string;
  children?: JSX.Element;
  subItems?: { label: string; route: string }[];
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon: Icon,
  label,
  route = "",
  subItems = [],
}) => {
  const { isExpanded, activeItem, setActiveItem } =
    useGlobalSettingStateStore();
  const hasSubItems = subItems.length > 0;
  const isActive = activeItem === label;

  return (
    <div className="flex flex-col hover:bg-actionBackroundLight rounded-xl">
      <div className="flex items-center justify-between w-full">
        <Link
          className="flex w-full"
          href={`/${route}`}
          onClick={() => setActiveItem(label || "")}
        >
          <button
            className={`flex items-center ${
              isExpanded ? "gap-3" : ""
            } cursor-pointer p-2 w-full text-gray-700 ${
              isActive ? "font-bold bg-actionBackround rounded-xl" : ""
            }`}
          >
            <Icon color="text-gray-700" strokeWidth={isActive ? 2 : 1.5} />
            <motion.div
              initial={false}
              animate={{
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? "auto" : 0,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap"
            >
              {label}
            </motion.div>
          </button>
        </Link>
      </div>
      <AnimatePresence>
        {hasSubItems && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex flex-col pl-6"
          >
            {subItems.map((subItem) => (
              <Link
                key={subItem.route}
                href={`/${subItem.route}`}
                onClick={() => setActiveItem(subItem.label)}
              >
                <button className="text-gray-600 text-sm p-2 ml-3 hover:text-primary">
                  {subItem.label}
                </button>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarNav: React.FC = () => {
  const searchThreads = useSearchStore((state) => state.searchThreads);
  const threadItems = searchThreads.map((thread) => ({
    label: thread.results[0]?.term,
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
      transition={{ duration: 0.3 }}
      className={`flex flex-col bg-background p-5 shadow-md ${
        isExpanded ? "gap-5" : "items-center gap-5"
      }`}
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
