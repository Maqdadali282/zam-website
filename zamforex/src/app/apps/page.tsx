import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import PlatformCard from "@/components/apps/PlatformCard";
import { AURUM_SIGNUP_URL } from "@/lib/affiliateLinks";

export const metadata: Metadata = {
  title: "Trading Apps — MetaTrader 4 & 5 | Zam Forex",
  description:
    "Download MetaTrader 4 and MetaTrader 5 for Windows, Android, and iPhone to start trading Forex, Crypto, Indices & Gold.",
};

const mt4Icon = (
  <Image src="/assets/icons/mt4.png" alt="MetaTrader 4" width={64} height={64} />
);

const mt5Icon = (
  <Image src="/assets/icons/mt5.png" alt="MetaTrader 5" width={64} height={64} />
);

export default function AppsPage() {
  return (
    <>
      <SiteNav variant="apps" />

      <Reveal className="apps-hero">
        <div className="eyebrow">Trading Apps</div>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 50px)" }}>
          Trade Anywhere, <span className="line2">On Any Device</span>
        </h1>
        <p className="lead">
          Download MT4 and MT5 to start trading Forex, Crypto, Indices &amp;
          Gold with professional tools. Learn, trade &amp; grow with
          ZAMFOREX.
        </p>
      </Reveal>

      <section id="platforms">
        <div className="platform-grid">
          <PlatformCard
            name="MetaTrader 4"
            tagline="The most trusted trading platform for Forex & Crypto. Perfect for beginners."
            icon={mt4Icon}
            windowsHref="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt4/mt4setup.exe"
            androidHref="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader4"
            iphoneHref="https://apps.apple.com/app/metatrader-4/id496212596"
          />
          <PlatformCard
            name="MetaTrader 5"
            tagline="Fast execution, deeper analysis, and smart trading tools for experts."
            icon={mt5Icon}
            windowsHref="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe"
            androidHref="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5"
            iphoneHref="https://apps.apple.com/app/metatrader-5/id413251709"
          />
        </div>

        <Reveal className="market-pulse-banner" style={{ marginTop: "40px" }}>
          <Image
            src="/assets/diary/mobile-trading-app.jpg"
            alt="A trader checking live positions on a mobile trading app"
            fill
            sizes="(max-width: 900px) 100vw, 1200px"
            style={{ objectFit: "cover" }}
          />
          <div className="market-pulse-banner-text">
            <div className="eyebrow">Trade From Anywhere</div>
            <h3>Your whole watchlist, right in your pocket.</h3>
            <p>
              MT4 and MT5 keep your charts, orders, and account in sync
              across desktop and mobile — pick up exactly where you left
              off.
            </p>
            <a className="btn btn-primary" href={AURUM_SIGNUP_URL} target="_blank" rel="noopener">
              Join Trading →
            </a>
          </div>
        </Reveal>

        <IbCtaBand
          heading="New to Forex & Crypto?"
          body="ZAMFOREX teaches you all the important trading concepts — from basic market structure to advanced technical analysis, risk management, and strategy building. Once you've installed your platform, open a live account and start trading confidently."
          learnMoreHref="/forex-learning"
          learnMoreLabel="Start Learning"
          style={{ marginTop: "40px" }}
        />
      </section>

      <SiteFooter variant="apps" />
    </>
  );
}
