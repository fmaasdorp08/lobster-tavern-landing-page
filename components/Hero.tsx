'use client';

interface HeroProps {
  onOrderClick: () => void;
}

export function Hero({ onOrderClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top, rgba(205,164,93,.10), transparent 30%), linear-gradient(180deg, #060606 0%, #090909 50%, #070707 100%)',
      }}
    >
      {/* Background image layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(5,5,5,.18), rgba(5,5,5,.72)), url(/assets/hero-lobster.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(.88) brightness(.58) contrast(1.05)',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-4 pb-14 pt-28 sm:px-6 md:items-center md:pb-20 lg:px-10">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#cda45d]/20 bg-black/25 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#b7b2aa] backdrop-blur-md sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-[#cda45d]" />
            Johannesburg · Premium seafood ordering
          </div>
          <h1 className="font-display text-5xl leading-[0.9] text-[#f5efe6] sm:text-6xl md:text-7xl lg:text-[6rem]">
            For Nights That Deserve More Than Sushi.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#b7b2aa] sm:text-lg">
            Flame grilled lobster. Premium platters. An atmosphere made for indulgent evenings. Order directly on WhatsApp or Uber Eats.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://wa.me/27768100585?text=Hi%20Lobster%20Tavern%2C%20I%E2%80%99d%20like%20to%20place%20an%20order%20for%20Johannesburg."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#cda45d] px-6 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5"
            >
              Order on WhatsApp ↗
            </a>
            <button
              onClick={onOrderClick}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-medium text-[#f5efe6] backdrop-blur-md transition hover:border-[#cda45d]/35 hover:bg-white/10"
            >
              View Menu &amp; Order
            </button>
            <a
              href="https://www.ubereats.com/store/lobster-tavern/wnm1dthbWumFJWAyyDO4YQ"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-medium text-[#f5efe6] backdrop-blur-md transition hover:border-[#cda45d]/35 hover:bg-white/10"
            >
              Order on Uber Eats
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
