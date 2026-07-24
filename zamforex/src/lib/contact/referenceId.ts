import { randomInt } from "crypto";

/**
 * Produces a "ZF-2026-483920"-style reference ID. Not a gapless sequential
 * counter (that would need a persistent, shared store this project
 * intentionally doesn't have) — the 6 digits are the current time-of-day
 * in milliseconds plus a random component, which is unique enough for a
 * support reference without any shared state between requests.
 */
export function generateReferenceId(date: Date = new Date()): string {
  const year = date.getFullYear();
  const timeDigits = String(date.getTime() % 1000).padStart(3, "0");
  const randomDigits = String(randomInt(0, 1000)).padStart(3, "0");
  return `ZF-${year}-${timeDigits}${randomDigits}`;
}
