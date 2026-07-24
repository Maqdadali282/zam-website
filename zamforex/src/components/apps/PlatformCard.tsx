import Reveal from "@/components/common/Reveal";

interface PlatformCardProps {
  name: string;
  tagline: string;
  icon: React.ReactNode;
  windowsHref: string;
  androidHref: string;
  iphoneHref: string;
}

export default function PlatformCard({
  name,
  tagline,
  icon,
  windowsHref,
  androidHref,
  iphoneHref,
}: PlatformCardProps) {
  return (
    <Reveal className="platform-card glow-card">
      <div className="platform-icon">{icon}</div>
      <h3>{name}</h3>
      <p className="tagline">{tagline}</p>
      <div className="platform-buttons">
        <a
          className="btn btn-primary"
          href={windowsHref}
          target="_blank"
          rel="noopener"
        >
          🪟 Download {name} (Windows)
        </a>
        <a
          className="btn btn-ghost"
          href={androidHref}
          target="_blank"
          rel="noopener"
        >
          🤖 Download {name} (Android)
        </a>
        <a
          className="btn btn-ghost"
          href={iphoneHref}
          target="_blank"
          rel="noopener"
        >
          🍎 Download {name} (iPhone)
        </a>
      </div>
    </Reveal>
  );
}
