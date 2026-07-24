"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ToolMeta } from "./toolsData";
import { getToolPreview } from "./visuals";

export default function FeaturedToolCard({ tool, index = 0 }: { tool: ToolMeta; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={`/tools/${tool.slug}`}
        className="tool-card tool-card--featured glow-card"
        style={{ "--tool-accent": tool.accent } as CSSProperties}
      >
        <span className="tool-card-featured-tag">Featured Tool</span>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
        <div className="tool-card-visual tool-card-visual--large">{getToolPreview(tool.slug, tool.accent)}</div>
        <span className="tool-card-cta tool-card-cta--primary">
          {tool.cta} →
        </span>
      </Link>
    </motion.div>
  );
}
