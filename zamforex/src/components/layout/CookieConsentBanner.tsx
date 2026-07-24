"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCookieConsent, type CookiePrefs } from "@/lib/cookieConsent";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

function ToggleRow({
  label,
  desc,
  checked,
  locked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="consent-row">
      <div>
        <div className="consent-row-label">
          {label}
          {locked && <span className="consent-locked">Always Active</span>}
        </div>
        <p>{desc}</p>
      </div>
      <label className={`consent-toggle${locked ? " locked" : ""}`}>
        <input
          type="checkbox"
          checked={checked}
          disabled={locked}
          aria-label={locked ? `${label} (always active, cannot be turned off)` : label}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="consent-toggle-track" />
      </label>
    </div>
  );
}

export default function CookieConsentBanner() {
  const {
    decided,
    showBanner,
    showPreferences,
    prefs,
    acceptAll,
    declineNonEssential,
    savePrefs,
    openPreferences,
    closePreferences,
    dismiss,
  } = useCookieConsent();
  const [draft, setDraft] = useState<CookiePrefs>(prefs);

  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (showPreferences) setDraft(prefs);
    // Only resync when the panel opens, not on every prefs/draft change —
    // otherwise in-progress toggle edits would get overwritten.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPreferences]);

  // Move focus into the dialog when it appears, and restore it to whatever
  // was focused beforehand (e.g. the footer's "Cookie Preferences" link)
  // once it closes.
  useEffect(() => {
    if (showBanner) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      dialogRef.current?.focus();
    } else if (lastFocusedRef.current) {
      lastFocusedRef.current.focus();
      lastFocusedRef.current = null;
    }
  }, [showBanner]);

  // Backing out of the preferences panel: a visitor who already has a
  // decision on file (reviewing via the footer link) just closes; a
  // first-time visitor still mid-decision returns to the summary instead —
  // they aren't allowed to escape the choice entirely.
  const handleBack = () => {
    if (decided) dismiss();
    else closePreferences();
  };

  // Escape mirrors the Back button. Keyboard focus is trapped inside the
  // dialog while it's open.
  useEffect(() => {
    if (!showBanner) return;

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (showPreferences) {
          e.preventDefault();
          handleBack();
        }
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        ).filter((el) => el.offsetParent !== null);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [showBanner, showPreferences, decided, dismiss, closePreferences]);

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="cookie-banner"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-heading"
        ref={dialogRef}
        tabIndex={-1}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {!showPreferences ? (
          <div className="cookie-banner-inner">
            <div className="cookie-banner-text">
              <h3 id="cookie-banner-heading">This website uses cookies to give you the best experience.</h3>
              <p>
                Zam Forex uses cookies that are necessary for the site to
                work, plus optional cookies for remembering your display
                preferences and for embedded TradingView widgets (the price
                ticker, live charts, and economic calendar) that show real
                market data. Optional cookies only load once you consent.
              </p>
              <p>
                See our <Link href="/cookie-policy">Cookie Policy</Link> to
                read more about the cookies we set. You can withdraw or
                change your consent at any time from &quot;Cookie
                Preferences&quot; in the footer.
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-primary" onClick={acceptAll}>
                Accept all cookies
              </button>
              <button type="button" className="btn btn-ghost" onClick={declineNonEssential}>
                Decline non-necessary cookies
              </button>
              <button type="button" className="btn btn-text" onClick={openPreferences}>
                Cookie preferences
              </button>
            </div>
          </div>
        ) : (
          <div className="cookie-banner-inner cookie-prefs">
            <div className="cookie-banner-text">
              <h3 id="cookie-banner-heading">Cookie Preferences</h3>
              <p>
                Choose which categories of cookies Zam Forex is allowed to
                use. Essential cookies can&apos;t be turned off — the site
                needs them to function.
              </p>
            </div>

            <div className="consent-rows">
              <ToggleRow
                label="Essential Cookies"
                desc="Required for the website to function — page navigation, security, and remembering this consent choice."
                checked
                locked
              />
              <ToggleRow
                label="Functional Cookies"
                desc="Used for preferences such as dark/light mode and other display settings."
                checked={draft.functional}
                onChange={(v) => setDraft((d) => ({ ...d, functional: v }))}
              />
              <ToggleRow
                label="Analytics Cookies"
                desc="Used to understand website usage and improve content. Zam Forex doesn't run analytics today — this simply keeps your preference on file for if that changes."
                checked={draft.analytics}
                onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
              />
              <ToggleRow
                label="Third-Party / Embedded Content"
                desc="Used for services such as embedded TradingView widgets and other third-party market data components. These aren't loaded at all until you allow this category."
                checked={draft.thirdParty}
                onChange={(v) => setDraft((d) => ({ ...d, thirdParty: v }))}
              />
            </div>

            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-primary" onClick={() => savePrefs(draft)}>
                Save preferences
              </button>
              <button type="button" className="btn btn-ghost" onClick={acceptAll}>
                Accept all cookies
              </button>
              <button
                type="button"
                className="btn btn-text"
                onClick={handleBack}
                aria-label={decided ? "Close cookie preferences" : "Back to cookie summary"}
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
