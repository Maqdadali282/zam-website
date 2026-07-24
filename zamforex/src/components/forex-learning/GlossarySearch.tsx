"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GLOSSARY, GLOSSARY_CATEGORIES, type GlossaryCategory } from "./glossaryData";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Chevron() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8">
      <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GlossarySearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GlossaryCategory | "All">("All");
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery = !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [query, category]);

  const availableLetters = useMemo(() => new Set(filtered.map((t) => t.term[0].toUpperCase())), [filtered]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(term);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <div className="glossary-controls">
        <input
          type="search"
          className="glossary-search-input"
          placeholder="Search terms — e.g. 'pip', 'margin', 'drawdown'…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the glossary"
        />
        <div className="glossary-category-pills">
          <button type="button" className={`toc-pill${category === "All" ? " active" : ""}`} onClick={() => setCategory("All")}>
            All Categories
          </button>
          {GLOSSARY_CATEGORIES.map((c) => (
            <button key={c} type="button" className={`toc-pill${category === c ? " active" : ""}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="glossary-az-nav" role="navigation" aria-label="Jump to letter">
        {ALPHABET.map((letter) => (
          <a
            key={letter}
            href={availableLetters.has(letter) ? `#letter-${letter}` : undefined}
            className={`glossary-az-link${availableLetters.has(letter) ? "" : " disabled"}`}
            aria-disabled={!availableLetters.has(letter)}
          >
            {letter}
          </a>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--muted)", padding: "24px 0" }}>No terms match &quot;{query}&quot; in this category.</p>
      ) : (
        Array.from(grouped.entries()).map(([letter, terms]) => (
          <div key={letter} id={`letter-${letter}`} className="glossary-letter-group">
            <div className="glossary-letter-heading">{letter}</div>
            <div className="accordion-list">
              {terms.map((t) => {
                const open = openTerm === t.term;
                return (
                  <div className="accordion-item" style={{ borderLeftColor: "var(--cyan)" }} key={t.term}>
                    <button type="button" className="accordion-head" onClick={() => setOpenTerm(open ? null : t.term)} aria-expanded={open}>
                      <div>
                        <h4>
                          {t.term} <span className="glossary-term-category">{t.category}</span>
                        </h4>
                        <p>{t.definition}</p>
                      </div>
                      <span className="accordion-chevron">
                        <Chevron />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="accordion-body-inner">
                            <div className="accordion-block example">
                              <div className="ab-label">💡 Example</div>
                              <p>{t.example}</p>
                            </div>
                            <div className="accordion-block tip">
                              <div className="ab-label">🔗 Related Concepts</div>
                              <p>{t.related.join(", ")}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
