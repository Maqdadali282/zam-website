import { CurrencyCode, CurrencyPair, getPipSize } from "./pairs";

/* ==================================================================
   Reusable Forex calculation core.
   Pure functions only — no React, no side effects — so every
   calculator page (and any future one) shares the exact same logic
   instead of re-implementing it.
   ================================================================== */

export type LotType = "standard" | "mini" | "micro" | "custom";

export const LOT_UNITS: Record<"standard" | "mini" | "micro", number> = {
  standard: 100_000,
  mini: 10_000,
  micro: 1_000,
};

export const LOT_TYPE_LABELS: Record<LotType, string> = {
  standard: "Standard Lot (100,000 units)",
  mini: "Mini Lot (10,000 units)",
  micro: "Micro Lot (1,000 units)",
  custom: "Custom Units",
};

export function lotsToUnits(lots: number, lotType: LotType, customUnits?: number): number {
  if (lotType === "custom") return customUnits ?? 0;
  return lots * LOT_UNITS[lotType];
}

export function unitsToStandardLots(units: number): number {
  return units / LOT_UNITS.standard;
}

export type ConversionMethod = "direct" | "inverse" | "manual" | "none";

export interface ConversionResult {
  amount: number;
  method: ConversionMethod;
  note: string;
}

/**
 * Converts an amount denominated in a pair's quote currency into the
 * trader's account currency.
 *
 * There is no live FX data feed wired into this site, so this never
 * invents a cross rate:
 *  - account currency === quote currency  → no conversion needed
 *  - account currency === base currency   → invert using the price itself
 *  - anything else                        → the caller must supply a
 *                                            manually-entered rate, or the
 *                                            raw quote-currency amount is
 *                                            returned with method "none"
 *                                            and a note explaining why.
 */
export function convertQuoteToAccount(
  amountInQuote: number,
  pair: CurrencyPair,
  accountCurrency: CurrencyCode,
  price: number,
  manualQuoteToAccountRate?: number,
): ConversionResult {
  if (accountCurrency === pair.quote) {
    return {
      amount: amountInQuote,
      method: "direct",
      note: `Your account currency (${accountCurrency}) matches the quote currency — no conversion needed.`,
    };
  }
  if (accountCurrency === pair.base) {
    if (!price) {
      return { amount: 0, method: "none", note: "Enter the current price to convert into your account currency." };
    }
    return {
      amount: amountInQuote / price,
      method: "inverse",
      note: `Converted from ${pair.quote} to ${pair.base} using the entered price (${pair.symbol}).`,
    };
  }
  if (manualQuoteToAccountRate && manualQuoteToAccountRate > 0) {
    return {
      amount: amountInQuote * manualQuoteToAccountRate,
      method: "manual",
      note: `Converted using your manually entered ${pair.quote}/${accountCurrency} rate.`,
    };
  }
  return {
    amount: amountInQuote,
    method: "none",
    note: `Your account currency (${accountCurrency}) is neither the base (${pair.base}) nor quote (${pair.quote}) currency of ${pair.symbol}. Enter a ${pair.quote}/${accountCurrency} rate above for an accurate figure — the value below is still in ${pair.quote}.`,
  };
}

/* ---------------------------------------------------------------- */
/* Pip value                                                          */
/* ---------------------------------------------------------------- */

export interface PipValueResult {
  pipValueAccountCcy: number;
  method: ConversionMethod;
  note: string;
}

export function calcPipValue(
  pair: CurrencyPair,
  units: number,
  accountCurrency: CurrencyCode,
  price: number,
  manualQuoteToAccountRate?: number,
): PipValueResult {
  const valueInQuote = getPipSize(pair) * units;
  const conv = convertQuoteToAccount(valueInQuote, pair, accountCurrency, price, manualQuoteToAccountRate);
  return { pipValueAccountCcy: conv.amount, method: conv.method, note: conv.note };
}

/* ---------------------------------------------------------------- */
/* Position size / Lot size (same underlying formula)                 */
/* ---------------------------------------------------------------- */

export interface PositionSizeInput {
  accountBalance: number;
  riskPercent: number;
  pair: CurrencyPair;
  entryPrice: number;
  stopLossPrice: number;
  accountCurrency: CurrencyCode;
  manualQuoteToAccountRate?: number;
}

export interface PositionSizeResult {
  riskAmount: number;
  stopLossDistancePrice: number;
  stopLossPips: number;
  pipValuePerStandardLot: number;
  recommendedLots: number;
  recommendedUnits: number;
  conversionNote: string;
}

/**
 * Standard risk-based position sizing:
 *   riskAmount = balance × risk%
 *   stopLossPips = |entry − stopLoss| / pipSize
 *   lots = riskAmount / (stopLossPips × pipValuePerStandardLot)
 */
export function calcPositionSize(input: PositionSizeInput): PositionSizeResult {
  const { accountBalance, riskPercent, pair, entryPrice, stopLossPrice, accountCurrency, manualQuoteToAccountRate } = input;
  const riskAmount = accountBalance * (riskPercent / 100);
  const stopLossDistancePrice = Math.abs(entryPrice - stopLossPrice);
  const stopLossPips = stopLossDistancePrice / getPipSize(pair);
  const pv = calcPipValue(pair, LOT_UNITS.standard, accountCurrency, entryPrice, manualQuoteToAccountRate);
  const pipValuePerStandardLot = pv.pipValueAccountCcy;

  const recommendedLots =
    stopLossPips > 0 && pipValuePerStandardLot > 0 ? riskAmount / (stopLossPips * pipValuePerStandardLot) : 0;

  return {
    riskAmount,
    stopLossDistancePrice,
    stopLossPips,
    pipValuePerStandardLot,
    recommendedLots,
    recommendedUnits: recommendedLots * LOT_UNITS.standard,
    conversionNote: pv.note,
  };
}

/* ---------------------------------------------------------------- */
/* Margin                                                              */
/* ---------------------------------------------------------------- */

export interface MarginInput {
  pair: CurrencyPair;
  accountCurrency: CurrencyCode;
  lots: number;
  lotType: LotType;
  customUnits?: number;
  leverage: number;
  price: number;
  manualQuoteToAccountRate?: number;
}

export interface MarginResult {
  units: number;
  notionalValueQuote: number;
  notionalValueAccount: number;
  requiredMargin: number;
  conversionNote: string;
}

/** requiredMargin = notionalValue / leverage */
export function calcMargin(input: MarginInput): MarginResult {
  const units = lotsToUnits(input.lots, input.lotType, input.customUnits);
  const notionalValueQuote = units * input.price;
  const conv = convertQuoteToAccount(notionalValueQuote, input.pair, input.accountCurrency, input.price, input.manualQuoteToAccountRate);
  const requiredMargin = input.leverage > 0 ? conv.amount / input.leverage : 0;
  return {
    units,
    notionalValueQuote,
    notionalValueAccount: conv.amount,
    requiredMargin,
    conversionNote: conv.note,
  };
}

/* ---------------------------------------------------------------- */
/* Profit / Loss                                                      */
/* ---------------------------------------------------------------- */

export type TradeDirection = "buy" | "sell";

export interface ProfitInput {
  pair: CurrencyPair;
  direction: TradeDirection;
  entryPrice: number;
  exitPrice: number;
  lots: number;
  lotType: LotType;
  customUnits?: number;
  accountCurrency: CurrencyCode;
  manualQuoteToAccountRate?: number;
}

export interface ProfitResult {
  units: number;
  priceDifference: number;
  percentMove: number;
  pipsMoved: number;
  profitLossQuote: number;
  profitLossAccount: number;
  conversionNote: string;
}

export function calcProfit(input: ProfitInput): ProfitResult {
  const units = lotsToUnits(input.lots, input.lotType, input.customUnits);
  const rawDiff = input.exitPrice - input.entryPrice;
  const directional = input.direction === "buy" ? rawDiff : -rawDiff;
  const percentMove = input.entryPrice ? (rawDiff / input.entryPrice) * 100 : 0;
  const pipsMoved = directional / getPipSize(input.pair);
  const profitLossQuote = directional * units;
  const conv = convertQuoteToAccount(profitLossQuote, input.pair, input.accountCurrency, input.entryPrice, input.manualQuoteToAccountRate);

  return {
    units,
    priceDifference: rawDiff,
    percentMove,
    pipsMoved,
    profitLossQuote,
    profitLossAccount: conv.amount,
    conversionNote: conv.note,
  };
}

/* ---------------------------------------------------------------- */
/* Risk : Reward                                                      */
/* ---------------------------------------------------------------- */

export interface RiskRewardInput {
  entryPrice: number;
  stopLossPrice: number;
  takeProfitPrice: number;
  direction: TradeDirection;
  pair?: CurrencyPair;
}

export interface RiskRewardResult {
  riskDistance: number;
  rewardDistance: number;
  riskPips?: number;
  rewardPips?: number;
  ratio: number;
  ratioLabel: string;
  valid: boolean;
  issue?: string;
}

export function calcRiskReward(input: RiskRewardInput): RiskRewardResult {
  const { entryPrice, stopLossPrice, takeProfitPrice, direction, pair } = input;
  const riskDistance = Math.abs(entryPrice - stopLossPrice);
  const rewardDistance = Math.abs(takeProfitPrice - entryPrice);

  let valid = true;
  let issue: string | undefined;
  if (direction === "buy") {
    if (stopLossPrice >= entryPrice) {
      valid = false;
      issue = "For a buy trade, the stop loss should be below the entry price.";
    } else if (takeProfitPrice <= entryPrice) {
      valid = false;
      issue = "For a buy trade, the take profit should be above the entry price.";
    }
  } else {
    if (stopLossPrice <= entryPrice) {
      valid = false;
      issue = "For a sell trade, the stop loss should be above the entry price.";
    } else if (takeProfitPrice >= entryPrice) {
      valid = false;
      issue = "For a sell trade, the take profit should be below the entry price.";
    }
  }

  const ratio = riskDistance > 0 ? rewardDistance / riskDistance : 0;
  const pip = pair ? getPipSize(pair) : undefined;

  return {
    riskDistance,
    rewardDistance,
    riskPips: pip ? riskDistance / pip : undefined,
    rewardPips: pip ? rewardDistance / pip : undefined,
    ratio,
    ratioLabel: `1 : ${ratio.toFixed(2)}`,
    valid,
    issue,
  };
}

/* ---------------------------------------------------------------- */
/* Spread                                                              */
/* ---------------------------------------------------------------- */

export interface SpreadInput {
  pair: CurrencyPair;
  bid: number;
  ask: number;
  lots: number;
  lotType: LotType;
  customUnits?: number;
  accountCurrency: CurrencyCode;
  manualQuoteToAccountRate?: number;
}

export interface SpreadResult {
  spreadPrice: number;
  spreadPips: number;
  units: number;
  costQuote: number;
  costAccount: number;
  conversionNote: string;
}

export function calcSpread(input: SpreadInput): SpreadResult {
  const spreadPrice = Math.max(0, input.ask - input.bid);
  const spreadPips = spreadPrice / getPipSize(input.pair);
  const units = lotsToUnits(input.lots, input.lotType, input.customUnits);
  const costQuote = spreadPrice * units;
  const conv = convertQuoteToAccount(costQuote, input.pair, input.accountCurrency, input.ask, input.manualQuoteToAccountRate);

  return {
    spreadPrice,
    spreadPips,
    units,
    costQuote,
    costAccount: conv.amount,
    conversionNote: conv.note,
  };
}

/* ---------------------------------------------------------------- */
/* Currency conversion (manual / illustrative rate — see pairs.ts)   */
/* ---------------------------------------------------------------- */

export function convertAmount(amount: number, rate: number): number {
  return amount * rate;
}
