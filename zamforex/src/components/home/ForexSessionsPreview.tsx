"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/common/Reveal";

type Session = {
  name: string;
  tz: string;
  openUTC: number;
  closeUTC: number;
  color: string;
};

const SESSIONS: Session[] = [
  { name: "Sydney", tz: "Australia/Sydney", openUTC: 22, closeUTC: 7, color: "var(--cat-1)" },
  { name: "Tokyo", tz: "Asia/Tokyo", openUTC: 0, closeUTC: 9, color: "var(--cat-3)" },
  { name: "London", tz: "Europe/London", openUTC: 8, closeUTC: 17, color: "var(--mint)" },
  { name: "New York", tz: "America/New_York", openUTC: 13, closeUTC: 22, color: "var(--gold)" },
];

function isHourInRange(hour: number, open: number, close: number) {
  if (open < close) return hour >= open && hour < close;
  return hour >= open || hour < close;
}

function formatUTCRange(open: number, close: number) {
  const fmt = (h: number) => `${String(h).padStart(2, "0")}:00`;
  return `${fmt(open)}–${fmt(close)} UTC`;
}

export default function ForexSessionsPreview() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const utcHour = now ? now.getUTCHours() : null;

  return (
    <section id="forex-sessions">
      <Reveal className="section-head">
        <div className="eyebrow">Markets · Sessions</div>
        <h2>The Forex Day Never Sleeps</h2>
        <p>
          Four major sessions hand off to each other around the clock — here&apos;s
          when each one is live right now.
        </p>
      </Reveal>

      <Reveal className="world-clock-grid">
        {SESSIONS.map((s) => {
          const open = utcHour !== null && isHourInRange(utcHour, s.openUTC, s.closeUTC);
          return (
            <div
              key={s.name}
              className="world-clock-card"
              style={{ borderColor: open ? s.color : "var(--line)" }}
            >
              <span className="world-clock-city">{s.name}</span>
              <span className="world-clock-offset" style={{ marginTop: "-2px" }}>
                {formatUTCRange(s.openUTC, s.closeUTC)}
              </span>
              <span className="world-clock-offset" style={{ color: open ? s.color : "var(--muted)" }}>
                {open ? "● Open now" : "○ Closed"}
              </span>
            </div>
          );
        })}
      </Reveal>

      <div style={{ textAlign: "center", marginTop: "28px" }}>
        <Link className="btn btn-primary" href="/markets/trading-sessions">
          View Full Trading Sessions →
        </Link>
      </div>
    </section>
  );
}
