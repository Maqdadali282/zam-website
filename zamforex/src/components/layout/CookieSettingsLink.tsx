"use client";

import { useCookieConsent } from "@/lib/cookieConsent";

export default function CookieSettingsLink() {
  const { reopen } = useCookieConsent();
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); reopen(); }}>
      Cookie Preferences
    </a>
  );
}
