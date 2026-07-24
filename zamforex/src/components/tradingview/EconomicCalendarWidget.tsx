"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";
import { useCookieConsent } from "@/lib/cookieConsent";

export default function EconomicCalendarWidget() {
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
      "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.text = JSON.stringify({
      colorTheme: theme,
      isTransparent: false,
      width: "100%",
      height: "100%",
      locale: "en",
      importanceFilter: "-1,0,1",
      countryFilter:
        "us,eu,gb,jp,au,ca,nz,ch,cn",
    });
    container.appendChild(script);
  }, [theme, allowed]);

  if (!allowed) {
    return (
      <div className="calendar-embed">
        <div className="cookie-gate">
          <span>Live economic calendar requires third-party cookies.</span>
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
