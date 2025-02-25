import React from "react";

export const ChevronLeftIcon = ({
  width = 24,
  height = 24,
  color = "black",
  className = "text-foreground",
}) => (
  <svg
    className={className}
    fill="none"
    strokeWidth="1.5"
    color={color}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    ></path>
  </svg>
);
