import Link from "next/link";
import Reveal from "@/components/common/Reveal";

export default function ForexLearningHero() {
  return (
    <Reveal className="apps-hero">
      <div className="eyebrow">Forex Learning</div>
      <h1 style={{ fontSize: "clamp(30px, 5vw, 50px)" }}>
        Learn the Markets. <span className="mint-text">Build Your Knowledge.</span> Trade With Discipline.
      </h1>
      <p className="lead">
        Explore Forex from the fundamentals of currency markets to technical
        analysis, fundamental analysis, risk management, trading psychology,
        and advanced trading concepts.
      </p>
      <div className="hero-ctas" style={{ justifyContent: "center" }}>
        <Link className="btn btn-primary" href="#foundation">
          Start Learning →
        </Link>
        <Link className="btn btn-ghost" href="#learning-path">
          Explore Learning Path
        </Link>
      </div>
    </Reveal>
  );
}
