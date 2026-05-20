'use client';

const IMAGES = [
  { src: '/assets/gallery-1.jpg', alt: 'Ultimate Deck platter' },
  { src: '/assets/gallery-2.jpg', alt: 'Seafood platter closeup' },
  { src: '/assets/gallery-3.jpg', alt: 'Shared platter dining' },
  { src: '/assets/gallery-4.jpg', alt: 'Premium lobster tray' },
  { src: '/assets/gallery-5.jpg', alt: 'Luxury seafood gathering' },
  { src: '/assets/gallery-6.jpg', alt: 'Premium lobster and crab platter' },
];

export function Gallery() {
  return (
    <section id="gallery" className="overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#cda45d]">Gallery</p>
          <h2 className="font-display text-4xl leading-tight text-[#f5efe6] sm:text-5xl">
            A cinematic look at what arrives at the table.
          </h2>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-10 snap-x snap-mandatory">
        {IMAGES.map((img) => (
          <div
            key={img.src}
            className="min-w-[260px] snap-start overflow-hidden rounded-[2rem] border border-white/8 bg-black/30 md:min-w-[340px] lg:min-w-[420px]"
            style={{ height: 360 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
