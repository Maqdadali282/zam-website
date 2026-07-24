import Link from "next/link";
import Reveal from "@/components/common/Reveal";
import { AURUM_SIGNUP_URL } from "@/lib/affiliateLinks";

export default function CtaBand() {
  return (
    <Reveal className="cta-band">
      <h2>
        Trading isn&apos;t about luck.
        <br />
        It&apos;s about strategy and self-control.
      </h2>
      <p>
        Join thousands of traders learning the discipline behind consistent
        results.
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
        <Link className="btn btn-ghost" href="/contact">
          Get In Touch
        </Link>
      </div>
    </Reveal>
  );
}
