"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { GlobeIcon } from "../icons/globe";
import { SquaresIcon } from "../icons/squares";
import { BookmarkIcon } from "../icons/bookmark";
import { ThreadIcon } from "../icons/thread";
import { PerplexityLogo } from "../icons/perplexityLogo";
import { PlusCircleIcon } from "../icons/plusCircle";
import { PerplexityIcon } from "../icons/perplexity";
import { ChevronLeftIcon } from "../icons/chevronLeft";
import { ChevronRightIcon } from "../icons/chevronRight";
import { HomeIcon } from "../icons/home";
import Link from "next/link";

interface SidebarNavItemProps {
  icon?: JSX.Element;
  label?: string;
  isExpanded: boolean;
  route?: string;
  children?: JSX.Element;
}
interface SidebarNavProps {
  isExpanded: boolean;
}
interface SidebarProps {
  setIsExpanded: (expanded: boolean) => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  label,
  isExpanded,
  route = "",
}) => (
  <Link className={"flex"} href={`/${route}`}>
    <button
      className={`flex items-center ${
        isExpanded && "gap-3"
      } text-gray-700 cursor-pointer p-1`}
    >
      {icon}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
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
);

const SidebarNav: React.FC<SidebarNavProps> = ({ isExpanded }) => (
  <nav className="space-y-5 p-2">
    <SidebarNavItem
      icon={<HomeIcon color="text-gray-700" />}
      label="Home"
      isExpanded={isExpanded}
    />
    <SidebarNavItem
      icon={<GlobeIcon color="text-gray-700" />}
      label="Discover"
      isExpanded={isExpanded}
      route="discover"
    />
    <SidebarNavItem
      icon={<SquaresIcon color="text-gray-700" />}
      label="Spaces"
      isExpanded={isExpanded}
      route="spaces"
    />
    <SidebarNavItem
      icon={<BookmarkIcon color="text-gray-700" />}
      label="Bookmarks"
      isExpanded={isExpanded}
      route="bookmarks"
    />
    <SidebarNavItem
      icon={<ThreadIcon color="text-gray-700" />}
      label="Threads"
      isExpanded={isExpanded}
      route="search"
    />
  </nav>
);

const ExpandedSidebar: React.FC<SidebarProps> = ({ setIsExpanded }) => (
  <motion.aside
    initial={{ width: 70 }}
    animate={{ width: 256 }}
    exit={{ width: 70 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col bg-background p-5 shadow-md gap-5"
  >
    <div className="flex items-center gap-3">
      <PerplexityLogo height={50} width={165} />
      <button onClick={() => setIsExpanded(false)}>
        <ChevronLeftIcon />
      </button>
    </div>
    <button
      className={
        "flex items-center gap-3 text-gray-700 cursor-pointer p-2 border border-primaryLight bg-actionBackround rounded-full"
      }
    >
      <PlusCircleIcon color="text-gray-700" />
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: 1,
          width: "auto",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="overflow-hidden whitespace-nowrap"
      >
        New Thread
      </motion.div>
    </button>
    <SidebarNav isExpanded={true} />
  </motion.aside>
);

const CollapsedSidebar: React.FC<SidebarProps> = ({ setIsExpanded }) => (
  <motion.aside
    initial={{ width: 256 }}
    animate={{ width: 70 }}
    exit={{ width: 256 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col  bg-background p-5 shadow-md items-center gap-5"
  >
    <button
      onClick={() => setIsExpanded(true)}
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
    <button
      className={
        "flex items-center gap-3 text-gray-700 cursor-pointer p-2 bg-actionBackround rounded-full"
      }
    >
      <PlusCircleIcon color="text-gray-700" />
    </button>
    <SidebarNav isExpanded={false} />
  </motion.aside>
);

export const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  return isExpanded ? (
    <ExpandedSidebar setIsExpanded={setIsExpanded} />
  ) : (
    <CollapsedSidebar setIsExpanded={setIsExpanded} />
  );
};
