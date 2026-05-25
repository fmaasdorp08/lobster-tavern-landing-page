'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const whatsappNumber = '27768100585';
const whatsappMessage = encodeURIComponent('Hi Lobster Tavern, I would like to make a booking or place an order.');

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
const uberEatsUrl = 'https://www.ubereats.com/store-browse-uuid/c279b576-d85b-5ae9-8525-6032c833b861?diningMode=DELIVERY';

const marqueeItems = [
  'Flame Grilled Lobster',
  'Premium Seafood',
  'Luxury Dining',
  'Cocktails',
  'Johannesburg Nights',
  'Date Night Destination',
];

const cards = [
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
      uniform vec2 u_resolution;
      void main() {
        vec2 p = a_position;
        float drift = sin(u_time * 0.7 + p.x * 6.0) * 0.025;
        gl_Position = vec4(p.x + drift, p.y + cos(u_time * 0.45 + p.y * 5.0) * 0.025, 0.0, 1.0);
        gl_PointSize = 1.8 + 2.8 * (sin(u_time + p.x * 8.0) * 0.5 + 0.5);
      }
    `;

    const fragmentSource = `
      precision mediump float;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        float alpha = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(1.0, 0.72, 0.32, alpha * 0.42);
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

    const particleCount = 180;
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

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1] opacity-70" aria-hidden="true" />;
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
          scrollTrigger: undefined,
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

  const updateGlow = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  return (
    <main ref={rootRef} className="relative overflow-hidden bg-[#050505] text-white">
      <WebGLParticles />
      <div ref={cursorRef} className="cursor-light pointer-events-none fixed left-0 top-0 z-[2] hidden h-[440px] w-[440px] rounded-full lg:block" />

      <nav className="glass-nav fixed left-1/2 top-5 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full px-5 py-3">
        <span className="text-xs font-bold uppercase tracking-[0.35em] text-gold">Lobster Tavern</span>
        <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 sm:flex">
          <a href="#experience" className="hover:text-gold">Experience</a>
          <a href="#delivery" className="hover:text-gold">Order</a>
        </div>
      </nav>

      <section className="motion-stage relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
        <div className="luxury-aurora parallax-slow" />
        <div className="luxury-grid" />
        <div className="depth-orb one" />
        <div className="depth-orb two" />
        <div className="depth-orb three" />
        <div className="shimmer-sweep opacity-40" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="reveal mb-6 text-sm font-semibold uppercase tracking-[0.55em] text-gold">Lobster Tavern Johannesburg</p>
          <h1 className="reveal font-display text-6xl leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
            Luxury Seafood.
            <span className="block text-gold">Designed For Nights Out.</span>
          </h1>
          <p className="reveal mx-auto mt-8 max-w-3xl text-lg leading-8 text-smoke sm:text-xl">
            Flame grilled lobster, premium seafood platters, cocktails, atmosphere, and indulgent dining experiences crafted for unforgettable evenings.
          </p>
          <div className="reveal mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={whatsappUrl} onMouseMove={updateGlow} className="glow-cta rounded-full bg-gold px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-black">
              Reserve On WhatsApp
            </a>
            <a href={uberEatsUrl} onMouseMove={updateGlow} className="glow-cta rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-white backdrop-blur">
              Order On Uber Eats
            </a>
          </div>
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
              <div className="image-reveal mb-6 h-44 rounded-3xl" />
              <h3 className="font-display text-3xl text-white">{card.title}</h3>
              <p className="mt-4 leading-7 text-smoke">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="delivery" className="relative z-10 overflow-hidden border-t border-white/10 px-6 py-28 text-center sm:px-10 lg:px-20">
        <div className="cinematic-video-plane absolute inset-x-8 top-8 h-64 rounded-[40px] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(205,164,93,0.18),transparent_40%)]" />
        <div className="reveal relative z-10 mx-auto max-w-4xl pt-24">
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-gold">Lobster Tavern</p>
          <h2 className="mt-6 font-display text-5xl leading-tight sm:text-6xl">Your Table Is Waiting.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-smoke">Skip ordinary dining. Reserve your experience or order directly from Lobster Tavern tonight.</p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <a href={whatsappUrl} onMouseMove={updateGlow} className="glow-cta rounded-full bg-gold px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-black">WhatsApp Booking</a>
            <a href={uberEatsUrl} onMouseMove={updateGlow} className="glow-cta rounded-full border border-white/20 px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-white">Uber Eats Delivery</a>
          </div>
        </div>
      </section>
    </main>
  );
}
