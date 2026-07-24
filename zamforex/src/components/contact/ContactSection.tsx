"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/common/Reveal";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot — left blank by real visitors
};

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "", website: "" };

type SubmitStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; referenceId: string }
  | { kind: "error"; message: string; fieldErrors?: Partial<Record<keyof Omit<FormState, "website">, string>> };

const contactItems = [
  {
    label: "Address:",
    value: "JBR Escan Tower Marina Dubai",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Phone:",
    value: "+971 54 3855020",
    note: "For any inquiry, feel free to ask us.",
    href: "tel:+971543855020",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 5c0 8.3 6.7 15 15 15l2-3.5-5-2-1.5 1.5A11 11 0 0 1 8 9.5L9.5 8l-2-5L4 5Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Whatsapp:",
    value: "+1 (705) 910-7772",
    href: "https://wa.me/17059107772",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20l1.3-3.9A8 8 0 1 1 8.4 19L4 20Z" strokeLinejoin="round" />
        <path d="M8.5 9.5c.3 2.5 2.5 4.7 5 5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Email Address",
    value: "zamforex110@gmail.com",
    note: "Our support team is ready to assist you.",
    href: "mailto:zamforex110@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 6.5l9 6.5 9-6.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });

  const field = (key: keyof FormState) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatus({
          kind: "error",
          message: data.error || "Something went wrong. Please try again.",
          fieldErrors: data.errors,
        });
        return;
      }
      setStatus({ kind: "success", referenceId: data.referenceId });
      setForm(EMPTY_FORM);
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't reach the server. Please check your connection and try again.",
      });
    }
  }

  const fieldErrors = status.kind === "error" ? status.fieldErrors : undefined;

  return (
    <>
      <section id="contact">
        <Reveal className="section-head contact-head">
          <div className="eyebrow">Connect With Us</div>
          <h2>Get in Touch</h2>
          <p>
            Have questions about our mentorship, courses, or strategies?
            We&apos;re here to help. Reach out to us, and we&apos;ll get back
            to you as soon as possible.
          </p>
        </Reveal>
        <Reveal className="contact-wrap">
          <div className="contact-info">
            {contactItems.map((item) => (
              <div className="contact-item" key={item.label}>
                <div className="contact-icon">{item.icon}</div>
                <div>
                  <div className="line">
                    <b>{item.label}</b>
                    {item.href ? (
                      <a
                        className="value-link"
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="value">{item.value}</span>
                    )}
                  </div>
                  {item.note && <p className="note">{item.note}</p>}
                </div>
              </div>
            ))}
          </div>

          {status.kind === "success" ? (
            <div className="contact-success-panel glow-card">
              <h3>Message Sent Successfully</h3>
              <p>
                Thank you for contacting Zam Forex. We have successfully
                received your inquiry. A confirmation email has been sent to
                your inbox.
              </p>
              <div className="contact-success-ref">
                <span>Your Reference ID</span>
                <b>{status.referenceId}</b>
              </div>
              <p>
                Please save this Reference ID for future communication. Our
                support team will review your message and respond as soon as
                possible.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setStatus({ kind: "idle" })}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {status.kind === "error" && (
                <div className="contact-form-banner">{status.message}</div>
              )}

              {/* Honeypot — hidden from real visitors, bots tend to fill every field. */}
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                className="hp-field"
                aria-hidden="true"
                {...field("website")}
              />

              <input type="text" placeholder="Your name" required {...field("name")} />
              {fieldErrors?.name && <span className="contact-form-error">{fieldErrors.name}</span>}

              <input type="email" placeholder="Your email" required {...field("email")} />
              {fieldErrors?.email && <span className="contact-form-error">{fieldErrors.email}</span>}

              <input type="text" placeholder="Subject" required {...field("subject")} />
              {fieldErrors?.subject && <span className="contact-form-error">{fieldErrors.subject}</span>}

              <textarea placeholder="Your message" required {...field("message")} />
              {fieldErrors?.message && <span className="contact-form-error">{fieldErrors.message}</span>}

              <button
                className="btn btn-primary"
                type="submit"
                disabled={status.kind === "submitting"}
                style={{ alignSelf: "flex-start" }}
              >
                {status.kind === "submitting" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </Reveal>
      </section>

      <section id="location">
        <Reveal className="contact-map-wrap">
          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps?q=Escan+Tower+Jumeirah+Beach+Residence+Dubai+Marina&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zam Forex office location on Google Maps"
            />
          </div>
          <div className="address-card">
            <span className="tag">Address</span>
            <p>Jumeirah Beach Residence, Escan Tower, Marina, Dubai</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
