"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";
import { useCookieConsent } from "@/lib/cookieConsent";

export default function TickerTape() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { decided, prefs, reopen } = useCookieConsent();
  const allowed = decided && prefs.thirdParty;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML =
      '<div class="tradingview-widget-container__widget"></div>';
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.text = JSON.stringify({
      symbols: [
        { proName: "OANDA:XAUUSD", title: "Gold" },
        { proName: "FX:EURUSD", title: "EUR/USD" },
        { proName: "FX:GBPUSD", title: "GBP/USD" },
        { proName: "FX:USDJPY", title: "USD/JPY" },
        { proName: "FX:AUDUSD", title: "AUD/USD" },
        { proName: "FX:USDCAD", title: "USD/CAD" },
        { proName: "BINANCE:BTCUSDT", title: "Bitcoin" },
        { proName: "BINANCE:ETHUSDT", title: "Ethereum" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: theme,
      locale: "en",
    });
    container.appendChild(script);
  }, [theme, allowed]);

  if (!allowed) {
    return (
      <div className="ticker-wrap">
        <div className="cookie-gate cookie-gate-inline">
          <span>Live market ticker requires third-party cookies.</span>
          <button type="button" className="btn-text" onClick={reopen}>
            {decided ? "Enable" : "Choose cookie settings"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ticker-wrap">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}
