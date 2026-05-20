'use client';

import { useState } from 'react';
import { OrderDrawer } from '../components/OrderDrawer';
import { Hero } from '../components/Hero';
import { MenuHighlights } from '../components/MenuHighlights';
import { Gallery } from '../components/Gallery';

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-[#f5efe6]">
      <Hero onOrderClick={() => setDrawerOpen(true)} />
      <MenuHighlights onOrderClick={() => setDrawerOpen(true)} />
      <Gallery />

      {/* Final CTA */}
      <section className="px-4 pb-32 pt-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-[#cda45d]/20 bg-gradient-to-br from-[#101010] to-[#070707] p-8 shadow-[0_0_0_1px_rgba(205,164,93,.16),0_18px_55px_rgba(205,164,93,.10)] sm:p-10 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#cda45d]">Final call</p>
                <h2 className="font-display text-4xl leading-tight text-[#f5efe6] sm:text-5xl lg:text-6xl">Your Table Is Waiting.</h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#b7b2aa] sm:text-lg">Skip ordinary. Order Lobster Tavern on WhatsApp or Uber Eats tonight.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6">
                <div className="space-y-4 text-sm text-[#b7b2aa]">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><span>WhatsApp</span><span className="text-[#f5efe6]">076 810 0585</span></div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><span>Location</span><span className="text-[#f5efe6]">Johannesburg</span></div>
                  <div className="flex items-center justify-between gap-4"><span>Uber Eats</span><span className="text-[#f5efe6]">Available now</span></div>
                </div>
                <a
                  href="https://wa.me/27768100585?text=Hi%20Lobster%20Tavern%2C%20I%E2%80%99m%20ready%20to%20place%20my%20order%20for%20Johannesburg."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#cda45d] px-5 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                >
                  Order on WhatsApp
                </a>
                <a
                  href="https://www.ubereats.com/store/lobster-tavern/wnm1dthbWumFJWAyyDO4YQ"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-4 text-sm font-medium text-[#f5efe6] transition hover:border-[#cda45d]/35 hover:bg-white/10"
                >
                  Order on Uber Eats
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile WhatsApp button */}
      <a
        href="https://wa.me/27768100585?text=Hi%20Lobster%20Tavern%2C%20I%E2%80%99d%20like%20to%20place%20an%20order%20for%20Johannesburg."
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp"
        className="fixed bottom-4 right-4 z-[70] inline-flex items-center gap-3 rounded-full border border-[#cda45d]/30 bg-[#121212]/90 px-4 py-3 text-sm font-medium text-[#f5efe6] shadow-lg backdrop-blur-xl sm:bottom-6 sm:right-6"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#cda45d] text-black">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.16 1.59 5.98L0 24l6.29-1.64a11.89 11.89 0 0 0 5.77 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.45ZM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.73.97 1-3.63-.24-.37a9.84 9.84 0 0 1-1.52-5.28c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.85 9.85 0 0 1 2.9 7c0 5.47-4.45 9.92-9.93 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.47.13-.62.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.58-.49-.5-.66-.5-.17-.01-.37-.01-.56-.01-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.48 1.07 2.91 1.22 3.11.15.2 2.1 3.2 5.1 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.03-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.56-.35Z" />
          </svg>
        </span>
        <span className="hidden sm:inline">Order on WhatsApp</span>
      </a>

      {/* Sticky mobile Uber Eats button */}
      <a
        href="https://www.ubereats.com/store/lobster-tavern/wnm1dthbWumFJWAyyDO4YQ"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 left-4 z-[70] inline-flex items-center gap-3 rounded-full border border-white/12 bg-[#121212]/90 px-4 py-3 text-sm font-medium text-[#f5efe6] shadow-lg backdrop-blur-xl sm:bottom-6 sm:left-6"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-bold text-xs">UE</span>
        <span className="hidden sm:inline">Uber Eats</span>
      </a>

      <OrderDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  );
}
