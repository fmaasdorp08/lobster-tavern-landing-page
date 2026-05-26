'use client';

import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react';
import gsap from 'gsap';
import WaterRippleHero from '@/components/WaterRippleHero';

const officialWebsiteUrl = 'https://www.lobstertavern.com';
const whatsappNumber = '27768100585';
const whatsappMessage = encodeURIComponent(
  'Hi Lobster Tavern, I would like to place an order.'
);

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
const uberEatsUrl =
  'https://www.ubereats.com/store-browse-uuid/c279b576-d85b-5ae9-8525-6032c833b861?diningMode=DELIVERY';

const images = {
  logo: '/images/lobster-tavern-logo.png',
  hero: '/images/hero-lobster-dining.jpg',
  experience: '/images/lobster-tavern-experience.png',
  uberAvailable: '/images/available-on-uber-eats.svg',
  uberOrder: '/images/order-with-uber-eats.svg',
};

const marqueeItems = [
  'Flame Grilled Lobster',
  'Premium Seafood',
  'Luxury Home Dining',
  'Fine Dining Experienced At Home',
  'Johannesburg Nights In',
  'Date Night at Home',
];

const cards = [
  {
    title: 'Oceans Floor Delight',
    image: '/images/oceans-floor-delight.jpg',
    desc:
      'A luxurious seafood feast featuring succulent prawns, mussels, calamari, squid heads, whole lobster, lobster tails, and full crab portions, served with signature sauces and fresh vegetable selections.',
  },
  {
    title: 'Seafood Boil Crab Combo',
    image: '/images/seafood-boil-bag-combo.jpg',
    desc:
      'A generous seafood platter featuring prawns, mussels, calamari, lobster tails, and full crab portions, served with sweetcorn, baby potatoes, and your choice of chipolata sausages or boiled eggs.',
  },
  {
    title: 'Massive Deck',
    image: '/images/massive-deck.jpg',
    desc:
      'A generous seafood platter featuring prawns, mussels, calamari, squid heads, whole lobster, and lobster tails, served with sweetcorn, baby potatoes, and your choice of chipolata sausages or boiled eggs. Includes your choice of signature sauce: Lemon & Herb, Spicy Cajun, or Peri-Peri.',
  },
];

export default function LobsterExperience() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>('.reveal');

      reveals.forEach((el, index) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.06,
            ease: 'power3.out',
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const updateGlow = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    target.style.setProperty('--x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  return (
    <main ref={rootRef} className="relative overflow-hidden bg-[#050505] text-white">
      <nav className="glass-nav fixed left-1/2 top-5 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full px-5 py-3">
        <a
          href={officialWebsiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-gold transition hover:opacity-60"
          aria-label="Visit the official Lobster Tavern website"
        >
          <img
            src={images.logo}
            alt="Lobster Tavern logo"
            className="h-8 w-auto object-contain"
          />
          <span className="hidden sm:inline">Lobster Tavern</span>
        </a>

        <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 sm:flex">
          <a href="#experience" className="hover:text-gold">
            Experience
          </a>
          <a href="#delivery" className="hover:text-gold">
            Order
          </a>
        </div>
      </nav>

      <WaterRippleHero backgroundImage={images.hero} className="motion-stage px-6 py-24">
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="reveal mb-6 text-sm font-semibold uppercase tracking-[0.55em] text-gold">
            Lobster Tavern Johannesburg
          </p>

          <h1 className="reveal font-display text-6xl leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
            Luxury Seafood.
            <span className="block text-gold">Designed For Nights In.</span>
          </h1>

          <p className="reveal mx-auto mt-8 max-w-3xl text-lg leading-8 text-smoke sm:text-xl">
            Seafood boil bags, premium crab dishes, indulgent seafood platters with all
            that the ocean has to offer, premium seafood platters, enjoy that premium
            dining experience, crafted for unforgettable evenings.
          </p>

          <div className="reveal mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={updateGlow}
              className="glow-cta rounded-full bg-gold px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-black"
            >
              Order On WhatsApp
            </a>

            <a
              href={uberEatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={updateGlow}
              className="glow-cta rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-white backdrop-blur"
            >
              Order On Uber Eats
            </a>
          </div>

          <img
            src={images.uberAvailable}
            alt="Available on Uber Eats"
            className="reveal mx-auto mt-8 h-16 w-auto object-contain opacity-90 sm:h-20"
          />
        </div>
      </WaterRippleHero>

      <section className="relative z-10 border-y border-white/10 bg-black/80 py-5 backdrop-blur-xl">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="marquee-track inline-flex min-w-full gap-16 text-sm font-semibold uppercase tracking-[0.45em] text-gold">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="relative z-10 px-6 py-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="interactive-card reveal group rounded-[32px] border border-white/10 bg-white/[0.04] p-8 transition duration-500 hover:border-gold/40 hover:bg-white/[0.06]"
            >
              <div className="image-reveal mb-6 h-56 overflow-hidden rounded-3xl">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="font-display text-3xl text-white">{card.title}</h3>

              <p className="mt-4 leading-7 text-smoke">{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="delivery"
        className="relative z-10 overflow-hidden border-t border-white/10 px-6 py-28 text-center sm:px-10 lg:px-20"
      >
        <div className="reveal relative z-10 mx-auto max-w-5xl">
          <div className="mx-auto mb-14 overflow-hidden rounded-[40px] border border-white/10 bg-white/60 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <img
              src={images.experience}
              alt="Lobster Tavern seafood experience"
              className="h-44 w-full rounded-[30px] object-cover sm:h-56 lg:h-64"
            />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-gold">
            Lobster Tavern
          </p>

          <h2 className="mt-6 font-display text-5xl leading-tight sm:text-6xl">
            Your Order Is Waiting.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-smoke">
            Skip ordinary dining. Reserve your experience and order directly from
            Lobster Tavern tonight.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={updateGlow}
              className="glow-cta rounded-full bg-gold px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-black"
            >
              WhatsApp Order
            </a>

            <a
              href={uberEatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={updateGlow}
              className="glow-cta rounded-full border border-white/20 px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-white"
            >
              Uber Eats Delivery
            </a>
          </div>

          <img
            src={images.uberOrder}
            alt="Order with Uber Eats"
            className="mx-auto mt-8 h-16 w-auto object-contain opacity-90 sm:h-20"
          />
        </div>
      </section>
    </main>
  );
}