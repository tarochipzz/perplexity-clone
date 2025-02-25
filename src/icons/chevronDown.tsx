import React from "react";

export const ChevronDownIcon = ({
  width = 24,
  height = 24,
  color = "black",
  className = "",
  strokeWidth = 1.5,
}) => (
  <svg
    className={className}
    fill="none"
    strokeWidth={strokeWidth}
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
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);
