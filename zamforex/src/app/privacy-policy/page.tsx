import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Zam Forex",
  description:
    "How Zam Forex collects, uses, and protects information — personal information, cookies, third-party services, and your rights.",
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteNav variant="more" />

      <div className="ta-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Privacy Policy</span>
      </div>

      <div className="ta-page-head" style={{ maxWidth: "820px" }}>
        <div className="eyebrow">Legal</div>
        <h1>Privacy Policy</h1>
      </div>

      <section className="cat-section" style={{ maxWidth: "820px", margin: "0 auto", padding: "0 5% 60px" }}>
        <p style={proseP}>
          Zam Forex (&quot;ZamForex&quot;, &quot;we&quot;, &quot;us&quot;) is
          an educational Forex platform — we publish learning content, live
          market data widgets, and trading calculators, and we participate
          in Introducing Broker (IB) referral partnerships. We are not a
          broker, do not hold client funds, and do not execute trades on
          anyone&apos;s behalf. This page explains how information is
          handled on this website.
        </p>

        <h3 style={h3Style}>Information we collect</h3>
        <p style={proseP}>
          You don&apos;t need an account to use this site. We only receive
          personal information when you choose to provide it — for example,
          your name, email address, and message when you contact us through
          our <Link href="/contact" style={{ color: "var(--mint)" }}>Contact page</Link>,
          by email, or through our WhatsApp or Telegram community. Like most
          websites, our hosting infrastructure may also automatically log
          basic technical data (IP address, browser type) for security and
          reliability — this is not combined with any analytics or tracking
          platform.
        </p>

        <h3 style={h3Style}>Cookies</h3>
        <p style={proseP}>
          We use a small, clearly defined set of cookies — essential,
          optional theme preference, and third-party cookies from embedded
          TradingView widgets that only load once you consent. Full details
          are on our{" "}
          <Link href="/cookie-policy" style={{ color: "var(--mint)" }}>
            Cookie Policy
          </Link>{" "}
          page. We do not currently run any analytics platform on this site.
        </p>

        <h3 style={h3Style}>Third-party services</h3>
        <p style={proseP}>
          This site embeds live market widgets from TradingView, and links to
          independent broker partners (currently Aurum Markets and CorePrime
          Markets) as part of our IB referral relationships. If you open an
          account with one of them, your information goes directly to that
          broker under their own privacy policy — ZamForex never receives
          your account details or funds.
        </p>

        <h3 style={h3Style}>Data security &amp; retention</h3>
        <p style={proseP}>
          We take reasonable measures to protect information you send us —
          this site is served exclusively over HTTPS. However, no method of
          transmission is completely secure. We retain contact inquiries
          only as long as reasonably necessary to respond to you, and you
          can request earlier deletion at any time.
        </p>

        <h3 style={h3Style}>Your rights</h3>
        <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
          <li style={proseLi}>Ask what personal information we hold about you, if any</li>
          <li style={proseLi}>Request a correction or deletion of information you provided</li>
          <li style={proseLi}>Withdraw cookie consent at any time via the footer</li>
        </ul>
        <p style={proseP}>
          To exercise any of these, email{" "}
          <a href="mailto:zamforex110@gmail.com" style={{ color: "var(--mint)" }}>
            zamforex110@gmail.com
          </a>
          .
        </p>

        <h3 style={h3Style}>Changes to this policy</h3>
        <p style={proseP}>
          We may update this Privacy Policy from time to time. Questions?
          Reach us via our{" "}
          <Link href="/contact" style={{ color: "var(--mint)" }}>
            Contact page
          </Link>
          .
        </p>
      </section>

      <SiteFooter variant="more" />
    </>
  );
}
