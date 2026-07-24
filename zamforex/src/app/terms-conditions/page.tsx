import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Terms & Conditions | Zam Forex",
  description:
    "The rules for using the Zam Forex website — eligibility, user responsibilities, the trading and educational-purpose disclaimers, and governing law.",
};

const proseP: CSSProperties = {
  color: "var(--muted)",
  fontSize: "var(--fs-body)",
  lineHeight: "var(--lh-body)",
  marginBottom: "16px",
};
const h3Style: CSSProperties = { marginTop: "32px", marginBottom: "12px" };

export default function TermsConditionsPage() {
  return (
    <>
      <SiteNav variant="more" />

      <div className="ta-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Terms &amp; Conditions</span>
      </div>

      <div className="ta-page-head" style={{ maxWidth: "820px" }}>
        <div className="eyebrow">Legal</div>
        <h1>Terms &amp; Conditions</h1>
      </div>

      <section className="cat-section" style={{ maxWidth: "820px", margin: "0 auto", padding: "0 5% 60px" }}>
        <p style={proseP}>
          By using the Zam Forex website (&quot;the Site&quot;), you agree to
          these Terms. If you don&apos;t agree, please don&apos;t use the
          Site. It&apos;s your responsibility to confirm that accessing this
          content and opening a broker account is lawful where you live.
        </p>

        <h3 style={h3Style}>Accounts &amp; user responsibilities</h3>
        <p style={proseP}>
          ZamForex doesn&apos;t require registration to browse lessons or use
          our calculators. Any trading account you open is opened directly
          with an independent broker (such as Aurum Markets or CorePrime
          Markets) through a referral link, governed by that broker&apos;s
          own terms — not ours. You agree to use our content lawfully, not
          attempt to disrupt the Site, and take full responsibility for any
          trading decisions made on any broker account.
        </p>

        <h3 style={h3Style}>Trading disclaimer &amp; educational purpose</h3>
        <p style={proseP}>
          Nothing on this Site is financial or trading advice, and nothing
          should be read as a recommendation to buy, sell, or hold any
          instrument. All lessons, examples, and calculators are provided
          strictly for education. Past performance of any strategy or
          pattern is not indicative of future results — see our full{" "}
          <Link href="/risk-disclosure" style={{ color: "var(--mint)" }}>
            Risk Disclosure
          </Link>
          .
        </p>

        <h3 style={h3Style}>Intellectual property</h3>
        <p style={proseP}>
          The ZamForex name, logo, and original lessons are our property
          unless credited otherwise. You may reference our content for
          personal, non-commercial use, but not republish or resell it
          without permission.
        </p>

        <h3 style={h3Style}>Payments &amp; refunds</h3>
        <p style={proseP}>
          ZamForex doesn&apos;t charge for any content, tool, or calculator
          on this Site — everything is free. We earn revenue through
          Introducing Broker referral commissions when you trade on an
          account opened through our links, at no extra cost to you. We
          don&apos;t hold your funds, so billing questions about deposits or
          withdrawals must go directly to your broker.
        </p>

        <h3 style={h3Style}>Liability &amp; governing law</h3>
        <p style={proseP}>
          To the fullest extent permitted by law, ZamForex is not liable for
          any loss — including trading losses — arising from your use of
          this Site. The Site is provided &quot;as is&quot;, without
          warranties. These Terms are governed by the laws applicable in the
          United Arab Emirates, reflecting our place of operation, without
          removing any protection you&apos;re entitled to under your own
          country&apos;s consumer laws.
        </p>

        <h3 style={h3Style}>Contact</h3>
        <p style={proseP}>
          Questions about these Terms? Reach us at{" "}
          <a href="mailto:zamforex110@gmail.com" style={{ color: "var(--mint)" }}>
            zamforex110@gmail.com
          </a>{" "}
          or through our{" "}
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
