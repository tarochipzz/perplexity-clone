"use client";

import { JSX, useEffect, useState } from "react";
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
      <div className="flex items-center justify-between w-full hover:bg-hover rounded-xl">
        <Link className="flex w-full" href={`/${route}`}>
          <button
            className={`flex items-center ${
              isExpanded ? "gap-3" : ""
            } cursor-pointer p-2 w-full text-textGrayDark ${
              isActiveParent ? "font-bold" : ""
            } ${
              isActiveParent && (!childPath || !isExpanded)
                ? "bg-active rounded-xl"
                : ""
            }`}
          >
            <Icon
              color="text-textGrayDark"
              strokeWidth={isActiveParent ? 2 : 1.5}
            />
            <motion.div
              initial={false}
              animate={{
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? "auto" : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden md:block overflow-hidden whitespace-nowrap truncate"
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
          className="hidden md:block flex flex-col pl-6 w-full"
        >
          {subItems.map((subItem) => (
            <Link
              key={subItem.route}
              href={`/${subItem.route}`}
              className="w-full"
            >
              <button
                className={`text-textGray text-sm p-2 w-full text-left whitespace-nowrap truncate hover:bg-hover rounded-lg ${
                  fullPath === subItem.route ? "bg-active" : ""
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
    <nav className="md:h-full">
      <div className="flex md:flex-col justify-center space-x-8 md:space-y-5 md:space-x-0 p-2">
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
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const sidebarVariants = {
    desktop: {
      width: isExpanded ? 256 : 70,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    mobile: {
      width: "100%",
      transition: { duration: 0 },
    },
  };

  return (
    <motion.aside
      initial={false}
      animate={isDesktop ? "desktop" : "mobile"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: isDesktop ? undefined : "100%" }}
      className={`z-10 absolute left-0 right-0 bottom-0 md:static flex flex-col p-2 md:p-5 shadow-xl border border-foreground border-opacity-10 md:rounded-2xl bg-background ${
        isDesktop ? "bg-opacity-60 backdrop-blur-lg backdrop-saturate-150" : ""
      } ${isExpanded ? "gap-5" : "items-center gap-5"}`}
    >
      <div className="hidden md:flex items-center gap-3">
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
              className="text-foreground absolute left-7"
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
