import React from "react";

export const ChevronRightIcon = ({
  width = 24,
  height = 24,
  color = "black",
  strokeWidth = 1.5,
  className = "",
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
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    ></path>
  </svg>
);
