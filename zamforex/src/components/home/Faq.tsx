"use client";

import { useState } from "react";
import Reveal from "@/components/common/Reveal";

const faqs = [
  {
    q: "Do I need experience to start?",
    a: "No — the curriculum starts at Forex Basics and builds up in order, so complete beginners and traders looking to sharpen their skills both have a clear path to follow.",
  },
  {
    q: "Do you sell trading signals?",
    a: "No. Zam Forex is education and mentorship, not a signal service — the goal is for you to learn to read the market and make your own decisions.",
  },
  {
    q: "How much money do I need to start trading?",
    a: "That depends on your broker and risk tolerance — we cover position sizing and risk management in the Frameworks section so you can start with an amount you're comfortable with.",
  },
  {
    q: "Is forex trading guaranteed to be profitable?",
    a: "No — trading carries real risk of loss, and no one can guarantee profits. Our focus is on giving you a disciplined, honest process rather than false promises.",
  },
  {
    q: "Which broker should I use?",
    a: "See the Best Broker section above for what actually matters when choosing one — spreads, execution, and regulation, not just bonus offers.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq">
      <Reveal className="section-head">
        <div className="eyebrow">FAQs</div>
        <h2>Frequently asked questions</h2>
        <p>Common questions before you get started.</p>
      </Reveal>
      <Reveal className="faq-list">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div className={`faq-item${isOpen ? " open" : ""}`} key={item.q}>
              <button
                className="faq-q"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="plus">+</span>
              </button>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
