import type { ConceptEntry } from "@/components/technical-analysis/ConceptAccordion";

const EXPECT = "var(--cyan)";
const RISK_ON = "var(--mint)";
const RISK_OFF = "var(--red)";

export const expectationsConcepts: ConceptEntry[] = [
  {
    id: "market-expectations",
    term: "Market Expectations",
    def: "The collective forecast of every trader, economist, and institution about what a data release or policy decision will show, before it happens.",
    accent: EXPECT,
    how: "Prices move ahead of the actual event as traders position for the expected outcome — by the time the release happens, the currency is already reflecting that consensus view.",
    bullish: "Expectations shift more bullish over the days leading up to a release — the currency can drift higher well before anything is confirmed.",
    bearish: "Expectations shift more bearish over the days leading up to a release — the currency can drift lower well before anything is confirmed.",
    mistake: "Assuming price only reacts to actual news — a huge share of forex movement happens on the shift in expectations, not the event itself.",
    tip: "Compare the data to what's expected, not to what happened last time — that's the number the market has actually positioned around.",
  },
  {
    id: "priced-in-news",
    term: "Priced-In News",
    def: "Information the market has already fully absorbed and positioned for — so when it's officially confirmed, the reaction is small or nonexistent.",
    accent: EXPECT,
    how: "Once enough traders share the same expectation and have already positioned for it, that expectation is reflected in the current price — confirming it changes nothing new.",
    bullish: "A widely 'priced-in' hike happens exactly as expected — the currency may barely react, or even dip slightly as positions get closed ('buy the rumor, sell the fact').",
    bearish: "Same logic in reverse for a widely priced-in cut — little to no reaction, or a small bounce as short positions are closed out.",
    mistake: "Buying a currency right before a widely-expected positive announcement, expecting a big pop that never comes because it was already priced in.",
    tip: "Ask 'is this already expected?' before trading any headline — the surprise is what moves price, not the headline alone.",
  },
  {
    id: "repricing",
    term: "Repricing",
    def: "The fast adjustment in currency, bond, and rate-expectation prices that happens the moment new information changes what the market believes will happen next.",
    accent: EXPECT,
    how: "New data forces traders to update their models in real time — futures markets, bond yields, and spot forex all reprice within seconds to reflect the new expected path.",
    bullish: "A hawkish surprise triggers a rapid repricing of the expected rate path higher — currency demand increases as that new, higher path gets priced in.",
    bearish: "A dovish surprise triggers a rapid repricing of the expected rate path lower — currency demand decreases as that new, lower path gets priced in.",
    mistake: "Trying to fade a sharp repricing move immediately, assuming it will 'snap back' — a genuine repricing based on real new information often sticks.",
    tip: "Watch interest rate futures (not just spot forex) for the cleanest, fastest read on how the market is repricing rate expectations.",
  },
];

export const riskConcepts: ConceptEntry[] = [
  {
    id: "risk-on",
    term: "Risk-On",
    def: "A market mood where investors actively seek out higher-yielding, riskier assets, expecting the economic backdrop to stay supportive.",
    accent: RISK_ON,
    how: "When confidence is high, capital rotates out of ultra-safe assets and into stocks, commodities, and higher-yielding currencies chasing better returns.",
    bullish: "Commodity-linked currencies like AUD, NZD and CAD tend to strengthen in a risk-on environment as global growth optimism lifts demand for their exports.",
    bearish: "Traditional safe havens like USD, JPY and CHF can underperform during strong risk-on periods, as capital moves toward riskier opportunities instead.",
    mistake: "Assuming risk-on is always bullish for every currency — it typically favors commodity and growth-sensitive currencies specifically, not the dollar.",
    tip: "Watch equity indices and commodity prices alongside forex — a strong risk-on rally in stocks often confirms the same mood shift shows up in AUD, NZD and CAD.",
  },
  {
    id: "risk-off",
    term: "Risk-Off",
    def: "A market mood where investors flee riskier assets in favor of safety, usually triggered by fear, uncertainty, or a shock event.",
    accent: RISK_OFF,
    how: "When confidence drops, capital rushes out of stocks and higher-yielding assets and into instruments perceived as safe — even if those don't pay the highest return.",
    bullish: "Safe-haven currencies like USD, JPY and CHF tend to strengthen in a risk-off environment as capital seeks stability over yield.",
    bearish: "Commodity and growth-sensitive currencies like AUD, NZD and CAD tend to weaken in a risk-off environment as global growth fears build.",
    mistake: "Confusing risk-off with 'the dollar is fundamentally strong' — the move is about safety-seeking flows, not necessarily anything specific to the US economy.",
    tip: "Sudden, sharp risk-off moves are often triggered by a specific shock (a geopolitical event, a policy surprise) — check the news, not just the chart.",
  },
];
