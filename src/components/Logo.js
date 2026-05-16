import React from "react";

export default function Logo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Calendar body */}
      <rect x="3" y="9" width="34" height="27" rx="5" fill="#6366f1" />
      {/* Calendar header bar */}
      <rect x="3" y="9" width="34" height="11" rx="5" fill="#4f46e5" />
      <rect x="3" y="15" width="34" height="5" fill="#4f46e5" />
      {/* Ring left */}
      <rect x="12" y="4" width="4" height="9" rx="2" fill="#818cf8" />
      {/* Ring right */}
      <rect x="24" y="4" width="4" height="9" rx="2" fill="#818cf8" />
      {/* Checkmark */}
      <path
        d="M12 25l5 5 11-11"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
