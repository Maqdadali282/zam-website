import Link from "next/link";
import Reveal from "@/components/common/Reveal";

const items = [
  {
    idx: "01",
    title: "Integrity",
    text: "No false claims, no hidden agendas — just transparent mentorship built to grow your knowledge and confidence.",
    href: "/disclaimer",
    cta: "Read our Disclaimer",
  },
  {
    idx: "02",
    title: "Expert Guidance",
    text: "Learn from experienced traders and analysts who share practical strategies, not recycled theory.",
    href: "/forex-learning",
    cta: "Explore Forex Learning",
  },
  {
    idx: "03",
    title: "Global Access",
    text: "Trade the world's largest financial market — major, minor, and exotic pairs, all in one place.",
    href: "/markets",
    cta: "See Live Markets",
  },
  {
    idx: "04",
    title: "Reliability",
    text: "A consistent, dependable learning environment focused on helping you grow step by step.",
    href: "/forex-learning/risk-management",
    cta: "Learn More",
  },
];

export default function WhyGrid() {
  return (
    <section id="why">
      <Reveal className="section-head">
        <div className="eyebrow">Why Zam Forex</div>
        <h2>Mentorship built on transparency</h2>
        <p>
          No false promises, no signal-selling. Just structured education and
          honest guidance for traders at every stage.
        </p>
      </Reveal>
      <Reveal className="why-grid">
        {items.map((item) => (
          <div className="why-card glow-card" key={item.idx}>
            <div className="idx">{item.idx}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link className="why-card-link" href={item.href}>
              {item.cta} →
            </Link>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
