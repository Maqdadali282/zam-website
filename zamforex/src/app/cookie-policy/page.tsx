import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Cookie Policy | Zam Forex",
  description:
    "How Zam Forex uses cookies — necessary site cookies, your dark/light theme preference, and third-party cookies set by embedded TradingView market widgets.",
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

export default function CookiePolicyPage() {
  return (
    <>
      <SiteNav variant="more" />

      <div className="ta-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Cookie Policy</span>
      </div>

      <div className="ta-page-head" style={{ maxWidth: "820px" }}>
        <div className="eyebrow">Legal</div>
        <h1>Cookie Policy</h1>
      </div>

      <section className="cat-section" style={{ maxWidth: "820px", margin: "0 auto", padding: "0 5% 60px" }}>
        <p style={proseP}>
          This page explains what cookies Zam Forex uses, why we use them,
          and how you can control them. We keep this simple on purpose — Zam
          Forex doesn&apos;t run advertising trackers, and doesn&apos;t
          currently run analytics either. The only cookies involved are the
          ones described below, and none of the optional ones load until you
          choose to allow them.
        </p>

        <h3 style={{ marginTop: "32px", marginBottom: "12px" }}>What are cookies?</h3>
        <p style={proseP}>
          Cookies (and similar technologies like browser local storage) are
          small pieces of data stored on your device when you visit a
          website. They&apos;re used to remember information about your
          visit, like your preferences, or to let embedded content from
          other sites function correctly.
        </p>

        <h3 style={{ marginTop: "32px", marginBottom: "12px" }}>Cookies we use</h3>

        <div className="table-scroll" style={{ marginBottom: "20px" }}>
          <table className="compare-table" style={{ minWidth: "600px" }}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="factor">Essential</td>
                <td>zf-cookie-consent</td>
                <td>Remembers your cookie choices so we don&apos;t ask again every visit. Always active.</td>
                <td>Persistent, until cleared</td>
              </tr>
              <tr>
                <td className="factor">Functional</td>
                <td>zf-theme</td>
                <td>Remembers whether you prefer dark or light mode. Optional — only stored if you consent to Functional cookies.</td>
                <td>Persistent, until cleared or declined</td>
              </tr>
              <tr>
                <td className="factor">Analytics</td>
                <td>—</td>
                <td>
                  Would be used to understand site usage and improve content.
                  Zam Forex doesn&apos;t run any analytics today, so nothing
                  is actually set — this category exists so your preference
                  is already on record if that changes.
                </td>
                <td>Not currently in use</td>
              </tr>
              <tr>
                <td className="factor">Third-Party</td>
                <td>TradingView widget cookies</td>
                <td>Set by TradingView when the live ticker, chart, or economic calendar widgets load, so they can display real-time market data. Optional — the widgets don&apos;t load at all until you consent.</td>
                <td>Set by TradingView</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={proseP}>
          The <b style={{ color: "var(--text)" }}>Essential</b> and{" "}
          <b style={{ color: "var(--text)" }}>Functional</b> entries above
          are technically stored in your browser&apos;s local storage rather
          than as traditional cookies, but they work the same way and are
          covered by this policy for clarity. Neither one identifies you
          personally or is shared with anyone.
        </p>

        <h3 style={{ marginTop: "32px", marginBottom: "12px" }}>About the TradingView widgets</h3>
        <p style={proseP}>
          The live ticker, chart, and economic calendar on this site are
          embedded TradingView widgets, loaded from TradingView&apos;s own
          servers. Once loaded, they can set their own cookies and use their
          own local storage under TradingView&apos;s domain — we don&apos;t
          control, read, or have access to whatever TradingView does with
          that data. See{" "}
          <a
            href="https://www.tradingview.com/policies/"
            target="_blank"
            rel="noopener"
            style={{ color: "var(--mint)" }}
          >
            TradingView&apos;s own policies
          </a>{" "}
          for details on their side of things.
        </p>
        <p style={proseP}>
          What we <i>can</i> control is whether the widget loads at all: the
          script that creates it is only inserted into the page after you
          explicitly consent to the &quot;Third-Party&quot; category, so no
          TradingView request — and no TradingView cookie — happens before
          that choice is made. If you decline, you&apos;ll see a short
          notice in the widget&apos;s place instead, with a link back to
          cookie preferences. What we <i>can&apos;t</i> do is reach into your
          browser and delete cookies TradingView already set on their own
          domain (from before you changed your mind, or from visiting
          tradingview.com directly) — those need to be cleared from your
          browser&apos;s own settings, or from TradingView directly.
        </p>

        <h3 style={{ marginTop: "32px", marginBottom: "12px" }}>Managing your preferences</h3>
        <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
          <li style={proseLi}>
            Click <b style={{ color: "var(--text)" }}>Cookie Preferences</b>{" "}
            in the footer of any page to reopen the consent banner and change
            your choice at any time.
          </li>
          <li style={proseLi}>
            You can also block or delete cookies and local storage entirely
            through your browser&apos;s privacy settings — this may affect
            how parts of the site display.
          </li>
        </ul>

        <h3 style={{ marginTop: "32px", marginBottom: "12px" }}>Changes to this policy</h3>
        <p style={proseP}>
          If what we use cookies for changes, we&apos;ll update this page. If
          you have questions about this policy, reach out via our{" "}
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
