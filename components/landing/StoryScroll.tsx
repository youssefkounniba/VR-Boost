"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const FRAMES = [
  {
    src: "/images/story/01-vide.png",
    step: "Step 01",
    title: "The property as it is",
    text: "An empty space is hard to fall in love with. This is what your buyers see today.",
  },
  {
    src: "/images/story/02-stage.png",
    step: "Step 02",
    title: "Staged, virtually",
    text: "Our team dresses every room by hand. Each piece becomes an interactive hotspot your clients can explore.",
  },
  {
    src: "/images/story/03-hub.png",
    step: "Step 03",
    title: "Visited, together",
    text: "An advisor joins the tour as an avatar — guiding, answering, closing. Live, inside the property.",
  },
];

const HOTSPOTS = [
  { x: 15.3, y: 21.5 },
  { x: 48.6, y: 71 },
  { x: 78.7, y: 59 },
];

// Opacity of frame `i` at scroll progress `p` (0..1), centers at 0 / 0.5 / 1.
function frameOpacity(i: number, p: number) {
  const center = i * 0.5;
  return Math.max(0, 1 - Math.abs(p - center) / 0.5);
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export default function StoryScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = rect.height - window.innerHeight;
        const p = dist > 0 ? Math.min(1, Math.max(0, -rect.top / dist)) : 0;
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  function goTo(i: number) {
    const el = sectionRef.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY;
    const dist = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: start + (i / 2) * dist, behavior: "smooth" });
  }

  const active = Math.round(progress * 2); // 0 | 1 | 2

  /* ---- Reduced-motion: static 3-card layout ---- */
  if (reduced) {
    return (
      <section className="bg-landing-deepNavy py-20">
        <div className="mx-auto max-w-[1100px] space-y-10 px-6">
          {FRAMES.map((f) => (
            <div key={f.step} className="overflow-hidden rounded-3xl border border-landing-borderDef bg-landing-surface">
              <div className="relative aspect-[16/10] w-full">
                <Image src={f.src} alt={f.title} fill className="object-cover" sizes="100vw" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-landing-violet">{f.step}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-landing-blanc">{f.title}</h3>
                <p className="mt-2 max-w-xl text-base text-landing-clair">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ---- Scroll-driven sticky crossfade ---- */
  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-landing-abyss">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Frames */}
        {FRAMES.map((f, i) => {
          const op = frameOpacity(i, progress);
          const scale = 1 + 0.06 * (1 - op);
          return (
            <div
              key={f.src}
              className="absolute inset-0"
              style={{ opacity: op, zIndex: Math.round(op * 10), willChange: "opacity, transform" }}
            >
              <div className="relative h-full w-full" style={{ transform: `scale(${scale})` }}>
                <Image src={f.src} alt={f.title} fill priority={i === 0} className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-landing-abyss/80 via-transparent to-landing-abyss/15" />
              </div>
            </div>
          );
        })}

        {/* Frame 2 — interactive hotspots */}
        {frameOpacity(1, progress) > 0.45 && (
          <div className="absolute inset-0 z-20">
            {HOTSPOTS.map((h, i) => (
              <span
                key={i}
                className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${h.x}%`, top: `${h.y}%`, animation: "pin-pop .4s cubic-bezier(.2,.8,.2,1) both", animationDelay: `${i * 0.15}s` }}
              >
                <span className="absolute inset-0 rounded-full bg-landing-ctaBlue/40" style={{ animation: "pulse-ring 2.2s ease-out infinite" }} />
                <span className="relative h-3.5 w-3.5 rounded-full border-2 border-white bg-landing-ctaBlue shadow-lg" />
              </span>
            ))}
          </div>
        )}

        {/* Frame 3 — LIVE pill */}
        {frameOpacity(2, progress) > 0.45 && (
          <div className="absolute left-6 top-6 z-20" style={{ animation: "pin-pop .4s ease both" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-landing-abyss/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-landing-blanc backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-landing-danger/60" style={{ animation: "pulse-ring 1.6s ease-out infinite" }} />
                <span className="relative h-2.5 w-2.5 rounded-full bg-landing-danger" />
              </span>
              Live — Hub &amp; Avatar
            </span>
          </div>
        )}

        {/* Caption card */}
        <div className="absolute bottom-8 left-6 z-30 max-w-sm sm:left-10">
          <div key={active} className="animate-rise rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-landing-clair/80">{FRAMES[active].step}</p>
            <h3 className="mt-1.5 font-display text-xl font-bold text-landing-blanc">{FRAMES[active].title}</h3>
            <p className="mt-2 text-base leading-relaxed text-landing-clair">{FRAMES[active].text}</p>
          </div>
        </div>

        {/* Progress rail (right) */}
        <div className="absolute right-6 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 sm:right-10">
          {FRAMES.map((f, i) => (
            <button
              key={f.step}
              type="button"
              aria-label={`Go to ${f.step}`}
              onClick={() => goTo(i)}
              className={`rounded-full border transition-all duration-300 ${
                active === i
                  ? "h-8 w-3 border-landing-ctaBlue bg-landing-ctaBlue"
                  : "h-3 w-3 border-white/40 bg-white/10 hover:border-white"
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2 flex-col items-center text-landing-muted transition-opacity duration-500 hidden sm:flex"
          style={{ opacity: progress > 0.02 ? 0 : 1 }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em]">Scroll</span>
          <ChevronDown className="mt-1 h-5 w-5" style={{ animation: "bounce-soft 1.4s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
