import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import AccountsTable from "@/components/best-brokers/AccountsTable";
import { AURUM_SIGNUP_URL } from "@/lib/affiliateLinks";

export const metadata: Metadata = {
  title: "Best Forex Brokers | Zam Forex",
  description:
    "Our picks for the best forex brokers — what actually matters when choosing one: spreads, execution, and regulation.",
};

const shieldIcon = (
  <svg viewBox="0 0 60 60">
    <path
      d="M30 8 L48 16 V30 C48 42 40 50 30 54 C20 50 12 42 12 30 V16 Z"
      fill="none"
      stroke="var(--mint)"
      strokeWidth="2.5"
    />
    <path d="M22 30 L28 36 L40 22" stroke="var(--gold)" strokeWidth="2.5" fill="none" />
  </svg>
);

const boltIcon = (
  <svg viewBox="0 0 60 60">
    <path d="M32 6 L14 34 H26 L20 54 L46 24 H32 Z" fill="var(--gold)" opacity="0.9" />
  </svg>
);

const lockIcon = (
  <svg viewBox="0 0 60 60">
    <rect x="16" y="28" width="28" height="22" rx="3" fill="none" stroke="var(--mint)" strokeWidth="2.5" />
    <path d="M22 28 V20 a8 8 0 0 1 16 0 V28" fill="none" stroke="var(--mint)" strokeWidth="2.5" />
    <circle cx="30" cy="38" r="3" fill="var(--gold)" />
  </svg>
);

export default function BestBrokersPage() {
  return (
    <>
      <SiteNav variant="brokers" />

      <Reveal className="apps-hero">
        <h1 style={{ fontSize: "clamp(40px, 7.5vw, 72px)" }}>
          Best International <span className="mint-text">Forex</span> Brokers
        </h1>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: "24px" }}>
          <a className="btn btn-primary" href={AURUM_SIGNUP_URL} target="_blank" rel="noopener">
            Open an Account →
          </a>
        </div>
      </Reveal>

      <section id="best-brokers-content">
        <Reveal className="broker-intro">
          <p>
            Finding the <strong>best Forex broker</strong> is the first and
            most important step toward success in online trading.
            Unfortunately, today many unregulated brokers and scammers make
            it difficult for traders to trust the market. That&apos;s why we
            connect you only with{" "}
            <strong>
              top, regulated, and globally trusted Forex brokers
            </strong>{" "}
            – ensuring your money and trading journey remain 100% safe.
          </p>
        </Reveal>

        <Reveal className="section-head">
          <div className="eyebrow">Why It Matters</div>
          <h2>What separates a great broker from a risky one</h2>
          <p>The details most traders overlook until it&apos;s too late.</p>
        </Reveal>

        <div className="term-grid">
          <Reveal className="term-card glow-card">
            <div className="icon">{shieldIcon}</div>
            <h3>Regulated &amp; Licensed</h3>
            <p>
              Overseen by bodies like the FCA, ASIC, or CySEC, so your funds
              and trades are held to real legal standards — not just a
              promise on a website.
            </p>
          </Reveal>
          <Reveal className="term-card glow-card">
            <div className="icon">{boltIcon}</div>
            <h3>Tight Spreads, Fast Execution</h3>
            <p>
              Low spreads and instant order fills mean less slippage eating
              into your edge, especially during high-volatility news moves.
            </p>
          </Reveal>
          <Reveal className="term-card glow-card">
            <div className="icon">{lockIcon}</div>
            <h3>Safe Deposits &amp; Withdrawals</h3>
            <p>
              Segregated client accounts and fast, fee-free withdrawals — so
              your money is never sitting somewhere you can&apos;t reach it.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="account-types">
        <AccountsTable />
      </section>

      <SiteFooter variant="brokers" />
    </>
  );
}
