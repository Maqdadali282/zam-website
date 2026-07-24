import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/common/Reveal";
import { AURUM_SIGNUP_URL, COREPRIME_SIGNUP_URL } from "@/lib/affiliateLinks";

type Broker = "aurum" | "coreprime";

const BROKER_URL: Record<Broker, string> = {
  aurum: AURUM_SIGNUP_URL,
  coreprime: COREPRIME_SIGNUP_URL,
};

export default function IbCtaBand({
  heading,
  body,
  broker = "aurum",
  primaryLabel = "🚀 Open a Live Account",
  learnMoreHref,
  learnMoreLabel = "Learn More",
  style,
}: {
  heading: ReactNode;
  body: ReactNode;
  broker?: Broker;
  primaryLabel?: string;
  learnMoreHref?: string;
  learnMoreLabel?: string;
  style?: CSSProperties;
}) {
  return (
    <Reveal className="cta-band" style={{ marginTop: "20px", ...style }}>
      <h2>{heading}</h2>
      <p style={{ marginBottom: 0 }}>{body}</p>
      <div className="hero-ctas" style={{ justifyContent: "center", marginTop: "24px" }}>
        <a className="btn btn-primary" href={BROKER_URL[broker]} target="_blank" rel="noopener">
          {primaryLabel}
        </a>
        {learnMoreHref && (
          <Link className="btn btn-ghost" href={learnMoreHref}>
            {learnMoreLabel}
          </Link>
        )}
      </div>
    </Reveal>
  );
}
