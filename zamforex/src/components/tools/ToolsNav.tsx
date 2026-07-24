"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS } from "./toolsData";

export default function ToolsNav() {
  const pathname = usePathname();

  return (
    <nav className="tools-subnav" aria-label="Trading tools">
      {TOOLS.map((tool) => {
        const href = `/tools/${tool.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={tool.slug}
            href={href}
            className={`tools-subnav-link${active ? " active" : ""}`}
            aria-current={active ? "page" : undefined}
            style={active ? ({ "--tool-accent": tool.accent } as React.CSSProperties) : undefined}
          >
            {tool.shortName}
          </Link>
        );
      })}
    </nav>
  );
}
