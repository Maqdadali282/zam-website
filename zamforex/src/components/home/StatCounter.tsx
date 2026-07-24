"use client";

import { useEffect, useRef, useState } from "react";

export default function StatCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^([\d,]+)(\+?)$/);
    if (!el || !match) return;

    const target = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2];
    const duration = 1400;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const start = performance.now();
          function step(now: number) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(target * eased).toLocaleString("en-US") + suffix);
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span className={className} ref={ref}>
      {display}
    </span>
  );
}
