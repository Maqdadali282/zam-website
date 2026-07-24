import Reveal from "@/components/common/Reveal";
import { AURUM_SIGNUP_URL as AURUM_LINK, COREPRIME_SIGNUP_URL as COREPRIME_LINK } from "@/lib/affiliateLinks";

const BINANCE_LINK =
  "https://www.binance.com/referral/earn-together/refer-in-hotsummer/claim?hl=en&ref=GRO_20338_291MI&utm_source=default";

type Account = {
  name: string;
  spread: string;
  deposit: string;
  leverage: string;
  href: string;
};

const accounts: Account[] = [
  { name: "Aurum Markets", spread: "1.0", deposit: "$10", leverage: "1:500", href: AURUM_LINK },
  { name: "Standard Account", spread: "0.8", deposit: "$10", leverage: "1:1000", href: COREPRIME_LINK },
  { name: "Premium Account", spread: "1.0", deposit: "$10", leverage: "1:500", href: AURUM_LINK },
  { name: "Special Account Low Spread", spread: "1.0", deposit: "$15", leverage: "1:500", href: COREPRIME_LINK },
  { name: "37 Crypto, 200+ Pairs, Swap Free", spread: "0.8", deposit: "$10", leverage: "1:1000", href: BINANCE_LINK },
  { name: "Best Forex Trading Account", spread: "1.0", deposit: "$10", leverage: "1:1000", href: AURUM_LINK },
  { name: "Best Spot Trading", spread: "0.9", deposit: "$10", leverage: "1:1000", href: COREPRIME_LINK },
  { name: "Lowest Spread Best Account For Scalping", spread: "0.9", deposit: "$50", leverage: "1:1000", href: AURUM_LINK },
  { name: "USA, UK and Europe Stock Best Broker", spread: "0.8", deposit: "$10", leverage: "1:1000", href: COREPRIME_LINK },
  { name: "Best Crypto Trading Broker", spread: "0.0", deposit: "$15", leverage: "1:500", href: BINANCE_LINK },
  { name: "Basic Cent Account", spread: "0.0", deposit: "$10", leverage: "1:500", href: AURUM_LINK },
  { name: "Minimum Spread Account", spread: "1.0", deposit: "$10", leverage: "1:500", href: AURUM_LINK },
  { name: "Special Cent Account", spread: "1.0", deposit: "$5", leverage: "1:500", href: AURUM_LINK },
  { name: "Cent Account", spread: "1.0", deposit: "$5", leverage: "1:500", href: AURUM_LINK },
];

export default function AccountsTable() {
  return (
    <>
      <Reveal className="section-head">
        <div className="eyebrow">Account Types</div>
        <h2>Find the account that fits your style</h2>
        <p>
          Compare spreads, minimum deposit, and leverage across our partner
          brokers before you open an account.
        </p>
      </Reveal>

      <Reveal className="accounts-table-wrap">
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Minimum Spread</th>
              <th>Minimum Deposit &amp; Withdraw</th>
              <th>Leverage</th>
              <th>Open Account</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.name}>
                <td>{acc.name}</td>
                <td>{acc.spread}</td>
                <td>{acc.deposit}</td>
                <td>{acc.leverage}</td>
                <td>
                  <a href={acc.href} target="_blank" rel="noopener">
                    Click Here
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </>
  );
}
