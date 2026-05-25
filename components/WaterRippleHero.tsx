"use client";

import { useEffect, useRef } from "react";
import $ from "jquery";

declare global {
  interface JQuery {
    ripples(options?: {
      resolution?: number;
      dropRadius?: number;
      perturbance?: number;
      interactive?: boolean;
      crossOrigin?: string;
      imageUrl?: string | null;
    }): JQuery;
    ripples(
      method: "drop",
      x: number,
      y: number,
      radius: number,
      strength: number
    ): JQuery;
    ripples(method: "destroy"): JQuery;
    ripples(method: "pause"): JQuery;
    ripples(method: "play"): JQuery;
    ripples(method: "set", property: "dropRadius" | "perturbance", value: number): JQuery;
  }
}

type WaterRippleHeroProps = {
  backgroundImage: string;
  children: React.ReactNode;
  className?: string;
};

export default function WaterRippleHero({
  backgroundImage,
  children,
  className = "",
}: WaterRippleHeroProps) {
  const rippleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ambientInterval: ReturnType<typeof setInterval> | null = null;
    let cleanupEvents: (() => void) | null = null;
    let isMounted = true;

    const initialiseRipples = async () => {
      const el = rippleRef.current;
      if (!el) return;

      const isMobile =
        window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isMobile) return;

      try {
        await import("jquery.ripples");

        if (!isMounted || !rippleRef.current) return;

        const $el = $(el);

        $el.ripples({
          resolution: 512,
          dropRadius: 24,
          perturbance: 0.03,
          interactive: false,
          crossOrigin: "",
        });

        const addDrop = (x: number, y: number, radius = 22, strength = 0.03) => {
          try {
            $el.ripples("drop", x, y, radius, strength);
          } catch {}
        };

        const handleMouseMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          addDrop(x, y, 18, 0.025);
        };

        const handleClick = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          addDrop(x, y, 36, 0.06);
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("click", handleClick);

        cleanupEvents = () => {
          el.removeEventListener("mousemove", handleMouseMove);
          el.removeEventListener("click", handleClick);
        };

        ambientInterval = setInterval(() => {
          const rect = el.getBoundingClientRect();
          const x = Math.random() * rect.width;
          const y = Math.random() * rect.height;
          addDrop(x, y, 28, 0.02);
        }, 2200);
      } catch {
        return;
      }
    };

    initialiseRipples();

    return () => {
      isMounted = false;
      cleanupEvents?.();
      if (ambientInterval) clearInterval(ambientInterval);
      try {
        if (rippleRef.current) {
          $(rippleRef.current).ripples("destroy");
        }
      } catch {}
    };
  }, []);

  return (
    <section className={`ripple-hero ${className}`}>
      <div
        ref={rippleRef}
        className="ripple-hero__bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      <div className="ripple-hero__overlay" aria-hidden="true" />
      <div className="ripple-hero__content">{children}</div>
    </section>
  );
}
