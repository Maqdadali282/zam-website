"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useCookieConsent } from "./cookieConsent";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "zf-theme";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const { decided, prefs } = useCookieConsent();

  const applyTheme = useCallback(
    (next: Theme) => {
      if (next === "light") {
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      // Theme is a "Functional" cookie category — the toggle still works for
      // the current visit either way, but we only *remember* it across
      // visits once functional cookies are consented to.
      if (decided && prefs.functional) {
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          // localStorage unavailable (private browsing, etc.) — theme just won't persist
        }
      }
      setTheme(next);
    },
    [decided, prefs.functional],
  );

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "light" ? "dark" : "light");
  }, [theme, applyTheme]);

  // If the visitor withdraws functional consent (or declines it outright),
  // remove the previously-stored preference rather than just stopping future writes.
  useEffect(() => {
    if (decided && !prefs.functional) {
      try {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, [decided, prefs.functional]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
