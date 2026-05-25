const whatsappNumber = "27721234567";
const whatsappMessage = encodeURIComponent(
  "Hi Lobster Tavern, I saw your campaign and would like to enquire about a booking or order."
);

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const experiences = [
  "Flame-grilled lobster",
  "Premium seafood platters",
  "Date-night atmosphere",
  "Celebration-ready dining",
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 sm:px-10 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(205,164,93,0.28),transparent_34%),linear-gradient(135deg,#050505_0%,#111827_45%,#050505_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.45em] text-gold">
            Lobster Tavern
          </p>
          <h1 className="max-w-5xl font-display text-5xl leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
            For nights that deserve more than ordinary.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-smoke sm:text-xl">
            Flame-grilled lobster, premium seafood, warm ambience, and the kind of table that turns dinner into a proper occasion.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              className="rounded-full bg-gold px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:scale-[1.02] hover:bg-[#f0c875]"
            >
              Order on WhatsApp
            </a>
            <a
              href="#experience"
              className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:border-gold hover:text-gold"
            >
              View the experience
            </a>
          </div>
        </div>
      </section>

      <section id="experience" className="px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-gold">
              The experience
            </p>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">
              Some places serve food. Some create memories.
            </h2>
            <p className="mt-6 text-lg leading-8 text-smoke">
              Lobster Tavern is built for guests who want warmth over routine, atmosphere over convenience, and dining over snacking.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {experiences.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur"
              >
                <div className="mb-8 h-28 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(205,164,93,0.35),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                <h3 className="font-display text-2xl text-white">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-smoke">
                  A richer alternative for evenings that need texture, flavour, and a little theatre.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-gold">
            Campaign landing page
          </p>
          <h2 className="mt-5 font-display text-4xl sm:text-6xl">Your table is waiting.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-smoke">
            Skip ordinary. Message Lobster Tavern directly on WhatsApp to reserve, enquire, or order.
          </p>
          <a
            href={whatsappUrl}
            className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:scale-[1.02] hover:bg-gold"
          >
            Reserve or order on WhatsApp
          </a>
        </div>
      </section>

      <a
        href={whatsappUrl}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-gold px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-black shadow-2xl shadow-gold/20 transition hover:scale-105"
      >
        WhatsApp
      </a>
    </main>
  );
}
