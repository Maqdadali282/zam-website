import type { ConceptEntry } from "@/components/technical-analysis/ConceptAccordion";

const CB = "var(--cat-1)";
const POLICY = "var(--cyan)";

export const centralBankConcepts: ConceptEntry[] = [
  {
    id: "central-bank-decisions",
    term: "Central Bank Decisions",
    def: "Scheduled meetings where a central bank announces its benchmark interest rate and explains the reasoning behind it.",
    accent: CB,
    how: "These decisions are pre-scheduled (e.g. the Fed's FOMC meets 8 times a year), which is why they're the single most-watched events on any forex trader's calendar.",
    bullish: "A central bank hikes rates when the market only expected a hold — the currency often jumps immediately.",
    bearish: "A central bank cuts rates when the market only expected a hold — the currency often drops immediately.",
    mistake: "Watching only the rate number and ignoring the accompanying statement — the statement often moves price more than the rate itself.",
    tip: "It's not the decision that matters most, it's whether the decision matched what the market had already priced in.",
  },
  {
    id: "monetary-policy",
    term: "Monetary Policy",
    def: "The tools a central bank uses to manage its economy — primarily interest rates, plus bond-buying or bond-selling programs.",
    accent: CB,
    how: "By making borrowing cheaper or more expensive, a central bank can speed up or slow down economic activity, which in turn shapes inflation and employment.",
    bullish: "Tightening monetary policy (raising rates) is generally supportive of a currency's value.",
    bearish: "Loosening monetary policy (cutting rates) is generally a drag on a currency's value.",
    mistake: "Assuming monetary policy works instantly — most policy changes take months to fully filter through the real economy.",
    tip: "Compare monetary policy across two countries, not in isolation — currency pairs move on relative policy, not absolute policy.",
  },
  {
    id: "forward-guidance",
    term: "Forward Guidance",
    def: "A central bank's public communication about where policy is likely headed next, even before any decision is made.",
    accent: POLICY,
    how: "Central banks use carefully chosen language in speeches and statements to prepare markets for future moves, reducing the shock of the eventual decision.",
    bullish: "A central bank signals more hikes are coming ('further tightening may be appropriate') — the currency often rallies on the guidance alone.",
    bearish: "A central bank signals cuts are coming ('policy may need to ease') — the currency often weakens on the guidance alone.",
    mistake: "Waiting for the actual rate decision to react, while the real move already happened on the forward guidance weeks earlier.",
    tip: "Read the press conference, not just the statement — reporters' questions often force clearer forward guidance than the prepared text.",
  },
];

export const policyStanceConcepts: ConceptEntry[] = [
  {
    id: "hawkish",
    term: "Hawkish",
    def: "A central bank leaning toward higher interest rates, usually to fight inflation, even at the cost of slower growth.",
    accent: "var(--mint)",
    how: "A hawkish central bank prioritizes price stability. It raises rates (or signals it will) to cool an overheating, inflation-prone economy.",
    bullish: "A hawkish surprise — a bigger hike than expected, or hawkish language — tends to strengthen the currency as yield-seeking capital moves in.",
    bearish: "Being 'less hawkish than expected' can still weaken a currency, even if rates are still being raised — it's about direction of surprise.",
    mistake: "Assuming 'hawkish' always means an immediate rate hike — it can just mean hawkish language with no action yet.",
    tip: "Hawkish tone without a rate hike can move a currency almost as much as the hike itself — markets trade expectations, not just actions.",
  },
  {
    id: "dovish",
    term: "Dovish",
    def: "A central bank leaning toward lower interest rates, usually to support growth and employment, even if inflation runs a bit hot.",
    accent: "var(--red)",
    how: "A dovish central bank prioritizes growth. It cuts rates (or signals it will) to make borrowing cheaper and stimulate a slowing economy.",
    bullish: "Being 'less dovish than expected' can still strengthen a currency, even if rates are being cut — again, it's about the surprise direction.",
    bearish: "A dovish surprise — a bigger cut than expected, or dovish language — tends to weaken the currency as yield-seeking capital exits.",
    mistake: "Treating hawkish/dovish as a permanent label for a central bank — the same bank can flip stance as the data changes.",
    tip: "Track the shift in stance over time, not just the current label — a bank turning 'less dovish' is often more tradeable than a bank staying dovish.",
  },
  {
    id: "quantitative-easing",
    term: "Quantitative Easing (QE)",
    def: "A central bank creating new money to buy government bonds (and sometimes other assets), injecting liquidity directly into the financial system.",
    accent: POLICY,
    how: "QE is used when interest rates are already near zero and can't be cut further — it's an alternative way to keep borrowing costs low and support the economy.",
    bullish: "The end (or 'tapering') of a QE program is often read as a step toward tighter policy, which can support the currency.",
    bearish: "Announcing or expanding QE increases the money supply, which tends to weaken the currency over time.",
    mistake: "Expecting QE to weaken a currency instantly — the effect is usually gradual and can be outweighed by other news in the short term.",
    tip: "'Tapering' (slowing QE purchases) is itself a policy signal worth watching — it often moves markets before the first actual rate hike.",
  },
  {
    id: "quantitative-tightening",
    term: "Quantitative Tightening (QT)",
    def: "The reverse of QE — a central bank shrinking its balance sheet by letting bonds mature without replacing them, or actively selling them.",
    accent: POLICY,
    how: "QT removes liquidity from the financial system, working alongside (or instead of) rate hikes to tighten overall financial conditions.",
    bullish: "Announcing or accelerating QT is generally viewed as a tightening move, which can be supportive for the currency.",
    bearish: "Pausing or slowing QT is generally viewed as a step back from tightening, which can weigh on the currency.",
    mistake: "Ignoring QT because it moves slower and gets less headline attention than rate decisions — it still shapes the same yield backdrop.",
    tip: "QE and QT are best understood as the 'background' policy setting, with rate decisions as the 'headline' setting — both point the same direction in a coherent policy stance.",
  },
];
