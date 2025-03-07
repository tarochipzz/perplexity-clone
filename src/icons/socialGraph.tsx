import React from "react";

export const SocialGraphIcon = ({
  width = 24,
  height = 24,
  color = "black",
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    color={color}
    stroke="currentColor"
    height={height}
    width={width}
  >
    <path d="M5.931 6.936l1.275 4.249m5.607 5.609l4.251 1.275"></path>
    <path d="M11.683 12.317l5.759 -5.759"></path>
    <path d="M5.5 5.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0"></path>
    <path d="M18.5 5.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0"></path>
    <path d="M18.5 18.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0"></path>
    <path d="M8.5 15.5m-4.5 0a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0"></path>
  </svg>
);
