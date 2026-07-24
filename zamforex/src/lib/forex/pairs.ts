export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD" | "CHF" | "NZD";

export const CURRENCIES: CurrencyCode[] = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"];

export const CURRENCY_NAMES: Record<CurrencyCode, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  NZD: "New Zealand Dollar",
};

export type CurrencyPair = {
  symbol: string;
  base: CurrencyCode;
  quote: CurrencyCode;
};

export const CURRENCY_PAIRS: CurrencyPair[] = [
  { symbol: "EUR/USD", base: "EUR", quote: "USD" },
  { symbol: "GBP/USD", base: "GBP", quote: "USD" },
  { symbol: "USD/JPY", base: "USD", quote: "JPY" },
  { symbol: "USD/CHF", base: "USD", quote: "CHF" },
  { symbol: "USD/CAD", base: "USD", quote: "CAD" },
  { symbol: "AUD/USD", base: "AUD", quote: "USD" },
  { symbol: "NZD/USD", base: "NZD", quote: "USD" },
  { symbol: "EUR/GBP", base: "EUR", quote: "GBP" },
  { symbol: "EUR/JPY", base: "EUR", quote: "JPY" },
  { symbol: "GBP/JPY", base: "GBP", quote: "JPY" },
  { symbol: "EUR/CHF", base: "EUR", quote: "CHF" },
  { symbol: "AUD/JPY", base: "AUD", quote: "JPY" },
  { symbol: "CHF/JPY", base: "CHF", quote: "JPY" },
  { symbol: "CAD/JPY", base: "CAD", quote: "JPY" },
  { symbol: "NZD/JPY", base: "NZD", quote: "JPY" },
  { symbol: "EUR/AUD", base: "EUR", quote: "AUD" },
  { symbol: "GBP/AUD", base: "GBP", quote: "AUD" },
];

export function findPair(symbol: string): CurrencyPair {
  return CURRENCY_PAIRS.find((p) => p.symbol === symbol) ?? CURRENCY_PAIRS[0];
}

/** Standard pip size: 0.01 for JPY-quoted pairs, 0.0001 for everything else. */
export function getPipSize(pair: CurrencyPair): number {
  return pair.quote === "JPY" ? 0.01 : 0.0001;
}

/** Decimal places typically shown for a pair's price (one fractional-pip digit beyond the pip itself). */
export function getPriceDecimals(pair: CurrencyPair): number {
  return pair.quote === "JPY" ? 3 : 5;
}

// Illustrative starting values only — never presented as live market data.
// Every calculator page that uses these labels them clearly and lets the
// user override with the rate they actually see on their platform.
export const ILLUSTRATIVE_PRICES: Record<string, number> = {
  "EUR/USD": 1.085,
  "GBP/USD": 1.2735,
  "USD/JPY": 155.42,
  "USD/CHF": 0.882,
  "USD/CAD": 1.365,
  "AUD/USD": 0.653,
  "NZD/USD": 0.598,
  "EUR/GBP": 0.852,
  "EUR/JPY": 168.6,
  "GBP/JPY": 197.9,
  "EUR/CHF": 0.957,
  "AUD/JPY": 101.5,
  "CHF/JPY": 176.2,
  "CAD/JPY": 113.9,
  "NZD/JPY": 92.9,
  "EUR/AUD": 1.661,
  "GBP/AUD": 1.949,
};

export function getIllustrativeRate(from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return 1;
  const direct = ILLUSTRATIVE_PRICES[`${from}/${to}`];
  if (direct) return direct;
  const inverse = ILLUSTRATIVE_PRICES[`${to}/${from}`];
  if (inverse) return 1 / inverse;
  return 1;
}
