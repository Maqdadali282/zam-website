import Reveal from "@/components/common/Reveal";
import { AURUM_SIGNUP_URL } from "@/lib/affiliateLinks";

const WHATSAPP_URL =
  "https://chat.whatsapp.com/FgXc5L2unIiHiEN5koSfRR?mode=ems_wa_t";

export default function BasicsCtaBand() {
  return (
    <Reveal className="cta-band">
      <h2>You know the basics — now put them into practice.</h2>
      <p>
        Open a broker account, join the community, and start applying what
        you just learned.
      </p>
      <div className="hero-ctas">
        <a
          className="btn btn-primary"
          href={AURUM_SIGNUP_URL}
          target="_blank"
          rel="noopener"
        >
          🚀 Start Trading Now
        </a>
        <a
          className="btn btn-ghost"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
        >
          💬 Join Our Community
        </a>
      </div>
    </Reveal>
  );
}
