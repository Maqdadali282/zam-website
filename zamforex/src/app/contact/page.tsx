import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Zam Forex",
  description:
    "Get in touch with Zam Forex — questions about mentorship, courses, or strategies. Reach us by phone, WhatsApp, email, or visit our Dubai Marina office.",
};

export default function ContactPage() {
  return (
    <>
      <SiteNav variant="contact" />
      <ContactSection />
      <SiteFooter variant="contact" />
    </>
  );
}
