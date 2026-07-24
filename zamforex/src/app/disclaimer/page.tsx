import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Disclaimer | Zam Forex",
  description:
    "ZamForex's educational purpose, no-financial-advice notice, affiliate disclosure, and limitation of liability for content published on this website.",
};

const proseP: CSSProperties = {
  color: "var(--muted)",
  fontSize: "var(--fs-body)",
  lineHeight: "var(--lh-body)",
  marginBottom: "16px",
};
const h3Style: CSSProperties = { marginTop: "32px", marginBottom: "12px" };

export default function DisclaimerPage() {
  return (
    <>
      <SiteNav variant="more" />

      <div className="ta-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Disclaimer</span>
      </div>

      <div className="ta-page-head" style={{ maxWidth: "820px" }}>
        <div className="eyebrow">Legal</div>
        <h1>Disclaimer</h1>
      </div>

      <section className="cat-section" style={{ maxWidth: "820px", margin: "0 auto", padding: "0 5% 60px" }}>
        <p style={proseP}>
          ZamForex is an educational platform, built to help traders at every
          level understand how the Forex market actually works. Everything we
          publish — lessons, charts, worked examples, and calculators — is
          provided strictly for educational purposes. None of it is a trade
          recommendation, and none of it should be treated as personalized
          financial advice. ZamForex is not a licensed financial advisor,
          broker-dealer, or investment manager, and we&apos;re upfront about
          that so you always know exactly what you&apos;re getting from us.
        </p>

        <h3 style={h3Style}>Accuracy &amp; trading risk</h3>
        <p style={proseP}>
          We put real care into keeping our lessons and live market data
          accurate and up to date. As with any live data feed, always
          cross-check critical figures with your broker before acting on
          them. Trading Forex and CFDs involves risk, and understanding that
          risk is part of trading responsibly — see our full{" "}
          <Link href="/risk-disclosure" style={{ color: "var(--mint)" }}>
            Risk Disclosure
          </Link>{" "}
          for the details.
        </p>

        <h3 style={h3Style}>Third-party links &amp; affiliate disclosure</h3>
        <p style={proseP}>
          This site links to third-party sites, including our broker
          partners, TradingView, and our community channels — we&apos;re not
          responsible for their content or practices. ZamForex participates
          in Introducing Broker (IB) partnerships with Aurum Markets and
          CorePrime Markets, and may earn a commission when you open and
          trade on an account through our links, at no extra cost to you.
          This relationship does not influence our educational content.
        </p>

        <h3 style={h3Style}>No guarantees &amp; limitation of liability</h3>
        <p style={proseP}>
          Because trading outcomes depend on the market and on your own
          decisions, we can&apos;t guarantee any specific result or profit
          from using our content or tools — no honest educator can. To the
          fullest extent permitted by law, ZamForex is not liable for any
          loss arising from your use of, or reliance on, this Site. The Site
          is provided &quot;as is&quot;, without warranties of any kind.
        </p>

        <h3 style={h3Style}>Errors, copyright &amp; contact</h3>
        <p style={proseP}>
          If you spot an error on this Site, we genuinely want to know —
          please tell us via our{" "}
          <Link href="/contact" style={{ color: "var(--mint)" }}>
            Contact page
          </Link>
          . All original content on ZamForex is our property unless
          otherwise credited, and may not be redistributed without
          permission. Questions about this Disclaimer? Email{" "}
          <a href="mailto:zamforex110@gmail.com" style={{ color: "var(--mint)" }}>
            zamforex110@gmail.com
          </a>
          .
        </p>
      </section>

      <SiteFooter variant="more" />
    </>
  );
}
