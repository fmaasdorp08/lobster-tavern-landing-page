"use client";

import { useEffect, useRef, type ReactNode } from "react";

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
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let raf = 0;

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };

    const handleMove = (event: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => updatePointer(event.clientX, event.clientY));
    };

    const handleLeave = () => {
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className={`ripple-hero ${className}`}>
      <div
        className="ripple-hero__bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      <div className="ripple-hero__water" aria-hidden="true" />
      <div className="ripple-hero__caustics" aria-hidden="true" />
      <div className="ripple-hero__overlay" aria-hidden="true" />
      <div className="ripple-hero__content">{children}</div>
    </section>
  );
}