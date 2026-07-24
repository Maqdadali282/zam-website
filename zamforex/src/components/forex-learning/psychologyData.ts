import type { PsychologyTrap } from "./PsychologyTrapCard";

export const psychologyTraps: PsychologyTrap[] = [
  {
    id: "fear",
    term: "Fear",
    def: "The instinct to protect capital that, taken too far, causes traders to exit good trades early or avoid valid setups entirely.",
    accent: "var(--red)",
    problem: "A losing trade (or even a string of them) makes the next valid setup feel dangerous, even when nothing about the strategy has actually changed.",
    effect: "Traders close winning trades far too early to \"lock something in,\" or skip a textbook setup entirely because the last one didn't work out.",
    healthier: "Judge decisions by whether they followed the plan, not by the outcome of any single trade — a good process still loses sometimes.",
  },
  {
    id: "greed",
    term: "Greed",
    def: "The urge to squeeze more out of a winning trade or account than the original plan called for.",
    accent: "var(--gold)",
    problem: "A trade moving nicely into profit tempts a trader to move the take profit further away, or add to the position outside the original plan.",
    effect: "Winning trades turn into losers (or smaller wins) because the exit kept getting pushed back past where the plan said to take profit.",
    healthier: "Decide your target before entering, and treat hitting it as a success — not a starting point for negotiating with the market.",
  },
  {
    id: "fomo",
    term: "FOMO (Fear of Missing Out)",
    def: "The anxiety of watching a big move happen without you, pushing you to jump in late, without a real setup.",
    accent: "var(--cat-2)",
    problem: "A currency pair makes a large, fast move on the chart, and the fear of missing the rest of it overrides the checklist for a valid entry.",
    effect: "Traders chase price after most of the move has already happened, entering with poor risk:reward right as the move is running out of steam.",
    healthier: "Accept that missed moves are a normal part of trading — there is always another setup, and chasing one rarely ends well.",
  },
  {
    id: "revenge-trading",
    term: "Revenge Trading",
    def: "Trying to immediately win back a loss with another trade, usually bigger and less planned than the one before it.",
    accent: "var(--red)",
    problem: "A loss feels personal, and the instinct is to 'get it back' from the market right away instead of stepping back.",
    effect: "The follow-up trade is often oversized, taken outside the strategy, and entered purely on emotion — turning one loss into two or three.",
    healthier: "Build a rule that a loss (or a losing streak) triggers a pause, not an immediate re-entry — the market will still be there in an hour.",
  },
  {
    id: "overconfidence",
    term: "Overconfidence",
    def: "A run of wins creating the belief that the strategy — or the trader — can't lose right now.",
    accent: "var(--cat-4)",
    problem: "Several winning trades in a row feel like proof of skill, which quietly erodes the discipline that produced those wins in the first place.",
    effect: "Position sizes creep up, the checklist gets skipped 'just this once,' and risk management loosens right before a losing streak arrives.",
    healthier: "Keep risk per trade identical whether you're on a winning streak or a losing one — consistency is what a strategy is actually being tested on.",
  },
  {
    id: "confirmation-bias",
    term: "Confirmation Bias",
    def: "The tendency to notice information that supports a trade you already want to take, while ignoring signs against it.",
    accent: "var(--cat-1)",
    problem: "Once a trader forms an opinion on a pair, they start unconsciously filtering the chart and the news for reasons they're right.",
    effect: "Warning signs against the trade get dismissed or rationalized away, and the position gets held (or added to) well past where the plan says to exit.",
    healthier: "Actively look for the strongest argument against your own trade idea before entering — if you can't find one, you haven't looked hard enough.",
  },
  {
    id: "loss-aversion",
    term: "Loss Aversion",
    def: "The tendency to feel the pain of a loss more intensely than the pleasure of an equivalent gain — which distorts decisions around exits.",
    accent: "var(--cat-8)",
    problem: "A losing trade feels much worse than a winning trade of the same size feels good, which makes closing a loser emotionally harder than it should be.",
    effect: "Traders widen or remove stop losses to avoid 'making the loss real,' turning a small planned loss into a much larger unplanned one.",
    healthier: "Treat the stop loss as non-negotiable the moment the trade is placed — it was set with a clear head, before any emotion was involved.",
  },
];

export const psychologyHabits = [
  {
    title: "Discipline",
    desc: "Following your own trading plan and rules even when a shortcut looks tempting in the moment.",
    example: "Taking the stop loss exactly where the plan said to, not where it 'feels' better to.",
  },
  {
    title: "Patience",
    desc: "Waiting for a setup that actually matches your criteria instead of forcing a trade because you feel like trading.",
    example: "Sitting on your hands through a slow session rather than trading a marginal setup out of boredom.",
  },
  {
    title: "Trading Routine",
    desc: "A consistent process you run before, during, and after every session — so decisions rely on habit, not willpower.",
    example: "Checking the economic calendar and your existing positions at the same time every day before the session starts.",
  },
  {
    title: "Trading Journal",
    desc: "A written record of every trade — the setup, the reasoning, and the outcome — reviewed regularly to find real patterns.",
    example: "Noticing from three months of journal entries that most losses come from trades taken outside your primary session.",
  },
];
