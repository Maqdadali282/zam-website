"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SEARCH_INDEX = [
  { label: "Home", href: "/#home" },
  { label: "Markets Dashboard", href: "/markets" },
  { label: "Economic Calendar", href: "/markets/economic-calendar" },
  { label: "Currency Heat Map", href: "/markets/currency-heat-map" },
  { label: "Market Sentiment", href: "/markets/market-sentiment" },
  { label: "Trading Sessions", href: "/markets/trading-sessions" },
  { label: "Trading Apps (MT4 & MT5)", href: "/apps" },
  { label: "Best Brokers", href: "/best-brokers" },
  { label: "Forex Basics", href: "/forex-basics" },
  { label: "Forex Learning Hub", href: "/forex-learning" },
  { label: "Fundamental Analysis", href: "/fundamental-analysis" },
  { label: "Technical Analysis", href: "/technical-analysis" },
  { label: "Trading Tools", href: "/tools" },
  { label: "Frameworks", href: "/forex-learning/frameworks" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const results = query.trim()
    ? SEARCH_INDEX.filter((item) =>
        item.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : SEARCH_INDEX;

  return (
    <div className="nav-search" ref={wrapRef}>
      <button
        className="theme-toggle"
        aria-label="Search the site"
        title="Search"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" width="18" height="18">
          <circle
            cx="11"
            cy="11"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <line
            x1="16.2"
            y1="16.2"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <div className="nav-search-panel">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search the site…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul>
            {results.length === 0 && (
              <li className="nav-search-empty">No matches</li>
            )}
            {results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} onClick={() => setOpen(false)}>
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
