"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ToolMeta } from "./toolsData";
import { getToolPreview } from "./visuals";

export default function ToolCard({ tool, index = 0 }: { tool: ToolMeta; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07, ease: "easeOut" }}
    >
      <Link
        href={`/tools/${tool.slug}`}
        className="tool-card glow-card"
        style={{ "--tool-accent": tool.accent } as CSSProperties}
      >
        <div className="tool-card-head">
          <span className="tool-card-category">{tool.category}</span>
        </div>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
        <div className="tool-card-visual">{getToolPreview(tool.slug, tool.accent)}</div>
        <span className="tool-card-cta">
          {tool.cta}
          <svg viewBox="0 0 24 24" className="tool-card-cta-arrow">
            <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
