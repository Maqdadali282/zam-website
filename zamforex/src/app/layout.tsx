import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { CookieConsentProvider } from "@/lib/cookieConsent";
import LogoDefs from "@/components/layout/LogoDefs";
import GridBackground from "@/components/layout/GridBackground";
import CookieConsentBanner from "@/components/layout/CookieConsentBanner";
import CustomCursor from "@/components/layout/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const favicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230f141c'/%3E%3Ctext x='50' y='67' text-anchor='middle' font-family='Arial Black,sans-serif' font-weight='700' font-size='46' letter-spacing='-4' fill='%2300e0a4'%3EZF%3C/text%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: "Zam Forex",
  description:
    "Zam Forex — learn forex trading from the basics to advanced strategy. Honest mentorship, live market data, and real frameworks, not signal-selling.",
  openGraph: {
    title: "Zam Forex — Trade Smarter. Grow Faster.",
    description:
      "Forex education from zero to execution. Clear lessons, live markets, honest mentorship.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
  icons: {
    icon: favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable}`}
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{if(localStorage.getItem("zf-theme")==="light"){document.documentElement.setAttribute("data-theme","light");}}catch(e){}})();`}
        </Script>
        <CookieConsentProvider>
          <ThemeProvider>
            <LogoDefs />
            <GridBackground />
            {children}
            <CookieConsentBanner />
            <CustomCursor />
          </ThemeProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
