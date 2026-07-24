"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import SiteSearch from "./SiteSearch";
import { TOOLS } from "@/components/tools/toolsData";
import { LEARNING_SECTIONS } from "@/components/forex-learning/learningData";
import { MARKETS } from "@/components/markets/marketsData";
import { COREPRIME_SIGNUP_URL } from "@/lib/affiliateLinks";

const moreLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/risk-disclosure", label: "Risk Disclosure" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

type NavVariant =
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

type DropdownId = "tools" | "learning" | "markets" | "more";

const toolLinks = TOOLS.map((t) => ({ href: `/tools/${t.slug}`, label: t.name }));
const learningLinks = LEARNING_SECTIONS.map((s) => ({ href: s.href, label: s.name }));
const marketLinks = MARKETS.map((m) => ({ href: m.href, label: m.name }));

function navLinks(variant: NavVariant) {
  const prefix = variant === "home" ? "" : "/";
  return [
    { id: "home", href: `${prefix}#home`, label: "Home" },
    { id: "markets", href: "/markets", label: "Markets" },
    { id: "apps", href: "/apps", label: "Apps" },
    { id: "brokers", href: "/best-brokers", label: "Best Brokers" },
    { id: "learning", href: "/forex-learning", label: "Forex Learning" },
    { id: "tools", href: "/tools", label: "Tools" },
    { id: "contact", href: "/contact", label: "Contact Us" },
    { id: "more", href: "#", label: "More" },
  ];
}

const Chevron = () => (
  <svg className="chevron" width="10" height="7" viewBox="0 0 12 8">
    <path
      d="M1 1 L6 6 L11 1"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SiteNav({ variant = "home" }: { variant?: NavVariant }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const links = navLinks(variant);
  const isLearningPage =
    variant === "fundamental" || variant === "technical" || variant === "basics";
  const isActive = (id: string) =>
    variant === id || (isLearningPage && id === "learning");

  const learningRef = useRef<HTMLDivElement | null>(null);
  const marketsRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!openDropdown) return;
    const refs = { tools: toolsRef, learning: learningRef, markets: marketsRef, more: moreRef };
    const ref = refs[openDropdown];
    const handlePointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDropdown]);

  return (
    <>
      <nav>
        <Link href="/" className="logo" style={{ textDecoration: "none" }}>
          <svg className="logo-mark" viewBox="0 0 100 100">
            <use href="#zfLogoMark" />
          </svg>
          ZAM<span className="accent">FOREX</span>
        </Link>
        <div className="nav-links">
          {links.map((link) => {
            if (link.id === "markets") {
              return (
                <div className="nav-dropdown" ref={marketsRef} key={link.id}>
                  <button
                    type="button"
                    className={`nav-dropdown-trigger${isActive("markets") ? " active" : ""}${openDropdown === "markets" ? " open" : ""}`}
                    aria-expanded={openDropdown === "markets"}
                    onClick={() => setOpenDropdown((v) => (v === "markets" ? null : "markets"))}
                  >
                    {link.label}
                    <Chevron />
                  </button>
                  <div className={`nav-dropdown-menu nav-dropdown-menu--wide${openDropdown === "markets" ? " open" : ""}`}>
                    <Link href="/markets" className="nav-dropdown-menu-all" onClick={() => setOpenDropdown(null)}>
                      Markets — Dashboard
                    </Link>
                    <div className="nav-dropdown-menu-divider" />
                    {marketLinks.map((m) => (
                      <Link key={m.href} href={m.href} onClick={() => setOpenDropdown(null)}>
                        {m.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            if (link.id === "tools") {
              return (
                <div className="nav-dropdown" ref={toolsRef} key={link.id}>
                  <button
                    type="button"
                    className={`nav-dropdown-trigger${isActive("tools") ? " active" : ""}${openDropdown === "tools" ? " open" : ""}`}
                    aria-expanded={openDropdown === "tools"}
                    onClick={() => setOpenDropdown((v) => (v === "tools" ? null : "tools"))}
                  >
                    {link.label}
                    <Chevron />
                  </button>
                  <div className={`nav-dropdown-menu nav-dropdown-menu--wide${openDropdown === "tools" ? " open" : ""}`}>
                    <Link href="/tools" className="nav-dropdown-menu-all" onClick={() => setOpenDropdown(null)}>
                      All Tools — Dashboard
                    </Link>
                    <div className="nav-dropdown-menu-divider" />
                    {toolLinks.map((t) => (
                      <Link key={t.href} href={t.href} onClick={() => setOpenDropdown(null)}>
                        {t.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            if (link.id === "learning") {
              return (
                <div className="nav-dropdown" ref={learningRef} key={link.id}>
                  <button
                    type="button"
                    className={`nav-dropdown-trigger${isActive("learning") ? " active" : ""}${openDropdown === "learning" ? " open" : ""}`}
                    aria-expanded={openDropdown === "learning"}
                    onClick={() => setOpenDropdown((v) => (v === "learning" ? null : "learning"))}
                  >
                    {link.label}
                    <Chevron />
                  </button>
                  <div className={`nav-dropdown-menu nav-dropdown-menu--wide${openDropdown === "learning" ? " open" : ""}`}>
                    <Link href="/forex-learning" className="nav-dropdown-menu-all" onClick={() => setOpenDropdown(null)}>
                      Forex Learning — Hub
                    </Link>
                    <div className="nav-dropdown-menu-divider" />
                    {learningLinks.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setOpenDropdown(null)}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            if (link.id === "more") {
              return (
                <div className="nav-dropdown" ref={moreRef} key={link.id}>
                  <button
                    type="button"
                    className={`nav-dropdown-trigger${openDropdown === "more" ? " open" : ""}`}
                    aria-expanded={openDropdown === "more"}
                    onClick={() => setOpenDropdown((v) => (v === "more" ? null : "more"))}
                  >
                    {link.label}
                    <Chevron />
                  </button>
                  <div className={`nav-dropdown-menu${openDropdown === "more" ? " open" : ""}`}>
                    {moreLinks.map((m) => (
                      <Link key={m.href} href={m.href} onClick={() => setOpenDropdown(null)}>
                        {m.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.id}
                href={link.href}
                className={isActive(link.id) ? "active" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="nav-cta">
          <SiteSearch />
          <a
            className="btn btn-primary"
            href={COREPRIME_SIGNUP_URL}
            target="_blank"
            rel="noopener"
          >
            Open an Account →
          </a>
          <ThemeToggleButton id="themeToggle" />
          <button
            className="burger"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div
        className={`scrim${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`mobile-panel${menuOpen ? " open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>
          ✕
        </button>
        {links.map((link) => {
          if (link.id === "markets") {
            return (
              <div className="mobile-dropdown" key={link.id}>
                <button
                  type="button"
                  className={`mobile-dropdown-trigger${isActive("markets") ? " active" : ""}${openDropdown === "markets" ? " open" : ""}`}
                  aria-expanded={openDropdown === "markets"}
                  onClick={() => setOpenDropdown((v) => (v === "markets" ? null : "markets"))}
                >
                  {link.label}
                  <Chevron />
                </button>
                <div className={`mobile-dropdown-menu mobile-dropdown-menu--wide${openDropdown === "markets" ? " open" : ""}`}>
                  <Link
                    href="/markets"
                    className="mobile-dropdown-menu-all"
                    onClick={() => {
                      setOpenDropdown(null);
                      setMenuOpen(false);
                    }}
                  >
                    Markets — Dashboard
                  </Link>
                  <div className="mobile-dropdown-menu-divider" />
                  {marketLinks.map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      onClick={() => {
                        setOpenDropdown(null);
                        setMenuOpen(false);
                      }}
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          if (link.id === "tools") {
            return (
              <div className="mobile-dropdown" key={link.id}>
                <button
                  type="button"
                  className={`mobile-dropdown-trigger${isActive("tools") ? " active" : ""}${openDropdown === "tools" ? " open" : ""}`}
                  aria-expanded={openDropdown === "tools"}
                  onClick={() => setOpenDropdown((v) => (v === "tools" ? null : "tools"))}
                >
                  {link.label}
                  <Chevron />
                </button>
                <div className={`mobile-dropdown-menu mobile-dropdown-menu--wide${openDropdown === "tools" ? " open" : ""}`}>
                  <Link
                    href="/tools"
                    className="mobile-dropdown-menu-all"
                    onClick={() => {
                      setOpenDropdown(null);
                      setMenuOpen(false);
                    }}
                  >
                    All Tools — Dashboard
                  </Link>
                  <div className="mobile-dropdown-menu-divider" />
                  {toolLinks.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      onClick={() => {
                        setOpenDropdown(null);
                        setMenuOpen(false);
                      }}
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          if (link.id === "learning") {
            return (
              <div className="mobile-dropdown" key={link.id}>
                <button
                  type="button"
                  className={`mobile-dropdown-trigger${isActive("learning") ? " active" : ""}${openDropdown === "learning" ? " open" : ""}`}
                  aria-expanded={openDropdown === "learning"}
                  onClick={() => setOpenDropdown((v) => (v === "learning" ? null : "learning"))}
                >
                  {link.label}
                  <Chevron />
                </button>
                <div className={`mobile-dropdown-menu mobile-dropdown-menu--wide${openDropdown === "learning" ? " open" : ""}`}>
                  <Link
                    href="/forex-learning"
                    className="mobile-dropdown-menu-all"
                    onClick={() => {
                      setOpenDropdown(null);
                      setMenuOpen(false);
                    }}
                  >
                    Forex Learning — Hub
                  </Link>
                  <div className="mobile-dropdown-menu-divider" />
                  {learningLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => {
                        setOpenDropdown(null);
                        setMenuOpen(false);
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          if (link.id === "more") {
            return (
              <div className="mobile-dropdown" key={link.id}>
                <button
                  type="button"
                  className={`mobile-dropdown-trigger${openDropdown === "more" ? " open" : ""}`}
                  aria-expanded={openDropdown === "more"}
                  onClick={() => setOpenDropdown((v) => (v === "more" ? null : "more"))}
                >
                  {link.label}
                  <Chevron />
                </button>
                <div className={`mobile-dropdown-menu${openDropdown === "more" ? " open" : ""}`}>
                  {moreLinks.map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      onClick={() => {
                        setOpenDropdown(null);
                        setMenuOpen(false);
                      }}
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <Link
              key={link.id}
              href={link.href}
              className={isActive(link.id) ? "active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
        <ThemeToggleButton style={{ margin: "6px auto 0" }} />
        <a
          className="btn btn-primary"
          href={COREPRIME_SIGNUP_URL}
          target="_blank"
          rel="noopener"
          style={{ justifyContent: "center" }}
        >
          Open an Account →
        </a>
      </div>
    </>
  );
}
