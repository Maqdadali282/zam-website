import type { CSSProperties, ReactNode } from "react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import IbCtaBand from "@/components/common/IbCtaBand";
import ToolBreadcrumb from "./ToolBreadcrumb";
import ToolsNav from "./ToolsNav";

export default function CalculatorLayout({
  toolName,
  description,
  accent,
  children,
}: {
  toolName: string;
  description: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteNav variant="tools" />
      <ToolBreadcrumb current={toolName} />

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: accent, "--eyebrow-accent": accent } as CSSProperties}>
          Trading Tool
        </div>
        <h1>{toolName}</h1>
        <p className="lead">{description}</p>
      </div>

      <div className="tools-subnav-wrap">
        <ToolsNav />
      </div>

      {children}

      <IbCtaBand
        heading="Turn This Calculation Into a Trade."
        body="Open a live account and put what you just calculated to work — real spreads, real execution, no guesswork."
        learnMoreHref="/tools"
        learnMoreLabel="Explore All Tools"
      />

      <SiteFooter variant="tools" />
    </>
  );
}
