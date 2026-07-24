"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CookiePrefs = {
  functional: boolean;
  analytics: boolean;
  thirdParty: boolean;
};

const STORAGE_KEY = "zf-cookie-consent";
// Bumped whenever the set of categories changes. A stored record from an
// older version is never trusted for the *new* categories it never actually
// covered — the visitor is asked again rather than having consent assumed
// for something they never agreed to.
const STORAGE_VERSION = 2;

// Nothing optional is assumed on before the visitor has actually decided.
const defaultPrefs: CookiePrefs = { functional: false, analytics: false, thirdParty: false };

interface CookieConsentValue {
  decided: boolean;
  prefs: CookiePrefs;
  showBanner: boolean;
  showPreferences: boolean;
  acceptAll: () => void;
  declineNonEssential: () => void;
  savePrefs: (prefs: CookiePrefs) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  dismiss: () => void;
  reopen: () => void;
}

const CookieConsentContext = createContext<CookieConsentValue | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [decided, setDecided] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(defaultPrefs);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.version === STORAGE_VERSION) {
          setPrefs({
            functional: !!parsed.functional,
            analytics: !!parsed.analytics,
            thirdParty: !!parsed.thirdParty,
          });
          setDecided(true);
        } else {
          // Categories changed since this choice was made — don't carry
          // forward consent for something the visitor never actually saw.
          setShowBanner(true);
        }
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const persist = useCallback((next: CookiePrefs) => {
    setPrefs(next);
    setDecided(true);
    setShowBanner(false);
    setShowPreferences(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, ...next }));
    } catch {
      // localStorage unavailable (private browsing, etc.) — choice just won't persist
    }
  }, []);

  const acceptAll = useCallback(
    () => persist({ functional: true, analytics: true, thirdParty: true }),
    [persist],
  );
  const declineNonEssential = useCallback(
    () => persist({ functional: false, analytics: false, thirdParty: false }),
    [persist],
  );
  const savePrefs = useCallback((next: CookiePrefs) => persist(next), [persist]);
  const openPreferences = useCallback(() => setShowPreferences(true), []);
  const closePreferences = useCallback(() => setShowPreferences(false), []);
  // Closes the whole banner/panel without changing any stored choice —
  // used when a visitor who already decided is just reviewing their
  // settings and backs out without saving.
  const dismiss = useCallback(() => {
    setShowBanner(false);
    setShowPreferences(false);
  }, []);
  const reopen = useCallback(() => {
    setShowBanner(true);
    setShowPreferences(true);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        decided,
        prefs,
        showBanner,
        showPreferences,
        acceptAll,
        declineNonEssential,
        savePrefs,
        openPreferences,
        closePreferences,
        dismiss,
        reopen,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  return ctx;
}
