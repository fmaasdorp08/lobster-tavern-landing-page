'use client';

import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react';
import gsap from 'gsap';

const officialWebsiteUrl = 'https://www.lobstertavern.com';
const whatsappNumber = '27768100585';
const whatsappMessage = encodeURIComponent('Hi Lobster Tavern, I would like to place an order.');

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
const uberEatsUrl = 'https://www.ubereats.com/store-browse-uuid/c279b576-d85b-5ae9-8525-6032c833b861?diningMode=DELIVERY';

const images = {
  logo: '/images/lobster-tavern-logo.png',
  hero: '/images/hero-lobster-dining.jpg',
  chefPlating: '/images/chef-plating.jpg',
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
    desc: 'A luxurious seafood feast featuring succulent prawns, mussels, calamari, squid heads, whole lobster, lobster tails, and full crab portions, served with signature sauces and fresh vegetable selections.',
  },
  {
    title: 'Seafood Boil Crab Combo',
    image: '/images/seafood-boil-bag-combo.jpg',
    desc: 'A generous seafood platter featuring prawns, mussels, calamari, lobster tails, and full crab portions, served with sweetcorn, baby potatoes, and your choice of chipolata sausages or boiled eggs.',
  },
  {
    title: 'Massive Deck',
    image: '/images/massive-deck.jpg',
    desc: 'A generous seafood platter featuring prawns, mussels, calamari, squid heads, whole lobster, and lobster tails, served with sweetcorn, baby potatoes, and your choice of chipolata sausages or boiled eggs. Includes your choice of signature sauce: Lemon & Herb, Spicy Cajun, or Peri-Peri.',
  },
];

function WebGLParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 a_position;
      uniform float u_time;
      void main() {
        vec2 p = a_position;
        float drift = sin(u_time * 0.7 + p.x * 6.0) * 0.025;
        gl_Position = vec4(p.x + drift, p.y + cos(u_time * 0.45 + p.y * 5.0) * 0.025, 0.0, 1.0);
        gl_PointSize = 2.4 + 3.8 * (sin(u_time + p.x * 8.0) * 0.5 + 0.5);
      }
    `;

    const fragmentSource = `
      precision mediump float;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        float alpha = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(0.02, 0.02, 0.02, alpha * 0.58);
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    const particleCount = 220;
    const positions = new Float32Array(particleCount * 2);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 2] = Math.random() * 2 - 1;
      positions[i * 2 + 1] = Math.random() * 2 - 1;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'u_time');

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let raf = 0;
    const start = performance.now();
    const render = () => {
      const time = (performance.now() - start) / 1000;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLocation, time);
      gl.drawArrays(gl.POINTS, 0, particleCount);
      raf = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[3] opacity-100" aria-hidden="true" />;
}

export default function LobsterExperience() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const root = rootRef.current;
    if (!cursor || !root) return;

    const moveCursor = (event: MouseEvent) => {
      gsap.to(cursor, {
        x: event.clientX - 220,
        y: event.clientY - 220,
        duration: 0.45,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const reveals = gsap.utils.toArray<HTMLElement>('.reveal');
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 60, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
        }
      );
    });

    const onScroll = () => {
      const scrollY = window.scrollY;
      root.style.setProperty('--scroll-depth', `${scrollY * 0.08}px`);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const updateGlow = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  return (
    <main ref={rootRef} className="relative overflow-hidden bg-[#050505] text-white">
      <WebGLParticles />
      <div ref={cursorRef} className="cursor-light pointer-events-none fixed left-0 top-0 z-[4] hidden h-[440px] w-[440px] rounded-full lg:block" />

      <nav className="glass-nav fixed left-1/2 top-5 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full px-5 py-3">
        <a href={officialWebsiteUrl} className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-gold transition hover:opacity-60" aria-label="Visit the official Lobster Tavern website">
          <img src={images.logo} alt="Lobster Tavern logo" className="h-8 w-auto object-contain" />
          <span className="hidden sm:inline">Lobster Tavern</span>
        </a>
        <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 sm:flex">
          <a href="#experience" className="hover:text-gold">Experience</a>
          <a href="#delivery" className="hover:text-gold">Order</a>
        </div>
      </nav>

      <section className="motion-stage relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
        <img src={images.hero} alt="Lobster Tavern hero seafood dining" className="absolute inset-0 h-full w-full object-cover opacity-12" />
        <div className="absolute inset-0 bg-white/35" />
        <div className="luxury-aurora parallax-slow opacity-100" />
        <div className="luxury-grid opacity-80" />
        <div className="depth-orb one" />
        <div className="depth-orb two" />
        <div className="depth-orb three" />
        <div className="shimmer-sweep opacity-70" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="reveal mb-6 text-sm font-semibold uppercase tracking-[0.55em] text-gold">Lobster Tavern Johannesburg</p>
          <h1 className="reveal font-display text-6xl leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
            Luxury Seafood.
            <span className="block text-gold">Designed For Nights In.</span>
          </h1>
          <p className="reveal mx-auto mt-8 max-w-3xl text-lg leading-8 text-smoke sm:text-xl">
            Seafood boil bags, premium crab dishes, indulgent seafood platters with all that the ocean has to offer, premium seafood platters, enjoy that premium dining experience, crafted for unforgettable evenings.
          </p>
          <div className="reveal mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={whatsappUrl} onMouseMove={updateGlow} className="glow-cta rounded-full bg-gold px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-black">
              Order On WhatsApp
            </a>
            <a href={uberEatsUrl} onMouseMove={updateGlow} className="glow-cta rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-white backdrop-blur">
              Order On Uber Eats
            </a>
          </div>
          <img src={images.uberAvailable} alt="Available on Uber Eats" className="reveal mx-auto mt-8 h-16 w-auto object-contain opacity-90 sm:h-20" />
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-black/80 py-5 backdrop-blur-xl">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="marquee-track inline-flex min-w-full gap-16 text-sm font-semibold uppercase tracking-[0.45em] text-gold">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => <span key={idx}>{item}</span>)}
          </div>
        </div>
      </section>

      <section id="experience" className="relative z-10 px-6 py-28 sm:px-10 lg:px-20">
        <div className="parallax-panel mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="interactive-card reveal group rounded-[32px] border border-white/10 bg-white/[0.04] p-8 transition duration-500 hover:border-gold/40 hover:bg-white/[0.06]">
              <div className="image-reveal mb-6 h-56 overflow-hidden rounded-3xl">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <h3 className="font-display text-3xl text-white">{card.title}</h3>
              <p className="mt-4 leading-7 text-smoke">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="delivery" className="relative z-10 overflow-hidden border-t border-white/10 px-6 py-28 text-center sm:px-10 lg:px-20">
        <div className="reveal relative z-10 mx-auto max-w-5xl">
          <div className="mx-auto mb-14 overflow-hidden rounded-[40px] border border-white/10 bg-white/60 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <img src={images.experience} alt="Lobster Tavern seafood experience" className="h-44 w-full rounded-[30px] object-cover sm:h-56 lg:h-64" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-gold">Lobster Tavern</p>
          <h2 className="mt-6 font-display text-5xl leading-tight sm:text-6xl">Your Order Is Waiting.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-smoke">Skip ordinary dining. Reserve your experience and order directly from Lobster Tavern tonight.</p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <a href={whatsappUrl} onMouseMove={updateGlow} className="glow-cta rounded-full bg-gold px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-black">WhatsApp Order</a>
            <a href={uberEatsUrl} onMouseMove={updateGlow} className="glow-cta rounded-full border border-white/20 px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-white">Uber Eats Delivery</a>
          </div>
          <img src={images.uberOrder} alt="Order with Uber Eats" className="mx-auto mt-8 h-16 w-auto object-contain opacity-90 sm:h-20" />
        </div>
      </section>
    </main>
  );
}
