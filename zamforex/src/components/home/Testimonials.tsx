import Reveal from "@/components/common/Reveal";

const testimonials = [
  {
    stars: "★★★★★",
    quote:
      "\"I'd tried three different 'signal' groups before this. Zam Forex was the first place that actually taught me to read a chart myself instead of just copying calls.\"",
    initials: "AH",
    name: "Ahmed H.",
    meta: "Trading 8 months",
  },
  {
    stars: "★★★★★",
    quote:
      '"The risk management framework alone was worth it. I stopped blowing accounts once I actually understood position sizing instead of guessing."',
    initials: "SR",
    name: "Sana R.",
    meta: "Trading 1.5 years",
  },
  {
    stars: "★★★★☆",
    quote:
      '"Straightforward and honest — no false promises about guaranteed profits, just a real curriculum from basics to a proper trading plan."',
    initials: "BK",
    name: "Bilal K.",
    meta: "Trading 4 months",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials">
      <Reveal className="section-head">
        <div className="eyebrow">Trader Stories</div>
        <h2>What traders say</h2>
        <p>Real feedback from people who went from confused to consistent.</p>
      </Reveal>
      <Reveal className="testi-grid">
        {testimonials.map((t) => (
          <div className="testi-card glow-card" key={t.initials}>
            <div className="testi-stars">{t.stars}</div>
            <p className="quote">{t.quote}</p>
            <div className="testi-who">
              <div className="testi-avatar">{t.initials}</div>
              <div>
                <b>{t.name}</b>
                <span>{t.meta}</span>
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
