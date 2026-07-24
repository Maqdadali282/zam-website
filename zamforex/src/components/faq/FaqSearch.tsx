"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqCategory } from "./faqData";

const CATEGORY_ACCENT: Record<FaqCategory, string> = {
  "Getting Started": "var(--mint)",
  "Trading & Risk": "var(--red)",
  "Tools & Markets": "var(--cat-1)",
  "Accounts & Brokers": "var(--gold)",
  "Website & Support": "var(--cat-3)",
};

function Chevron() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8">
      <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FaqSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery = !q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const grouped = useMemo(() => {
    const map = new Map<FaqCategory, typeof filtered>();
    for (const item of filtered) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <div className="glossary-controls">
        <input
          type="search"
          className="glossary-search-input"
          placeholder="Search questions — e.g. 'stop loss', 'leverage'…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search frequently asked questions"
        />
        <div className="glossary-category-pills">
          <button type="button" className={`toc-pill${category === "All" ? " active" : ""}`} onClick={() => setCategory("All")}>
            All Categories
          </button>
          {FAQ_CATEGORIES.map((c) => (
            <button key={c} type="button" className={`toc-pill${category === c ? " active" : ""}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--muted)", padding: "24px 0" }}>
          No questions match &quot;{query}&quot;. Try a different term, or ask us directly on our Contact page.
        </p>
      ) : (
        Array.from(grouped.entries()).map(([cat, items]) => (
          <div key={cat} style={{ marginTop: "28px" }}>
            <h3 style={{ marginBottom: "12px", fontSize: "15px" }}>{cat}</h3>
            <div className="accordion-list">
              {items.map((item) => {
                const open = openId === item.id;
                return (
                  <div className="accordion-item" style={{ borderLeftColor: CATEGORY_ACCENT[item.category] }} key={item.id}>
                    <button
                      type="button"
                      className="accordion-head"
                      onClick={() => setOpenId(open ? null : item.id)}
                      aria-expanded={open}
                    >
                      <h4 style={{ marginBottom: 0 }}>{item.question}</h4>
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
                          <p className="faq-answer">{item.answer}</p>
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
