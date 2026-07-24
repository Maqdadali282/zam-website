"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";
import MiniFlow from "@/components/tools/visuals/MiniFlow";
import { LEARNING_SECTIONS } from "./learningData";

const basics = LEARNING_SECTIONS.find((s) => s.slug === "forex-basics")!;
const technical = LEARNING_SECTIONS.find((s) => s.slug === "technical-analysis")!;
const fundamental = LEARNING_SECTIONS.find((s) => s.slug === "fundamental-analysis")!;

function PriceSquiggle() {
  return (
    <svg viewBox="0 0 200 90" className="tool-visual">
      <line x1="10" y1="78" x2="190" y2="78" stroke="var(--line)" strokeWidth="1" />
      <line x1="10" y1="78" x2="10" y2="10" stroke="var(--line)" strokeWidth="1" />
      <text x="10" y="8" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">PRICE ↑</text>
      <text x="182" y="88" textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">TIME →</text>
      <path
        d="M10 60 L34 68 L54 34 L74 50 L96 20 L118 42 L140 26 L162 44 L188 16"
        stroke="var(--cat-1)"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardShell({
  section,
  visual,
}: {
  section: (typeof LEARNING_SECTIONS)[number];
  visual: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link
        href={section.href}
        className="tool-card tool-card--featured glow-card"
        style={{ "--tool-accent": section.accent } as CSSProperties}
      >
        <span className="tool-card-featured-tag">{section.difficulty}</span>
        <h3>{section.name}</h3>
        <p>{section.description}</p>
        <div className="learning-key-topics">
          {section.keyTopics.map((t) => (
            <span key={t} className="learning-key-topic-chip">
              {t}
            </span>
          ))}
        </div>
        <div className="tool-card-visual tool-card-visual--large">{visual}</div>
        <span className="tool-card-cta tool-card-cta--primary">{section.cta} →</span>
      </Link>
    </motion.div>
  );
}

export default function ExistingContentSection() {
  return (
    <section id="foundation" className="cat-section">
      <Reveal className="section-head">
        <div className="eyebrow">Build Your Foundation</div>
        <h2>Already part of this academy</h2>
        <p>
          These three lessons already exist as full interactive academies on
          this site — here&apos;s how they fit into the bigger learning
          journey.
        </p>
      </Reveal>

      <div className="featured-tools-grid" style={{ marginBottom: "36px" }}>
        <CardShell
          section={basics}
          visual={
            <MiniFlow
              accent={basics.accent}
              steps={[
                { label: "Currency Pair" },
                { label: "Price Movement" },
                { label: "Pips" },
                { label: "Lot Size" },
                { label: "Trading Position" },
              ]}
            />
          }
        />
        <CardShell section={technical} visual={<PriceSquiggle />} />
        <CardShell
          section={fundamental}
          visual={
            <MiniFlow
              accent={fundamental.accent}
              steps={[
                { label: "Economic Event" },
                { label: "Economic Impact" },
                { label: "Central Bank Response" },
                { label: "Market Sentiment" },
                { label: "Potential Currency Movement" },
              ]}
            />
          }
        />
      </div>
    </section>
  );
}
