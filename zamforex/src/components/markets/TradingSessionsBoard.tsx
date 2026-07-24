"use client";

import { useEffect, useId, useState } from "react";
import FlowChain from "@/components/fundamental-analysis/FlowChain";
import { COUNTRY_TIMEZONES } from "./countryTimeZones";

type Session = {
  name: string;
  center: string;
  tz: string;
  openUTC: number;
  closeUTC: number;
  color: string;
};

const SESSIONS: Session[] = [
  { name: "Sydney", center: "Sydney, Australia", tz: "Australia/Sydney", openUTC: 22, closeUTC: 7, color: "var(--cat-1)" },
  { name: "Tokyo", center: "Tokyo, Japan", tz: "Asia/Tokyo", openUTC: 0, closeUTC: 9, color: "var(--cat-3)" },
  { name: "London", center: "London, UK", tz: "Europe/London", openUTC: 8, closeUTC: 17, color: "var(--mint)" },
  { name: "New York", center: "New York, USA", tz: "America/New_York", openUTC: 13, closeUTC: 22, color: "var(--gold)" },
];

const OVERLAPS = [
  { name: "Sydney – Tokyo", startUTC: 0, endUTC: 7 },
  { name: "Tokyo – London", startUTC: 8, endUTC: 9 },
  { name: "London – New York", startUTC: 13, endUTC: 17 },
];

function isHourInRange(hour: number, open: number, close: number) {
  if (open < close) return hour >= open && hour < close;
  return hour >= open || hour < close;
}

function formatUTCRange(open: number, close: number) {
  const fmt = (h: number) => `${String(h).padStart(2, "0")}:00`;
  return `${fmt(open)}–${fmt(close)} UTC`;
}

function utcHourToday(now: Date, hourUTC: number) {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hourUTC, 0, 0));
}

function formatTime(d: Date, tz?: string) {
  return d.toLocaleTimeString(undefined, { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });
}

function formatLocalRange(now: Date, open: number, close: number, tz?: string) {
  return `${formatTime(utcHourToday(now, open), tz)}–${formatTime(utcHourToday(now, close), tz)}`;
}

function tzOffsetLabel(now: Date, tz?: string) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" }).formatToParts(now);
    const off = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
    return off.replace("GMT", "UTC") || "UTC";
  } catch {
    return "";
  }
}

function deviceTimeZoneLabel() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz.split("/").pop()?.replace(/_/g, " ") ?? tz;
  } catch {
    return "Your device";
  }
}

export default function TradingSessionsBoard() {
  const [now, setNow] = useState<Date | null>(null);
  const [selectedTz, setSelectedTz] = useState<string>("auto");
  const countrySelectId = useId();

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const utcHour = now ? now.getUTCHours() : null;
  const utcTime = now
    ? `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}`
    : null;

  const effectiveTz = selectedTz === "auto" ? undefined : selectedTz;
  const selectedCountry = COUNTRY_TIMEZONES.find((c) => c.tz === selectedTz);
  const yourLabel = selectedCountry
    ? selectedCountry.country
    : now
      ? `Your Device (${deviceTimeZoneLabel()})`
      : "Your Device";

  return (
    <div>
      <FlowChain
        steps={SESSIONS.map((s) => ({
          title: s.name,
          sub: formatUTCRange(s.openUTC, s.closeUTC),
          color: s.color,
        }))}
      />

      <div style={{ marginTop: "36px" }}>
        <h4 style={{ marginBottom: "14px" }}>Find Your Local Session Times</h4>
        <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "14px" }}>
          Auto-detected from your device by default — pick your country
          instead to see exactly which sessions are open in your own time.
        </p>
        <div className="calc-field" style={{ maxWidth: "320px", marginBottom: 0 }}>
          <label htmlFor={countrySelectId}>Show times for</label>
          <select
            id={countrySelectId}
            className="calc-select"
            value={selectedTz}
            onChange={(e) => setSelectedTz(e.target.value)}
          >
            <option value="auto">Auto-detect (this device)</option>
            {COUNTRY_TIMEZONES.map((c) => (
              <option key={c.tz} value={c.tz}>
                {c.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginTop: "32px" }}>
        <h4 style={{ marginBottom: "14px" }}>World Clock — Live</h4>
        <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "16px" }}>
          Each city&apos;s current local time, ticking live, plus your
          selected time zone.
        </p>
        <div className="world-clock-grid">
          {SESSIONS.map((s) => {
            const open = utcHour !== null && isHourInRange(utcHour, s.openUTC, s.closeUTC);
            return (
              <div
                key={s.name}
                className="world-clock-card"
                style={{ borderColor: open ? s.color : "var(--line)" }}
              >
                <span className="world-clock-city">{s.name}</span>
                <span className="world-clock-time">
                  {now ? formatTime(now, s.tz) : "--:--"}
                </span>
                <span className="world-clock-offset" style={{ color: open ? s.color : "var(--muted)" }}>
                  {open ? "● Open now" : "○ Closed"}
                </span>
              </div>
            );
          })}
          <div className="world-clock-card" style={{ borderColor: "var(--text)" }}>
            <span className="world-clock-city">
              {yourLabel} ({now ? tzOffsetLabel(now, effectiveTz) : "--"})
            </span>
            <span className="world-clock-time">
              {now ? formatTime(now, effectiveTz) : "--:--"}
            </span>
            <span className="world-clock-offset">Your selected time</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "36px" }}>
        <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "16px" }}>
          {utcTime
            ? `Current time: ${utcTime} UTC — times below are converted to ${yourLabel}. The status column is calculated live.`
            : "Calculating live session status…"}
        </p>
        <div className="table-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">Session</th>
                <th scope="col">Major Center</th>
                <th scope="col">{yourLabel}</th>
                <th scope="col">Hours (UTC)</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {SESSIONS.map((s) => {
                const open = utcHour !== null && isHourInRange(utcHour, s.openUTC, s.closeUTC);
                return (
                  <tr key={s.name}>
                    <td style={{ fontWeight: 700 }}>{s.name}</td>
                    <td>{s.center}</td>
                    <td>{now ? formatLocalRange(now, s.openUTC, s.closeUTC, effectiveTz) : "—"}</td>
                    <td>{formatUTCRange(s.openUTC, s.closeUTC)}</td>
                    <td>
                      <span
                        className="cal-impact"
                        style={{
                          borderColor: open ? "var(--mint)" : "var(--muted)",
                          color: open ? "var(--mint)" : "var(--muted)",
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: open ? "var(--mint)" : "var(--muted)",
                            display: "inline-block",
                          }}
                        />
                        {open ? "Open now" : "Closed"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: "36px" }}>
        <h4 style={{ marginBottom: "14px" }}>Session Overlaps</h4>
        <div className="ms-chip-row" style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}>
          {OVERLAPS.map((o) => {
            const active = utcHour !== null && isHourInRange(utcHour, o.startUTC, o.endUTC);
            return (
              <div
                key={o.name}
                className="ms-chip"
                style={{
                  borderColor: active ? "var(--gold)" : "var(--line)",
                  color: active ? "var(--gold)" : "var(--muted)",
                }}
              >
                {o.name} · {formatUTCRange(o.startUTC, o.endUTC)}
                {now ? ` (${formatLocalRange(now, o.startUTC, o.endUTC, effectiveTz)} ${yourLabel})` : ""}
                {active ? " · Active now" : ""}
              </div>
            );
          })}
        </div>
        <p style={{ color: "var(--muted)", fontSize: "12.5px", marginTop: "14px", lineHeight: 1.6 }}>
          The London–New York overlap typically carries the highest liquidity
          and volatility of the trading day, since both major financial
          centers are active at the same time.
        </p>
      </div>
    </div>
  );
}
