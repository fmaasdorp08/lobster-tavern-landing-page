"use client";

import { ReactNode, useEffect, useRef } from "react";

type WaterRippleHeroProps = {
  backgroundImage: string;
  children: ReactNode;
  className?: string;
};

export default function WaterRippleHero({
  backgroundImage,
  children,
  className = "",
}: WaterRippleHeroProps) {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    const disableEffect =
      window.innerWidth < 768 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (disableEffect) return;

    let raf = 0;

    const handleMove = (event: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        el.style.setProperty("--pointer-x", `${x}%`);
        el.style.setProperty("--pointer-y", `${y}%`);
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <section className={`ripple-hero ${className}`}>
      <div
        className="ripple-hero__bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      <div ref={layerRef} className="ripple-hero__fx" aria-hidden="true" />
      <div className="ripple-hero__overlay" aria-hidden="true" />
      <div className="ripple-hero__content">{children}</div>
    </section>
  );
}