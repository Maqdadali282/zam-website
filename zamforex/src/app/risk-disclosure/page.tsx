import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Risk Disclosure | Zam Forex",
  description:
    "Understand the real risks of Forex and CFD trading — leverage, volatility, capital risk, and who should and shouldn't trade — before opening a live account.",
};

const proseP: CSSProperties = {
  color: "var(--muted)",
  fontSize: "var(--fs-body)",
  lineHeight: "var(--lh-body)",
  marginBottom: "16px",
};
const proseLi: CSSProperties = {
  color: "var(--muted)",
  fontSize: "var(--fs-body)",
  lineHeight: "var(--lh-body)",
  marginBottom: "8px",
};
const h3Style: CSSProperties = { marginTop: "32px", marginBottom: "12px" };

export default function RiskDisclosurePage() {
  return (
    <>
      <SiteNav variant="more" />

      <div className="ta-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Risk Disclosure</span>
      </div>

      <div className="ta-page-head" style={{ maxWidth: "820px" }}>
        <div className="eyebrow" style={{ color: "var(--red)", "--eyebrow-accent": "var(--red)" } as CSSProperties}>
          Read Before You Trade
        </div>
        <h1>Risk Disclosure</h1>
      </div>

      <section className="cat-section" style={{ maxWidth: "820px", margin: "0 auto", padding: "0 5% 60px" }}>
        <div
          style={{
            border: "1px solid var(--red)",
            borderRadius: "10px",
            background: "var(--chip)",
            padding: "16px 18px",
            marginBottom: "28px",
          }}
        >
          <p style={{ ...proseP, marginBottom: 0, color: "var(--text)" }}>
            <b style={{ color: "var(--red)" }}>Trading Forex, CFDs, commodities, and cryptocurrencies carries a high level of risk</b> and
            may result in losses that exceed your deposit. Only trade with money you can
            afford to lose in full.
          </p>
        </div>

        <h3 style={h3Style}>Leverage &amp; volatility risk</h3>
        <p style={proseP}>
          Leverage lets you control a position larger than your account
          balance, expressed as a ratio like 1:100. It magnifies gains{" "}
          <b style={{ color: "var(--text)" }}>and</b> losses by the same
          factor — it doesn&apos;t improve your odds, only the size of the
          outcome. Prices can also move rapidly around news events and
          economic releases, sometimes gapping past a stop loss, especially
          during low-liquidity periods.
        </p>

        <h3 style={h3Style}>Emotional trading &amp; capital risk</h3>
        <p style={proseP}>
          Fear and greed cause much of the damage in a beginner&apos;s
          account — abandoning a stop loss, oversizing after a loss, or
          exiting winners too early. Never trade with funds needed for
          essential expenses; it is entirely possible to lose your entire
          deposited capital.
        </p>

        <h3 style={h3Style}>Past performance</h3>
        <p style={proseP}>
          Any historical chart, backtest, or strategy example in our lessons
          describes what happened in that specific instance — it is not a
          guarantee of future performance. Markets change, and a pattern
          that worked before can fail later.
        </p>

        <h3 style={h3Style}>Educational purpose, no advice</h3>
        <p style={proseP}>
          ZamForex is not a licensed financial advisor, and nothing published
          here is personalized financial advice. Every lesson, chart, and
          calculator is provided to help you understand how markets work —
          not as a signal to copy. Consider seeking independent professional
          advice before trading.
        </p>

        <h3 style={h3Style}>Who should trade &amp; risk management</h3>
        <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
          <li style={proseLi}>Only trade capital you can afford to lose entirely</li>
          <li style={proseLi}>Understand your broker&apos;s leverage and margin rules first</li>
          <li style={proseLi}>Have a written risk plan, including a maximum risk per trade (many disciplined traders use 1–2%)</li>
          <li style={proseLi}>Always set a stop loss before entering a trade, not after</li>
        </ul>
        <p style={proseP}>
          Our{" "}
          <Link href="/tools/position-size-calculator" style={{ color: "var(--mint)" }}>
            Position Size Calculator
          </Link>{" "}
          can help you size a trade around your chosen risk percentage.
        </p>

        <h3 style={h3Style}>If trading is causing you harm</h3>
        <p style={proseP}>
          If you find yourself unable to stop trading, or are risking money
          you need for essential expenses, stop trading immediately and
          speak to a licensed independent financial advisor or a support
          service in your country. This is not something ZamForex, as an
          educational platform, is positioned to resolve for you.
        </p>
      </section>

      <SiteFooter variant="more" />
    </>
  );
}
