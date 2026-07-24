"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";
import { useCookieConsent } from "@/lib/cookieConsent";

export default function AdvancedChart() {
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
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.text = JSON.stringify({
      autosize: true,
      symbol: "OANDA:XAUUSD",
      interval: "1",
      timezone: "Etc/UTC",
      theme: theme,
      style: "1",
      locale: "en",
      withdateranges: true,
      hide_side_toolbar: true,
      allow_symbol_change: true,
      details: false,
      hotlist: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
      watchlist: [
        "FX:EURUSD",
        "FX:GBPUSD",
        "FX:USDJPY",
        "FX:USDCHF",
        "FX:AUDUSD",
        "FX:USDCAD",
        "FX:NZDUSD",
        "FX:EURGBP",
        "FX:EURJPY",
        "FX:GBPJPY",
        "FX:EURCHF",
        "FX:AUDJPY",
        "FX:EURAUD",
        "FX:GBPAUD",
        "FX:CADJPY",
        "FX:CHFJPY",
        "FX:NZDJPY",
        "OANDA:XAUUSD",
        "OANDA:XAGUSD",
        "TVC:USOIL",
        "TVC:NATURALGAS",
        "TVC:DEU30",
      ],
    });
    container.appendChild(script);
  }, [theme, allowed]);

  if (!allowed) {
    return (
      <div className="chart-embed">
        <div className="cookie-gate">
          <span>Live chart requires third-party cookies.</span>
          <button type="button" className="btn-text" onClick={reopen}>
            {decided ? "Enable third-party cookies" : "Choose cookie settings"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-embed">
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
