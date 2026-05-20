'use client';

import { useEffect } from 'react';

const MENU_ITEMS = [
  { name: 'Ultimate Deck', price: 'R2 200', desc: 'Serves 4–5 · Signature feast' },
  { name: 'Massive Deck', price: 'R1 700', desc: 'Large platter · Best seller' },
  { name: 'Boilbag Feast', price: 'R1 050', desc: 'Feast platter · Lobster & crab' },
  { name: 'Tavern Lobster', price: 'R550', desc: 'Premium hero dish' },
  { name: 'Lobster Tail Dish', price: 'R650', desc: '6 tails · Lemon butter' },
];

interface OrderDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function OrderDrawer({ open, onClose }: OrderDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Order from Lobster Tavern"
        className="fixed bottom-0 left-0 right-0 z-[90] mx-auto max-w-xl rounded-t-[2rem] border border-white/10 bg-[#0d0d0d] p-6 shadow-2xl sm:p-8"
      >
        {/* Handle */}
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-white/20" />

        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#cda45d]">Lobster Tavern · Johannesburg</p>
            <h2 className="mt-1 font-display text-3xl text-[#f5efe6]">Ready to order?</h2>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#b7b2aa] transition hover:text-[#f5efe6]"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* Menu teaser */}
        <div className="mb-6 max-h-[40vh] overflow-y-auto space-y-3 pr-1">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-[#f5efe6]">{item.name}</p>
                <p className="text-xs text-[#b7b2aa]">{item.desc}</p>
              </div>
              <span className="ml-4 shrink-0 text-sm font-semibold text-[#cda45d]">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Full menu PDF link */}
        <a
          href="/assets/menu.pdf"
          target="_blank"
          rel="noreferrer"
          className="mb-5 inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-[#f5efe6] transition hover:border-[#cda45d]/30"
        >
          View Full Menu PDF
        </a>

        {/* Order CTAs */}
        <div className="grid gap-3">
          <a
            href="https://wa.me/27768100585?text=Hi%20Lobster%20Tavern%2C%20I%E2%80%99d%20like%20to%20place%20an%20order%20for%20Johannesburg."
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#cda45d] px-5 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.16 1.59 5.98L0 24l6.29-1.64a11.89 11.89 0 0 0 5.77 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.45ZM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.73.97 1-3.63-.24-.37a9.84 9.84 0 0 1-1.52-5.28c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.85 9.85 0 0 1 2.9 7c0 5.47-4.45 9.92-9.93 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.47.13-.62.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.58-.49-.5-.66-.5-.17-.01-.37-.01-.56-.01-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.48 1.07 2.91 1.22 3.11.15.2 2.1 3.2 5.1 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.03-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.56-.35Z" />
            </svg>
            Order on WhatsApp
          </a>
          <a
            href="https://www.ubereats.com/store/lobster-tavern/wnm1dthbWumFJWAyyDO4YQ"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-4 text-sm font-medium text-[#f5efe6] transition hover:border-[#cda45d]/35 hover:bg-white/10"
          >
            Order on Uber Eats
          </a>
        </div>
      </div>
    </>
  );
}
