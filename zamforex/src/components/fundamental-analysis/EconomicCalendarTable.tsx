"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Impact = "Low" | "Medium" | "High";
type Surprise = "beat" | "miss" | "inline";

type CalEvent = {
  id: string;
  flag: string;
  currency: string;
  event: string;
  date: string;
  time: string;
  previous: string;
  forecast: string;
  actual: string;
  impact: Impact;
  surprise: Surprise;
  detail: string;
};

const events: CalEvent[] = [
  {
    id: "usd-nfp",
    flag: "🇺🇸",
    currency: "USD",
    event: "Non-Farm Payrolls",
    date: "Fri, Aug 1",
    time: "08:30 EST",
    previous: "180K",
    forecast: "200K",
    actual: "285K",
    impact: "High",
    surprise: "beat",
    detail: "Jobs added blew past forecast by 85K. Combined with a steady unemployment rate, this reading pushed traders to price in a more hawkish Fed path, and USD strengthened broadly within minutes of the release.",
  },
  {
    id: "eur-rate",
    flag: "🇪🇺",
    currency: "EUR",
    event: "ECB Interest Rate Decision",
    date: "Thu, Jul 24",
    time: "07:15 EST",
    previous: "4.25%",
    forecast: "4.25%",
    actual: "4.25%",
    impact: "High",
    surprise: "inline",
    detail: "The ECB held rates exactly as forecast. With no surprise in the decision itself, the market's attention shifted entirely to the press conference for forward guidance on the next move.",
  },
  {
    id: "gbp-cpi",
    flag: "🇬🇧",
    currency: "GBP",
    event: "CPI y/y",
    date: "Wed, Jul 16",
    time: "02:00 EST",
    previous: "3.4%",
    forecast: "3.3%",
    actual: "3.6%",
    impact: "High",
    surprise: "beat",
    detail: "UK inflation printed hotter than expected for the second month running. This reduced expectations for a near-term BoE rate cut, which supported GBP against most major peers.",
  },
  {
    id: "jpy-boj",
    flag: "🇯🇵",
    currency: "JPY",
    event: "BoJ Policy Statement",
    date: "Tue, Jul 15",
    time: "23:00 EST",
    previous: "-0.10%",
    forecast: "0.00%",
    actual: "0.00%",
    impact: "Medium",
    surprise: "inline",
    detail: "The BoJ's move away from negative rates landed exactly as forecast. JPY reaction was muted on the decision itself, but volatile around the governor's press conference commentary.",
  },
  {
    id: "aud-employment",
    flag: "🇦🇺",
    currency: "AUD",
    event: "Employment Change",
    date: "Thu, Jul 17",
    time: "20:30 EST",
    previous: "38.5K",
    forecast: "20.0K",
    actual: "-6.6K",
    impact: "Medium",
    surprise: "miss",
    detail: "Australia unexpectedly shed jobs against a forecast for solid growth. AUD dropped as traders priced in a higher chance of an RBA rate cut later in the year.",
  },
  {
    id: "cad-corecpi",
    flag: "🇨🇦",
    currency: "CAD",
    event: "Core CPI m/m",
    date: "Tue, Jul 22",
    time: "08:30 EST",
    previous: "0.1%",
    forecast: "0.2%",
    actual: "0.1%",
    impact: "Low",
    surprise: "inline",
    detail: "A minor miss on a lower-impact secondary inflation gauge. The reaction in CAD was minimal — most traders were already waiting on the following week's full CPI report.",
  },
  {
    id: "usd-retail",
    flag: "🇺🇸",
    currency: "USD",
    event: "Retail Sales m/m",
    date: "Tue, Jul 15",
    time: "08:30 EST",
    previous: "0.3%",
    forecast: "0.2%",
    actual: "0.6%",
    impact: "Medium",
    surprise: "beat",
    detail: "Consumer spending came in well above forecast, reinforcing the resilient-economy narrative and adding modest support to USD alongside that week's other data.",
  },
  {
    id: "nzd-rbnz",
    flag: "🇳🇿",
    currency: "NZD",
    event: "RBNZ Rate Statement",
    date: "Wed, Jul 9",
    time: "18:00 EST",
    previous: "5.50%",
    forecast: "5.50%",
    actual: "5.50%",
    impact: "High",
    surprise: "inline",
    detail: "Rates held as expected. The statement leaned slightly more dovish than the prior meeting, which weighed on NZD even though the rate itself matched forecast.",
  },
];

const impactColor: Record<Impact, string> = {
  Low: "var(--cat-1)",
  Medium: "var(--gold)",
  High: "var(--cat-8)",
};

const surpriseColor: Record<Surprise, string> = {
  beat: "var(--mint)",
  miss: "var(--red)",
  inline: "var(--gold)",
};

export default function EconomicCalendarTable() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="calendar-list">
      <div className="calendar-header-row">
        <span>Date / Time</span>
        <span>Event</span>
        <span>Previous</span>
        <span>Forecast</span>
        <span>Actual</span>
        <span>Impact</span>
      </div>

      {events.map((e) => {
        const open = openId === e.id;
        return (
          <div key={e.id}>
            <div
              className={`calendar-row${open ? " open" : ""}`}
              onClick={() => setOpenId(open ? null : e.id)}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="cal-cell-label">Date / Time</span>
                {e.date}
                <br />
                <span style={{ color: "var(--muted)", fontSize: "11px" }}>{e.time}</span>
              </div>
              <div className="cal-event-cell">
                <span className="cal-flag">{e.flag}</span>
                <span>
                  {e.currency} — {e.event}
                </span>
              </div>
              <div>
                <span className="cal-cell-label">Previous</span>
                {e.previous}
              </div>
              <div>
                <span className="cal-cell-label">Forecast</span>
                {e.forecast}
              </div>
              <div>
                <span className="cal-cell-label">Actual</span>
                <span style={{ color: surpriseColor[e.surprise], fontWeight: 700 }}>{e.actual}</span>
              </div>
              <div>
                <span className="cal-cell-label">Impact</span>
                <span className="cal-impact" style={{ borderColor: impactColor[e.impact], color: impactColor[e.impact] }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: impactColor[e.impact], display: "inline-block" }} />
                  {e.impact}
                </span>
              </div>
            </div>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="cal-detail">
                    <b>What happened:</b> {e.detail}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
