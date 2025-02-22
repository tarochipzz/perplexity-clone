import React from "react";

export const ThreadIcon = ({
  width = 20,
  height = 20,
  color = "grey",
  strokeWidth = 1.5,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="none"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    width={width}
    height={height}
    color={color}
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M492.8 147.2H262.4v51.2H492.8V147.2zm0 102.4H262.4v51.2H492.8V249.6zM262.4 96H32v51.2H262.4V96zm0 102.4H32v51.2H262.4V198.4zm0 102.4H32V352H262.4V300.8zM492.8 352H262.4v51.2H492.8V352z"
    />
  </svg>
);
