import React from "react";

export const CheckIcon = ({
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
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);
