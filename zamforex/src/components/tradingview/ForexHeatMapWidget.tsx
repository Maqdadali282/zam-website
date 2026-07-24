"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";
import { useCookieConsent } from "@/lib/cookieConsent";

export default function ForexHeatMapWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { decided, prefs, reopen } = useCookieConsent();
  const allowed = decided && prefs.thirdParty;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML =
      '<div class="tradingview-widget-container__widget" style="height: 100%; width: 100%"></div>';
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
    script.text = JSON.stringify({
      width: "100%",
      height: "100%",
      currencies: ["USD", "EUR", "GBP", "JPY", "CHF", "AUD", "CAD", "NZD"],
      isTransparent: false,
      colorTheme: theme,
      locale: "en",
    });
    container.appendChild(script);
  }, [theme, allowed]);

  if (!allowed) {
    return (
      <div className="calendar-embed">
        <div className="cookie-gate">
          <span>Live currency heat map requires third-party cookies.</span>
          <button type="button" className="btn-text" onClick={reopen}>
            {decided ? "Enable third-party cookies" : "Choose cookie settings"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-embed">
      <div
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
}
