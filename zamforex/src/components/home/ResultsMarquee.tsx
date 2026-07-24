"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/common/Reveal";

const RESULTS_TOTAL = 9;
const results = Array.from({ length: RESULTS_TOTAL }, (_, i) => i + 1);
const track = [...results, ...results];

export default function ResultsMarquee() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [displayIdx, setDisplayIdx] = useState<number | null>(null);

  function openLightbox(idx: number) {
    setDisplayIdx(idx);
    setOpenIdx(idx);
  }

  useEffect(() => {
    if (openIdx === null) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIdx(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openIdx]);

  return (
    <section id="results">
      <Reveal className="section-head">
        <div className="eyebrow">Proof, Not Promises</div>
        <h2>Our Results</h2>
        <p>
          Real trade history and account screenshots — click any card to view
          it full size.
        </p>
      </Reveal>
      <Reveal className="results-marquee-wrap">
        <div className="results-track">
          {track.map((idx, i) => (
            <div
              className="result-card"
              key={i}
              onClick={() => openLightbox(idx)}
            >
              <img
                src={`/assets/results/result-${idx}.jpg`}
                alt={`Zam Forex trading result ${idx}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Reveal>

      <div
        className={`lightbox${openIdx !== null ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpenIdx(null);
        }}
      >
        <button className="lightbox-back" onClick={() => setOpenIdx(null)}>
          ← Back
        </button>
        <button
          className="lightbox-close"
          aria-label="Close"
          onClick={() => setOpenIdx(null)}
        >
          ✕
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {displayIdx !== null && (
            <img
              src={`/assets/results/result-${displayIdx}.jpg`}
              alt="Trading result screenshot"
            />
          )}
          <span className="lightbox-counter">
            {displayIdx !== null ? `${displayIdx} / ${RESULTS_TOTAL}` : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
