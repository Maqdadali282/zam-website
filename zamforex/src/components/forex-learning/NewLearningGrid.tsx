"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";
import { LEARNING_SECTIONS } from "./learningData";

const newSections = LEARNING_SECTIONS.filter((s) => !s.existing);

export default function NewLearningGrid() {
  return (
    <section className="cat-section">
      <Reveal className="section-head">
        <div className="eyebrow">Go Deeper</div>
        <h2>The rest of the journey</h2>
        <p>
          Knowing the charts and the news isn&apos;t enough on its own —
          these six sections cover the discipline, strategy, and reference
          material that turn knowledge into a repeatable process.
        </p>
      </Reveal>

      <div className="tool-grid">
        {newSections.map((section, i) => (
          <motion.div
            key={section.slug}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: "easeOut" }}
          >
            <Link
              href={section.href}
              className="tool-card glow-card"
              style={{ "--tool-accent": section.accent } as CSSProperties}
            >
              <div className="tool-card-head">
                <span className="tool-card-category">{section.difficulty}</span>
              </div>
              <h3>{section.name}</h3>
              <p>{section.description}</p>
              <div className="learning-key-topics" style={{ marginBottom: "18px" }}>
                {section.keyTopics.slice(0, 4).map((t) => (
                  <span key={t} className="learning-key-topic-chip">
                    {t}
                  </span>
                ))}
              </div>
              <span className="tool-card-cta">
                {section.cta}
                <svg viewBox="0 0 24 24" className="tool-card-cta-arrow">
                  <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
