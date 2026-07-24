import type { CurrencyCode } from "./pairs";

export function formatMoney(value: number, currency: CurrencyCode): string {
  if (!Number.isFinite(value)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatLots(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0.00";
  return value.toFixed(2);
}

export function formatPips(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(1)} pips`;
}
