import Reveal from "@/components/common/Reveal";

export default function FundamentalHero() {
  return (
    <Reveal className="apps-hero">
      <div className="eyebrow">Fundamental Analysis Academy</div>
      <h1 style={{ fontSize: "clamp(30px, 5vw, 50px)" }}>
        Understand What <span className="mint-text">Moves the Market</span>
      </h1>
      <p className="lead">
        Learn how interest rates, inflation, economic growth, central banks,
        news, and global events influence currency prices — before the chart
        shows you.
      </p>
    </Reveal>
  );
}
