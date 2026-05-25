const whatsappNumber = '27768100585';
const whatsappMessage = encodeURIComponent('Hi Lobster Tavern, I would like to make a booking or place an order.');

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
const uberEatsUrl = 'https://www.ubereats.com/';

const marqueeItems = [
  'Flame Grilled Lobster',
  'Premium Seafood',
  'Luxury Dining',
  'Cocktails',
  'Johannesburg Nights',
  'Date Night Destination',
];

export default function Page() {
  return (
    <main className="overflow-hidden bg-[#050505] text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(205,164,93,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,140,66,0.18),transparent_25%),linear-gradient(135deg,#050505_0%,#111827_45%,#050505_100%)]" />

        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[10%] top-[15%] h-72 w-72 animate-pulse rounded-full bg-gold blur-3xl" />
          <div className="absolute bottom-[10%] right-[10%] h-80 w-80 animate-pulse rounded-full bg-orange-500 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.55em] text-gold">
            Lobster Tavern Johannesburg
          </p>

          <h1 className="font-display text-6xl leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
            Luxury Seafood.
            <span className="block text-gold">Designed For Nights Out.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-smoke sm:text-xl">
            Flame grilled lobster, premium seafood platters, cocktails, atmosphere, and indulgent dining experiences crafted for unforgettable evenings.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              className="rounded-full bg-gold px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-black transition duration-300 hover:scale-105 hover:bg-[#f0c875]"
            >
              Reserve On WhatsApp
            </a>

            <a
              href={uberEatsUrl}
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-white backdrop-blur transition duration-300 hover:border-gold hover:text-gold"
            >
              Order On Uber Eats
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black py-5">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="marquee-track inline-flex min-w-full animate-[marquee_22s_linear_infinite] gap-16 text-sm font-semibold uppercase tracking-[0.45em] text-gold">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
          {[
            {
              title: 'Seafood Theatre',
              desc: 'Premium plating, flame grilled finishes, and atmosphere-first dining.',
            },
            {
              title: 'Date Night Energy',
              desc: 'Warm lighting, cocktails, music, and sophisticated evening ambience.',
            },
            {
              title: 'Celebration Dining',
              desc: 'Built for birthdays, evenings out, celebrations, and indulgent nights.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group rounded-[32px] border border-white/10 bg-white/[0.04] p-8 transition duration-500 hover:-translate-y-2 hover:border-gold/40 hover:bg-white/[0.06]"
            >
              <div className="mb-6 h-44 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(205,164,93,0.28),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] transition duration-500 group-hover:scale-[1.02]" />
              <h3 className="font-display text-3xl text-white">{card.title}</h3>
              <p className="mt-4 leading-7 text-smoke">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 px-6 py-28 text-center sm:px-10 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(205,164,93,0.18),transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-gold">
            Lobster Tavern
          </p>

          <h2 className="mt-6 font-display text-5xl leading-tight sm:text-6xl">
            Your Table Is Waiting.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-smoke">
            Skip ordinary dining. Reserve your experience or order directly from Lobster Tavern tonight.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              className="rounded-full bg-gold px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
            >
              WhatsApp Booking
            </a>

            <a
              href={uberEatsUrl}
              className="rounded-full border border-white/20 px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-white transition hover:border-gold hover:text-gold"
            >
              Uber Eats Delivery
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
