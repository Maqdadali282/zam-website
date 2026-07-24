export type GlossaryCategory = "Basics" | "Technical Analysis" | "Fundamental Analysis" | "Risk & Psychology" | "Strategies";

export type GlossaryTerm = {
  term: string;
  category: GlossaryCategory;
  definition: string;
  example: string;
  related: string[];
};

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  "Basics",
  "Technical Analysis",
  "Fundamental Analysis",
  "Risk & Psychology",
  "Strategies",
];

export const GLOSSARY: GlossaryTerm[] = [
  { term: "Ask Price", category: "Basics", definition: "The price at which you can buy a currency pair.", example: "If EUR/USD shows 1.0850/1.0852, the ask is 1.0852.", related: ["Bid Price", "Spread"] },
  { term: "Base Currency", category: "Basics", definition: "The first currency listed in a pair — the one being bought or sold.", example: "In EUR/USD, EUR is the base currency.", related: ["Quote Currency", "Currency Pair"] },
  { term: "Bid Price", category: "Basics", definition: "The price at which you can sell a currency pair.", example: "If EUR/USD shows 1.0850/1.0852, the bid is 1.0850.", related: ["Ask Price", "Spread"] },
  { term: "Correlation", category: "Technical Analysis", definition: "How closely two markets move in relation to each other, from -1 (perfectly opposite) to +1 (perfectly together).", example: "EUR/USD and GBP/USD often move in the same direction — a positive correlation.", related: ["Volatility", "Trend"] },
  { term: "Currency Pair", category: "Basics", definition: "Two currencies quoted against each other, since forex is always a trade of one currency for another.", example: "EUR/USD, GBP/JPY, and USD/CAD are all currency pairs.", related: ["Base Currency", "Quote Currency"] },
  { term: "Drawdown", category: "Risk & Psychology", definition: "The decline from an account's peak balance to a subsequent low, usually shown as a percentage.", example: "An account that falls from $10,000 to $8,000 has a 20% drawdown.", related: ["Risk Per Trade", "Position Sizing"] },
  { term: "Exchange Rate", category: "Basics", definition: "How much of the quote currency it takes to buy one unit of the base currency.", example: "EUR/USD at 1.0850 means 1 euro costs 1.0850 US dollars.", related: ["Currency Pair", "Pip"] },
  { term: "FOMO", category: "Risk & Psychology", definition: "Fear of missing out — the anxiety-driven urge to enter a trade after a big move has already happened.", example: "Jumping into a rally after most of the move is already over.", related: ["Revenge Trading", "Discipline"] },
  { term: "Fundamental Analysis", category: "Fundamental Analysis", definition: "Studying economic data, central bank policy, and news events to judge a currency's underlying value.", example: "Watching a central bank rate decision to anticipate a currency's next move.", related: ["Technical Analysis", "Central Bank"] },
  { term: "Leverage", category: "Basics", definition: "Borrowed buying power from a broker that lets a trader control a larger position with a smaller deposit.", example: "100:1 leverage means $100 of margin can control a $10,000 position.", related: ["Margin", "Margin Call"] },
  { term: "Liquidity", category: "Technical Analysis", definition: "How easily an asset can be bought or sold without significantly moving its price — often marked by clusters of resting orders.", example: "Equal highs on a chart often mark resting stop-losses — a liquidity pool.", related: ["Support and Resistance", "Volatility"] },
  { term: "Long Position", category: "Basics", definition: "Buying an asset expecting its price to rise.", example: "Going long EUR/USD means buying euros, expecting them to strengthen against the dollar.", related: ["Short Position", "Buy & Sell"] },
  { term: "Lot", category: "Basics", definition: "A standardized trade size in forex. A standard lot is 100,000 units of the base currency.", example: "A mini lot (10,000 units) risks one-tenth as much per pip as a standard lot.", related: ["Position Sizing", "Pip Value"] },
  { term: "Margin", category: "Basics", definition: "The deposit a broker sets aside from your account to open and maintain a leveraged position.", example: "A $1,000 margin might be required to open a $100,000 position at 100:1 leverage.", related: ["Leverage", "Margin Call"] },
  { term: "Margin Call", category: "Basics", definition: "A broker warning (or automatic action) that occurs when losses eat too far into your available margin.", example: "A margin level dropping below 100% often triggers a margin call.", related: ["Margin", "Leverage Risk"] },
  { term: "Momentum", category: "Technical Analysis", definition: "The speed and strength of a price move — strong momentum shows large, decisive candles in one direction.", example: "A string of large green candles with small wicks signals strong bullish momentum.", related: ["Trend", "MACD"] },
  { term: "Overtrading", category: "Risk & Psychology", definition: "Taking far more trades, or far larger positions, than a trading plan actually calls for.", example: "Forcing a trade on a slow day purely out of boredom.", related: ["Trading Plan", "Discipline"] },
  { term: "Pip", category: "Basics", definition: "The smallest standard price move a currency pair makes — usually the fourth decimal place (second for JPY pairs).", example: "EUR/USD moving from 1.0850 to 1.0851 is a one-pip move.", related: ["Pipette", "Pip Value"] },
  { term: "Pip Value", category: "Basics", definition: "How much one pip of movement is worth in cash, based on position size and account currency.", example: "One pip on a standard lot of EUR/USD is worth about $10 for a USD account.", related: ["Pip", "Lot"] },
  { term: "Pipette", category: "Basics", definition: "One-tenth of a pip — the fifth decimal place on most pairs (third for JPY pairs), used for more precise pricing.", example: "1.08501 is one pipette above 1.08500.", related: ["Pip"] },
  { term: "Position Sizing", category: "Risk & Psychology", definition: "Calculating how large a trade to take based on account balance, risk percentage, and stop-loss distance.", example: "Risking 1% of a $10,000 account on a 30-pip stop gives a specific, calculable lot size.", related: ["Risk Per Trade", "Lot"] },
  { term: "Quote Currency", category: "Basics", definition: "The second currency listed in a pair — what the base currency's price is expressed in.", example: "In EUR/USD, USD is the quote currency.", related: ["Base Currency", "Exchange Rate"] },
  { term: "Range", category: "Technical Analysis", definition: "A period where price moves sideways between a fairly consistent floor and ceiling, with no clear trend.", example: "Price bouncing between 1.0800 support and 1.0850 resistance for several weeks.", related: ["Support and Resistance", "Range Trading"] },
  { term: "Risk-to-Reward Ratio", category: "Risk & Psychology", definition: "How much a trade targets compared to how much it risks, expressed as a ratio like 1:2.", example: "Risking 25 pips to target 50 pips is a 1:2 risk:reward ratio.", related: ["Stop Loss", "Take Profit"] },
  { term: "Scalping", category: "Strategies", definition: "A trading style taking many very short, small-target trades, often lasting seconds to minutes.", example: "Targeting 5 pips with a 5-pip stop, repeated many times through a session.", related: ["Day Trading", "Spread"] },
  { term: "Short Position", category: "Basics", definition: "Selling an asset expecting its price to fall, to buy it back later at a lower price.", example: "Going short GBP/USD means selling pounds, expecting them to weaken against the dollar.", related: ["Long Position", "Buy & Sell"] },
  { term: "Spread", category: "Basics", definition: "The gap between the bid and ask price — effectively the broker's built-in transaction cost.", example: "A bid of 1.0848 and ask of 1.0850 is a 2-pip spread.", related: ["Bid Price", "Ask Price"] },
  { term: "Stop Loss", category: "Risk & Psychology", definition: "A predefined price where a losing trade closes automatically, capping the loss at a known amount.", example: "Setting a stop loss just beyond a recent swing low to invalidate the trade if price breaks it.", related: ["Take Profit", "Risk Per Trade"] },
  { term: "Support and Resistance", category: "Technical Analysis", definition: "Price levels where a market has repeatedly reversed or paused — floors (support) and ceilings (resistance).", example: "Price bouncing off the same level three times marks it as meaningful support.", related: ["Range", "Breakout Trading"] },
  { term: "Swap", category: "Basics", definition: "The interest paid or earned for holding a position open overnight, based on the rate difference between the two currencies.", example: "Holding a long AUD/JPY position overnight may earn or cost swap depending on the rate differential.", related: ["Position Trading", "Leverage"] },
  { term: "Take Profit", category: "Risk & Psychology", definition: "A predefined price where a winning trade closes automatically, locking in the gain.", example: "Setting a take profit at a prior resistance level ahead of the current price.", related: ["Stop Loss", "Risk-to-Reward Ratio"] },
  { term: "Technical Analysis", category: "Technical Analysis", definition: "Studying price charts — structure, patterns, and indicators — to understand and anticipate market behavior.", example: "Using a moving average crossover to time an entry into an existing trend.", related: ["Fundamental Analysis", "Candlestick Patterns"] },
  { term: "Trading Journal", category: "Risk & Psychology", definition: "A written record of every trade — the setup, reasoning, and outcome — reviewed to find real patterns in your own trading.", example: "Noticing from a journal that most losing trades happen outside your primary trading session.", related: ["Trading Plan", "Discipline"] },
  { term: "Trading Plan", category: "Risk & Psychology", definition: "A written set of rules covering entries, exits, position sizing, and risk that a trader commits to following.", example: "A plan specifying a maximum of 1% risk per trade and a minimum 1:2 risk:reward before entry.", related: ["Trading Journal", "Discipline"] },
  { term: "Trend", category: "Technical Analysis", definition: "The general direction a market is moving — up (higher highs and higher lows), down, or sideways.", example: "A currency pair printing consistent higher highs and higher lows is in an uptrend.", related: ["Trend Following", "Support and Resistance"] },
  { term: "Volatility", category: "Technical Analysis", definition: "How large and fast price moves are over a given period — higher volatility means bigger, faster swings.", example: "A currency pair moving 200 pips in a day is more volatile than one moving 40 pips.", related: ["Correlation", "Momentum"] },
];
