"use client";

import { useTheme } from "@/lib/theme";

export default function ThemeToggleButton({
  id,
  style,
}: {
  id?: string;
  style?: React.CSSProperties;
}) {
  const { toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      id={id}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      style={style}
      onClick={toggleTheme}
    >
      <svg className="icon-sun" viewBox="0 0 24 24" width="18" height="18">
        <circle
          cx="12"
          cy="12"
          r="4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="4.5" />
          <line x1="12" y1="19.5" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4.5" y2="12" />
          <line x1="19.5" y1="12" x2="22" y2="12" />
          <line x1="4.9" y1="4.9" x2="6.6" y2="6.6" />
          <line x1="17.4" y1="17.4" x2="19.1" y2="19.1" />
          <line x1="4.9" y1="19.1" x2="6.6" y2="17.4" />
          <line x1="17.4" y1="6.6" x2="19.1" y2="4.9" />
        </g>
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" width="18" height="18">
        <path
          fill="currentColor"
          d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.8 6.8 0 0 0 20 14.5Z"
        />
      </svg>
    </button>
  );
}
