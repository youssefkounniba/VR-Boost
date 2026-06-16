"use client";

import dynamic from "next/dynamic";
import { Wand2, Move3d } from "lucide-react";

/* three.js must run client-side only — split it out of the SSR pass. */
const HeroRoom3D = dynamic(() => import("./HeroRoom3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-landing-mist">
      <span className="inline-flex items-center gap-2 text-sm font-medium text-landing-dim">
        <Move3d className="h-4 w-4 animate-pulse text-landing-ctaBlue" />
        Loading 3D room…
      </span>
    </div>
  ),
});

export default function HeroRoom() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-landing-line bg-white p-2 shadow-2xl shadow-landing-ink/10">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-landing-mist">
        <HeroRoom3D />
      </div>

      {/* badge */}
      <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-landing-ctaBlue px-3 py-1 text-xs font-bold text-white shadow">
        <Wand2 className="h-3 w-3" /> Home Staging
      </span>

      {/* drag hint */}
      <span className="pointer-events-none absolute bottom-5 right-5 inline-flex items-center gap-1.5 rounded-full border border-landing-line bg-white/90 px-3 py-1 text-xs font-semibold text-landing-ink shadow-sm backdrop-blur">
        <Move3d className="h-3.5 w-3.5 text-landing-ctaBlue" /> Drag to explore
      </span>
    </div>
  );
}
