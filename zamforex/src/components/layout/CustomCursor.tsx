"use client";

import { useEffect, useRef, useState } from "react";

// Anything that should trigger the cursor's "hover" state. Real semantic
// tags cover almost everything in this codebase (buttons/links are used
// throughout rather than clickable divs); .glow-card is the one shared
// class every card component in the site already uses, and
// [data-cursor-hover] is an escape hatch for any one-off element that's
// interactive but isn't naturally one of the above.
const HOVER_SELECTOR =
  'a, button, input, select, textarea, label, [role="button"], [tabindex]:not([tabindex="-1"]), .glow-card, [data-cursor-hover]';

// Higher = snappier follow, lower = more delayed/floaty. This is what
// gives the inner ring its quick "tracking" feel and the outer ring its
// slower, trailing feel. Each has a floor it eases down toward as the
// cursor moves faster, so a quick flick trails visibly more than a slow,
// deliberate movement does — not just a fixed-speed delay.
const INNER_EASE = 0.16;
const INNER_EASE_MIN = 0.07;
const OUTER_EASE = 0.14;
const OUTER_EASE_MIN = 0.065;
const SPEED_SOFTENING = 0.0016; // how strongly distance-to-target reduces the ease factor

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const innerPosRef = useRef<HTMLDivElement>(null);
  const outerPosRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);

  // Decide whether the effect should run at all: a precise pointer
  // (mouse/trackpad), not a touch-only device, and no reduced-motion
  // preference. Re-checked live so DevTools device emulation / a
  // hybrid device switching input types is handled correctly.
  useEffect(() => {
    const pointerMql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");

    function evaluate() {
      setEnabled(pointerMql.matches && !motionMql.matches);
    }

    evaluate();
    pointerMql.addEventListener("change", evaluate);
    motionMql.addEventListener("change", evaluate);
    return () => {
      pointerMql.removeEventListener("change", evaluate);
      motionMql.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const innerPos = innerPosRef.current;
    const outerPos = outerPosRef.current;
    const innerRing = innerRingRef.current;
    const outerRing = outerRingRef.current;
    if (!innerPos || !outerPos || !innerRing || !outerRing) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const inner = { x: mouse.x, y: mouse.y };
    const outer = { x: mouse.x, y: mouse.y };
    let revealed = false;
    let hovering = false;
    let rafId = 0;

    function setPosition(e: MouseEvent | PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!revealed) {
        revealed = true;
        innerRing!.style.opacity = "1";
        outerRing!.style.opacity = "1";
      }
    }

    function handleOver(e: MouseEvent) {
      const target = e.target as Element | null;
      if (target?.closest(HOVER_SELECTOR)) {
        hovering = true;
        innerRing!.classList.add("cursor-ring--hover");
        outerRing!.classList.add("cursor-ring--hover");
      }
    }

    function handleOut(e: MouseEvent) {
      const target = e.target as Element | null;
      if (!target?.closest(HOVER_SELECTOR)) return;
      const related = e.relatedTarget as Element | null;
      if (related?.closest(HOVER_SELECTOR)) return; // moving between nested hoverable children
      hovering = false;
      innerRing!.classList.remove("cursor-ring--hover");
      outerRing!.classList.remove("cursor-ring--hover");
    }

    function handleDown() {
      innerRing!.classList.add("cursor-ring--active");
      outerRing!.classList.add("cursor-ring--active");
    }

    function handleUp() {
      innerRing!.classList.remove("cursor-ring--active");
      outerRing!.classList.remove("cursor-ring--active");
    }

    function handleLeaveWindow() {
      innerRing!.style.opacity = "0";
      outerRing!.style.opacity = "0";
      revealed = false;
    }

    function tick() {
      // Lerp toward the target, but soften the ease factor the further
      // behind the ring currently is — a slow, deliberate move tracks
      // tightly; a fast flick opens a bigger gap and eases down toward
      // the "_MIN" floor, so it visibly takes a bit longer to catch up
      // instead of teleporting after every frame.
      const innerDx = mouse.x - inner.x;
      const innerDy = mouse.y - inner.y;
      const innerDist = Math.hypot(innerDx, innerDy);
      const innerEase = clamp(INNER_EASE - innerDist * SPEED_SOFTENING, INNER_EASE_MIN, INNER_EASE);
      inner.x += innerDx * innerEase;
      inner.y += innerDy * innerEase;

      const outerDx = mouse.x - outer.x;
      const outerDy = mouse.y - outer.y;
      const outerDist = Math.hypot(outerDx, outerDy);
      const outerEase = clamp(OUTER_EASE - outerDist * SPEED_SOFTENING, OUTER_EASE_MIN, OUTER_EASE);
      outer.x += outerDx * outerEase;
      outer.y += outerDy * outerEase;

      innerPos!.style.transform = `translate3d(${inner.x}px, ${inner.y}px, 0)`;
      outerPos!.style.transform = `translate3d(${outer.x}px, ${outer.y}px, 0)`;

      rafId = requestAnimationFrame(tick);
    }

    document.addEventListener("mousemove", setPosition, { passive: true });
    document.addEventListener("pointermove", setPosition, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });
    document.addEventListener("mousedown", handleDown, { passive: true });
    document.addEventListener("mouseup", handleUp, { passive: true });
    document.addEventListener("mouseleave", handleLeaveWindow, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", setPosition);
      document.removeEventListener("pointermove", setPosition);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeaveWindow);
      if (hovering) {
        innerRing.classList.remove("cursor-ring--hover");
        outerRing.classList.remove("cursor-ring--hover");
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={outerPosRef} className="cursor-ring-pos cursor-ring-pos--outer" aria-hidden="true">
        <div ref={outerRingRef} className="cursor-ring cursor-ring--outer" />
      </div>
      <div ref={innerPosRef} className="cursor-ring-pos cursor-ring-pos--inner" aria-hidden="true">
        <div ref={innerRingRef} className="cursor-ring cursor-ring--inner">
          <span className="cursor-ring-dot" />
        </div>
      </div>
    </>
  );
}
