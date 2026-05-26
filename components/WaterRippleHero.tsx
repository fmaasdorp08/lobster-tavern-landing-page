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
    let isMounted = true;
    let removeClickListener: (() => void) | null = null;

    const initialiseRipples = async () => {
      const el = rippleRef.current;
      if (!el) return;

      const disableEffect =
        window.innerWidth < 768 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (disableEffect) return;

      try {
        await import("jquery.ripples");

        if (!isMounted || !rippleRef.current) return;

        const $el = $(el);

        $el.ripples({
          resolution: 256,
          dropRadius: 10,
          perturbance: 0.006,
          interactive: false,
          crossOrigin: "",
        });

        const addDrop = (
          x: number,
          y: number,
          radius = 10,
          strength = 0.008
        ) => {
          try {
            $el.ripples("drop", x, y, radius, strength);
          } catch {}
        };

        const handleClick = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          addDrop(x, y, 14, 0.012);
        };

        el.addEventListener("click", handleClick);
        removeClickListener = () => el.removeEventListener("click", handleClick);

        ambientInterval = setInterval(() => {
          const rect = el.getBoundingClientRect();
          const x = Math.random() * rect.width;
          const y = Math.random() * rect.height;
          addDrop(x, y, 10, 0.006);
        }, 5000);
      } catch {
        return;
      }
    };

    initialiseRipples();

    return () => {
      isMounted = false;
      removeClickListener?.();
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