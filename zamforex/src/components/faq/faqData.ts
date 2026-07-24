export type FaqCategory = "Getting Started" | "Trading & Risk" | "Tools & Markets" | "Accounts & Brokers" | "Website & Support";

export const FAQ_CATEGORIES: FaqCategory[] = [
  "Getting Started",
  "Trading & Risk",
  "Tools & Markets",
  "Accounts & Brokers",
  "Website & Support",
];

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "gs-1",
    category: "Getting Started",
    question: "What is Forex trading?",
    answer:
      "Forex trading is buying one currency while selling another, based on the view that the exchange rate between them will move in your favor. It's the largest financial market in the world, trading 24 hours a day across the Sydney, Tokyo, London, and New York sessions. ZamForex teaches the concepts — we don't place trades on your behalf.",
  },
  {
    id: "gs-2",
    category: "Getting Started",
    question: "What's the difference between a pip, a lot, and leverage?",
    answer:
      "A pip is the smallest standard price move a pair can make. A lot is a unit of trade size — a standard lot is 100,000 units, a mini lot 10,000, a micro lot 1,000. Leverage lets you control a larger position than your balance alone would allow, which magnifies both gains and losses. Our Tools section has calculators for all three.",
  },
  {
    id: "gs-3",
    category: "Getting Started",
    question: "Where should I start learning?",
    answer:
      "Start with the Beginner's Guide in our Forex Learning hub, then move through Technical Analysis and Fundamental Analysis at your own pace. Each academy builds on the last, and every lesson pairs plain-English explanations with live charts or examples.",
  },
  {
    id: "tr-1",
    category: "Trading & Risk",
    question: "How much should I risk per trade?",
    answer:
      "A widely used starting point is risking no more than 1–2% of your account on any single trade, sized as a percentage rather than a fixed amount so it scales with your account. This doesn't guarantee against losses — it just keeps a losing streak from doing irreversible damage. See our Risk Disclosure for the full warning.",
  },
  {
    id: "tr-2",
    category: "Trading & Risk",
    question: "Why does trading psychology matter so much?",
    answer:
      "A sound strategy still fails if a trader abandons it under stress — moving stop losses, oversizing after a loss, or exiting winners too early out of fear. Most beginner losses come from behavior, not analysis, which is why our Trading Psychology lesson names these traps explicitly.",
  },
  {
    id: "tr-3",
    category: "Trading & Risk",
    question: "Does ZamForex provide trading signals to copy?",
    answer:
      "No. ZamForex is an education platform, not a signal-selling service — we teach you how to read the market yourself. Any account you open through a broker link on this site is entirely your own, and every trading decision on it is yours alone.",
  },
  {
    id: "tm-1",
    category: "Tools & Markets",
    question: "Are the calculators in the Tools section free?",
    answer:
      "Yes — all eight calculators (Position Size, Pip Value, Margin, Lot Size, Profit, Risk:Reward, Currency Conversion, and Spread Cost) are free, require no account, and run entirely in your browser.",
  },
  {
    id: "tm-2",
    category: "Tools & Markets",
    question: "Is the data on the Economic Calendar and Heat Map live?",
    answer:
      "Yes — both are powered by TradingView's live widgets and update in real time during market hours. They only load after you consent to third-party cookies, since they're served directly from TradingView.",
  },
  {
    id: "tm-3",
    category: "Tools & Markets",
    question: "How does the Trading Sessions page know my local time?",
    answer:
      "It auto-detects your device's time zone by default. If that's not accurate for your situation, you can manually pick your country from the dropdown, and every time shown recalculates to match.",
  },
  {
    id: "ac-1",
    category: "Accounts & Brokers",
    question: "Is ZamForex a broker?",
    answer:
      "No. ZamForex doesn't hold client funds, execute trades, or act as a broker. When you click 'Open a Live Account', you're taken to one of our partner brokers — currently Aurum Markets or CorePrime Markets — to open and fund an account directly with them.",
  },
  {
    id: "ac-2",
    category: "Accounts & Brokers",
    question: "How does ZamForex make money?",
    answer:
      "We participate in Introducing Broker (IB) partnerships with our broker partners, and may receive a referral commission when you open and trade on an account through our links — at no additional cost to you. We disclose this because transparency matters to us.",
  },
  {
    id: "ac-3",
    category: "Accounts & Brokers",
    question: "Can I lose money by opening an account through ZamForex's links?",
    answer:
      "Yes — trading carries a real risk of loss regardless of which broker you use or how you found them. Opening an account through our link doesn't change that risk. Please read our full Risk Disclosure before funding any live account.",
  },
  {
    id: "ws-1",
    category: "Website & Support",
    question: "Does ZamForex use cookies or track my activity?",
    answer:
      "We keep this simple: no ad trackers, no analytics currently running. The only things involved are an essential cookie that remembers your consent choice, an optional one for your theme preference, and TradingView's own cookies once you consent to third-party widgets. See our Cookie Policy for full details.",
  },
  {
    id: "ws-2",
    category: "Website & Support",
    question: "How do I change my cookie preferences?",
    answer:
      "Click 'Cookie Preferences' in the footer of any page to reopen the consent panel and change your choice at any time.",
  },
  {
    id: "ws-3",
    category: "Website & Support",
    question: "How do I get in touch or report a problem?",
    answer:
      "Reach us through our Contact page or by emailing zamforex110@gmail.com — we review every message and correct verified errors as quickly as we can.",
  },
];
