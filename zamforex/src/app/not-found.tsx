import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Page Not Found | Zam Forex",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <>
      <SiteNav />

      <section className="not-found-section">
        <div className="not-found-code">404</div>
        <h1>This page doesn&apos;t exist</h1>
        <p>
          The link may be broken, or the page may have moved. Try heading
          back to the homepage, or jump into one of our learning hubs below.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/forex-learning" className="btn btn-ghost">
            Forex Learning Hub
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
