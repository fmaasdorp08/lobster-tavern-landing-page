'use client';

const MENU_ITEMS = [
  { tag: 'Signature', name: 'Ultimate Deck', desc: 'A premium feast built for sharing. The order that turns dinner into an event.', detail: 'Serves 4–5', price: 'R2 200' },
  { tag: 'Best seller', name: 'Massive Deck', desc: 'Lobster, prawns, mussels, calamari, and sides in one showpiece platter.', detail: 'Large platter', price: 'R1 700' },
  { tag: 'Feast', name: 'Boilbag Feast', desc: 'Prawns, mussels, calamari, lobster tails, and crab for premium shared dining.', detail: 'Feast platter', price: 'R1 050' },
  { tag: 'Hero dish', name: 'Tavern Lobster', desc: 'Crab, prawns, shrimp, lobster tails, mussels, sweetcorn and potatoes.', detail: 'Premium dish', price: 'R550' },
  { tag: 'Lobster-first', name: 'Lobster Tail Dish', desc: 'Six lobster tails in a saucy lemon-and-butter finish with sides.', detail: 'For lobster lovers', price: 'R650' },
];

interface MenuHighlightsProps {
  onOrderClick: () => void;
}

export function MenuHighlights({ onOrderClick }: MenuHighlightsProps) {
  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#cda45d]">Menu highlights</p>
        <h2 className="font-display text-4xl leading-tight text-[#f5efe6] sm:text-5xl">
          Built around abundance, sharing, and lobster-led indulgence.
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {MENU_ITEMS.map((item) => (
          <article
            key={item.name}
            className="rounded-[2rem] border border-[#cda45d]/18 bg-white/[0.03] p-6"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-[#cda45d]">{item.tag}</p>
            <h3 className="mt-4 font-display text-3xl text-[#f5efe6]">{item.name}</h3>
            <p className="mt-3 text-sm leading-7 text-[#b7b2aa]">{item.desc}</p>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-[#b7b2aa]">{item.detail}</span>
              <span className="text-[#f5efe6] font-medium">{item.price}</span>
            </div>
          </article>
        ))}
        <article className="rounded-[2rem] border border-white/8 bg-white/[0.025] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[#b7b2aa]">Browse</p>
          <h3 className="mt-4 font-display text-3xl text-[#f5efe6]">See the full menu.</h3>
          <p className="mt-3 text-sm leading-7 text-[#b7b2aa]">Open the PDF for the complete line-up of decks, boilbags, crab, and specialty dishes.</p>
          <div className="mt-6 flex flex-col gap-3">
            <a href="/assets/menu.pdf" className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-[#f5efe6] text-center justify-center">View Menu PDF</a>
            <button onClick={onOrderClick} className="inline-flex rounded-full border border-[#cda45d]/30 bg-[#cda45d]/10 px-5 py-3 text-sm font-medium text-[#f5efe6] justify-center">Order Now</button>
          </div>
        </article>
      </div>
    </section>
  );
}
