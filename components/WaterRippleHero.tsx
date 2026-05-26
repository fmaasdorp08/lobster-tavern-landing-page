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
  const fxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = fxRef.current;
    if (!el) return;

    let raf = 0;

    const handleMove = (event: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
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
      <div className="ripple-hero__caustics" aria-hidden="true" />
      <div ref={fxRef} className="ripple-hero__fx" aria-hidden="true" />
      <div className="ripple-hero__overlay" aria-hidden="true" />
      <div className="ripple-hero__content">{children}</div>
    </section>
  );
}