import Reveal from "@/components/common/Reveal";
import { AURUM_SIGNUP_URL, COREPRIME_SIGNUP_URL } from "@/lib/affiliateLinks";

export default function Promos() {
  return (
    <section id="promos">
      <Reveal className="promo-grid">
        <div className="promo-card glow-card">
          <div className="promo-text">
            <span className="promo-badge">Broker Partner</span>
            <h3>Core Prime Markets</h3>
            <div className="promo-notice">Important Notice</div>
            <p className="desc">
              Join us and earn $5 per lot from your own account — no extra
              deposit needed, just trade the way you already do.
            </p>
            <a
              className="btn btn-primary"
              href={COREPRIME_SIGNUP_URL}
              target="_blank"
              rel="noopener"
            >
              Register Now
            </a>
          </div>
          <div className="promo-visual">
            <div className="promo-photo-wrap">
              <div className="promo-photo">
                <img
                  src="/assets/360_F_328493598_yMp446SUpiIGYQQKydLKVo8aoFA7DPJ2.jpg"
                  alt="Excited trader pointing toward the Core Prime Markets $5 per lot offer"
                  loading="lazy"
                />
              </div>
              <span className="promo-photo-badge">
                $5 <small>/ lot</small>
              </span>
            </div>
          </div>
        </div>

        <div className="promo-card glow-card reverse">
          <div className="promo-visual">
            <div className="promo-photo-wrap flip">
              <div className="promo-photo">
                <img
                  src="/assets/360_F_295451981_AKNKM9DdLl4BQ69K048aSGGjXqJ2QWeR.jpg"
                  alt="Excited trader pointing toward the Aurum Markets $20 bonus offer"
                  loading="lazy"
                />
              </div>
              <span className="promo-photo-badge gold">
                $20 <small>Bonus</small>
              </span>
            </div>
          </div>
          <div className="promo-text">
            <span className="promo-badge">Broker Partner</span>
            <h3>Aurum Markets</h3>
            <div className="promo-notice">Important Notice</div>
            <p className="desc">
              Register yourself and get a $20 bonus, free — zero spread, no
              swap fees, and a fast, reliable platform built for serious
              traders.
            </p>
            <a
              className="btn btn-primary"
              href={AURUM_SIGNUP_URL}
              target="_blank"
              rel="noopener"
            >
              Register Now
            </a>
            <ul className="promo-features">
              <li>No Swap Fees</li>
              <li>Zero Spread Trading</li>
              <li>Fast &amp; Smooth Deposit/Withdraw Process</li>
              <li>Reliable, user-friendly platform</li>
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
