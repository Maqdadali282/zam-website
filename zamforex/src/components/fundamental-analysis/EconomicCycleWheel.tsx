"use client";

import { useEffect, useState } from "react";

const stages = [
  { title: "Recovery", desc: "Growth turns positive again after a downturn; rates are typically still low." },
  { title: "Expansion", desc: "Output, employment and income all rise; central banks watch for overheating." },
  { title: "Peak", desc: "Growth tops out; inflation is often at its highest, rates often at their highest." },
  { title: "Recession", desc: "Activity contracts; central banks typically cut rates to stimulate growth again." },
];

export default function EconomicCycleWheel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % stages.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cycle-row">
      {stages.map((s, i) => (
        <button
          type="button"
          key={s.title}
          className={`cycle-stage${active === i ? " active" : ""}`}
          onClick={() => setActive(i)}
        >
          <span className="cs-num">{String(i + 1).padStart(2, "0")}</span>
          <h4>{s.title}</h4>
          <p>{s.desc}</p>
        </button>
      ))}
    </div>
  );
}
