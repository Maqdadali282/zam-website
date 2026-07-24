import Link from "next/link";
import {
  WhatsAppIcon,
  TelegramIcon,
  YouTubeIcon,
  FacebookIcon,
  InstagramIcon,
} from "./SocialIcons";
import CookieSettingsLink from "./CookieSettingsLink";

const WHATSAPP_URL =
  "https://chat.whatsapp.com/FgXc5L2unIiHiEN5koSfRR?mode=ems_wa_t";
const TELEGRAM_URL = "https://t.me/ZAMGUIDE";
const YOUTUBE_URL = "https://youtube.com/channel/UCR2-VfxR97KL48jWW8edqOg";
const FACEBOOK_URL = "https://facebook.com/ZAMGUIDE110?mibextid=eQY6cl";
const INSTAGRAM_URL = "https://www.instagram.com/zam_guide?igsh=eWRxN2Z4OGpyaWVo";

type FooterVariant =
  | "home"
  | "apps"
  | "brokers"
  | "basics"
  | "tools"
  | "learning"
  | "contact"
  | "fundamental"
  | "technical"
  | "markets"
  | "more";

export default function SiteFooter({ variant = "home" }: { variant?: FooterVariant }) {
  const prefix = variant === "home" ? "" : "/";

  return (
    <footer>
      <div className="foot-grid">
        <div>
          <div className="logo" style={{ marginBottom: "14px" }}>
            <svg className="logo-mark" viewBox="0 0 100 100">
              <use href="#zfLogoMark" />
            </svg>
            ZAM<span className="accent">FOREX</span>
          </div>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "14px",
              maxWidth: "280px",
              lineHeight: 1.6,
            }}
          >
            Your trusted partner in navigating the global financial markets —
            education, tools, and honest guidance for traders of all levels.
          </p>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li>
              <Link href={`${prefix}#home`}>Home</Link>
            </li>
            <li>
              <Link href="/markets">Markets</Link>
            </li>
            <li>
              <Link href="/apps">Apps</Link>
            </li>
            <li>
              <Link href="/forex-learning">Forex Learning</Link>
            </li>
            <li>
              <Link href="/best-brokers">Best Brokers</Link>
            </li>
            <li>
              <Link href="/tools">Tools</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Resources</h5>
          <ul>
            <li>
              <Link href="/markets/economic-calendar">Economic Calendar</Link>
            </li>
            <li>
              <Link href="/forex-learning/risk-management">Risk Management</Link>
            </li>
            <li>
              <Link href="/forex-learning/frameworks">Frameworks</Link>
            </li>
            <li>
              <Link href="/forex-learning/beginner-guide">Beginner&apos;s Guide</Link>
            </li>
            <li>
              <Link href="/faq">FAQs</Link>
            </li>
            <li>
              <CookieSettingsLink />
            </li>
          </ul>
        </div>
        <div>
          <h5>Legal</h5>
          <ul>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-conditions">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link href="/risk-disclosure">Risk Disclosure</Link>
            </li>
            <li>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </li>
            <li>
              <Link href="/disclaimer">Disclaimer</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Follow Us</h5>
          <div className="social-list">
            <a
              className="social-row"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
            >
              <span className="social-icon wa">{WhatsAppIcon}</span>
              WhatsApp Community
            </a>
            <a
              className="social-row"
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
            >
              <span className="social-icon tg">{TelegramIcon}</span>
              Telegram
            </a>
            <a
              className="social-row"
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener"
            >
              <span className="social-icon yt">{YouTubeIcon}</span>
              YouTube
            </a>
            <a
              className="social-row"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener"
            >
              <span className="social-icon fb">{FacebookIcon}</span>
              Facebook
            </a>
            <a
              className="social-row"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
            >
              <span className="social-icon ig">{InstagramIcon}</span>
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Zam Forex. All Rights Reserved.</span>
        <span style={{ maxWidth: "600px" }}>
          Trading in forex, stocks, and crypto involves significant risk of
          loss and may not be suitable for all investors. Zam Forex does not
          provide financial advice. Please trade responsibly.
        </span>
      </div>
    </footer>
  );
}
