import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Sofa,
  Users,
  Building2,
  HardHat,
  ScanLine,
  Wand2,
  Share2,
  Video,
  Linkedin,
  Mail,
  Check,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import StoryScroll from "@/components/landing/StoryScroll";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-landing-ctaBlue/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-landing-ctaBlue">
      {children}
    </span>
  );
}

function Hi({ children }: { children: React.ReactNode }) {
  return <span className="text-landing-ctaBlue">{children}</span>;
}

/* Recurring skewed angular accent (blue / teal / lime). */
function Angular({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute flex items-stretch gap-1.5 ${className}`}
      style={{ transform: "skewX(-18deg)" }}
      aria-hidden
    >
      <span className="w-2.5 rounded-sm bg-landing-ctaBlue" />
      <span className="w-2.5 rounded-sm bg-landing-teal" />
      <span className="w-2.5 rounded-sm bg-landing-lime" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-landing-paper font-sans text-landing-body">
      <Navbar />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-landing-mist">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(circle at 70% 30%, black, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 70% 30%, black, transparent 70%)",
          }}
        />
        <Angular className="left-[-10px] top-40 h-24 opacity-70" />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-20 pt-36 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-44">
          {/* Copy */}
          <div>
            <Eyebrow>Virtual Home Staging &amp; Hub &amp; Avatar</Eyebrow>
            <h1 className="mt-5 font-display text-[34px] font-black leading-[1.05] tracking-tight text-landing-ink sm:text-5xl">
              Show what <Hi>doesn&apos;t exist</Hi> yet.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-landing-body">
              Turn an empty property into an immersive experience, guide your clients
              remotely through a 3D avatar advisor, and close faster — without moving a
              single piece of furniture.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-landing-ctaBlue px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-landing-ctaBlue/25 transition-colors hover:bg-landing-ctaHover">
                Open the platform
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#story" className="inline-flex items-center gap-2 rounded-full border border-landing-line bg-white px-7 py-3.5 text-sm font-bold text-landing-ink transition-colors hover:border-landing-lineHov">
                <Play className="h-4 w-4 fill-current text-landing-ctaBlue" />
                Watch a live walkthrough
              </a>
            </div>
            <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-landing-dim">
              Built for premium players in real estate and furniture
            </p>
          </div>

          {/* Preview image */}
          <div className="relative">
            <Angular className="-left-4 -top-5 h-16 opacity-80" />
            <div className="relative overflow-hidden rounded-3xl border border-landing-line bg-white p-2 shadow-2xl shadow-landing-ink/10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/images/story/02-stage.png" alt="Virtually staged interior" fill className="object-cover" sizes="(max-width:1024px) 100vw, 560px" priority />
                {/* hotspots */}
                {[
                  { x: "22%", y: "30%" },
                  { x: "52%", y: "66%" },
                  { x: "78%", y: "55%" },
                ].map((h, i) => (
                  <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: h.x, top: h.y }}>
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-landing-ctaBlue/40" style={{ animation: "pulse-ring 2.2s ease-out infinite" }} />
                      <span className="relative h-3 w-3 rounded-full border-2 border-white bg-landing-ctaBlue shadow" />
                    </span>
                  </span>
                ))}
              </div>
              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-landing-ctaBlue px-3 py-1 text-xs font-bold text-white shadow">
                <Wand2 className="h-3 w-3" /> Home Staging
              </span>
            </div>
            <Angular className="-bottom-5 -right-3 h-16 opacity-80" />
          </div>
        </div>
      </section>

      {/* ===== Stats strip ===== */}
      <section className="border-y border-landing-line bg-landing-paper">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-10 gap-y-5 px-6 py-7">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-landing-ctaBlue">78%</span>
            <span className="max-w-[210px] text-sm leading-snug text-landing-body">more likely to purchase when virtually staged</span>
          </p>
          <span className="hidden h-9 w-px bg-landing-line sm:block" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-landing-dim">Trusted by leading brands</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 font-display text-lg font-bold text-landing-ink/30">
            {["LG", "IKEA", "Roche Bobois", "Sketchfab"].map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Scroll story (dark immersive) ===== */}
      <div id="story">
        <StoryScroll />
      </div>

      {/* ===== The solution ===== */}
      <section id="solution" className="bg-landing-paper py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <Eyebrow>The solution</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-[30px] font-bold leading-tight text-landing-ink sm:text-4xl">
            Two technologies, one goal: <Hi>sell the feeling</Hi> of a space.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-landing-body">
            VR Boost Agency combines two products designed to work together. The first
            stages the space. The second connects people inside it.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { icon: Wand2, title: "Virtual Home Staging", text: "Starting from a simple 3D capture of the property, our team dresses every room by hand: furniture, materials, lighting, ambiance. The result is an immersive tour you can share with a single link — true to the property, true to your brand." },
              { icon: Users, title: "Hub & Avatar", text: "Your clients explore the tour whenever and wherever they want. When a question comes up, an advisor joins them as an avatar inside the property — guiding them live, answering, closing. Distance disappears. The experience stays premium." },
            ].map((c) => (
              <div key={c.title} className="rounded-3xl border border-landing-line bg-white p-8 shadow-sm transition-all hover:border-landing-lineHov hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-landing-ctaBlue/10 text-landing-ctaBlue">
                  <c.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-landing-ink">{c.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-landing-body">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Who it's for ===== */}
      <section id="audience" className="relative overflow-hidden bg-landing-mist py-20 sm:py-28">
        <Angular className="right-[-6px] top-24 h-24 opacity-60" />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <Eyebrow>Your use case</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-[30px] font-bold leading-tight text-landing-ink sm:text-4xl">
            One solution, <Hi>three business outcomes</Hi>.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Sofa, name: "Furniture brands", tagline: "Stage your collections inside real homes.", text: "Step out of the showroom. Showcase your pieces in lived-in, contextualized interiors that can be shared in one click. Every tour becomes a purchase trigger and a qualified lead channel.", benefit: "Higher purchase intent, less friction." },
              { icon: Building2, name: "Real estate agencies", tagline: "Sell the potential, not the current state.", text: "An empty apartment is hard to fall in love with. The same property, staged in a style that matches the buyer profile, becomes desirable. Your listings stand out and your time-to-close drops.", benefit: "Properties that rent and sell faster." },
              { icon: HardHat, name: "Property developers", tagline: "Tour the property before it's built.", text: "Your new developments come to life before construction is done. Buyers explore their future home, guided live by an advisor in avatar form — from anywhere in the world.", benefit: "Sell off-plan, without the plans." },
            ].map((c) => (
              <div key={c.name} className="flex flex-col rounded-3xl border border-landing-line bg-white p-7 shadow-sm transition-all hover:border-landing-lineHov hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-landing-violet/10 text-landing-violet">
                  <c.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-landing-ink">{c.name}</h3>
                <p className="mt-1.5 text-base font-semibold text-landing-ink/80">{c.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-landing-body">{c.text}</p>
                <div className="mt-5 flex items-center gap-2 border-t border-landing-line pt-4 text-sm font-semibold text-landing-ctaBlue">
                  <ArrowRight className="h-4 w-4 shrink-0" />
                  {c.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="process" className="bg-landing-paper py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <Eyebrow>The process</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-[30px] font-bold leading-tight text-landing-ink sm:text-4xl">
            From capture to closing, in <Hi>four steps</Hi>.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ScanLine, n: "01", t: "Capture", d: "A Matterport scan, a 360 video, or the floor plans of your development. Any starting point works." },
              { icon: Wand2, n: "02", t: "Staging", d: "Our team designs the virtual staging — style direction, furniture, ambiance. You review and approve each room." },
              { icon: Share2, n: "03", t: "Immersive tour", d: "Your clients receive a link. They explore the property at their own pace, on any device. No installation required." },
              { icon: Video, n: "04", t: "Hub & Avatar", d: "On demand, an advisor joins them live inside the tour. The conversation happens in the property — not in a video call." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl border border-landing-line bg-landing-mist p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-landing-ctaBlue shadow-sm">
                    <s.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-4xl font-black text-landing-ctaBlue/15">{s.n}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-landing-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-landing-body">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Dark demo band ===== */}
      <section className="relative overflow-hidden bg-landing-deepNavy py-16">
        <Angular className="left-8 top-6 h-20 opacity-90" />
        <Angular className="bottom-6 right-8 h-20 opacity-90" />
        <div className="relative mx-auto max-w-[900px] px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Open the platform</h2>
          <p className="mx-auto mt-4 max-w-xl text-landing-muted">
            Get instant access to the platform and explore it on your own properties or collections.
          </p>
          <Link href="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-full bg-landing-ctaBlue px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-landing-ctaHover">
            Open the platform <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ===== Why VR Boost Agency ===== */}
      <section className="bg-landing-mist py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <Eyebrow>Our difference</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-[30px] font-bold leading-tight text-landing-ink sm:text-4xl">
            The detail is what makes it <Hi>premium</Hi>.
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              { t: "Crafted, never templated.", d: "Every staging is composed by hand by our team. No presets, no generic renders — the eye sees the difference in two seconds." },
              { t: "Designed around your brand.", d: "Your collections, your codes, your art direction. The staging adapts to your world, not the other way around." },
              { t: "Genuinely human, genuinely remote.", d: "Hub & Avatar doesn't replace your sales advisor — it gives them a new place to work from." },
            ].map((b) => (
              <div key={b.t}>
                <div className="mb-4 h-1 w-10 rounded-full bg-landing-ctaBlue" />
                <h3 className="font-display text-xl font-bold text-landing-ink">{b.t}</h3>
                <p className="mt-3 text-base leading-relaxed text-landing-body">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section id="demo" className="bg-landing-paper py-20 sm:py-28">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="relative overflow-hidden rounded-[32px] border border-landing-line bg-landing-cloud px-8 py-16 text-center shadow-sm">
            <Angular className="left-6 top-6 h-16 opacity-80" />
            <Angular className="bottom-6 right-6 h-16 opacity-80" />
            <h2 className="font-display text-[30px] font-bold leading-tight text-landing-ink sm:text-4xl">
              See it for yourself.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-landing-body">
              Fifteen minutes is all it takes to understand what the platform can do for
              your properties, your collections, or your developments.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-landing-ctaBlue px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-landing-ctaBlue/25 transition-colors hover:bg-landing-ctaHover">
                Open the platform <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="mailto:hello@vrboost.agency" className="inline-flex items-center gap-2 rounded-full border border-landing-line bg-white px-7 py-3.5 text-sm font-bold text-landing-ink transition-colors hover:border-landing-lineHov">
                Request a use case
              </a>
            </div>
            <p className="mt-8 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-landing-dim">
              <Check className="h-3.5 w-3.5 text-landing-teal" /> Demo tailored to your industry — no commitment
            </p>
          </div>
        </div>
      </section>

      {/* ===== Footer (dark) ===== */}
      <footer className="bg-landing-abyss py-14 text-landing-clair">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <Link href="/" className="leading-none">
                <span className="font-display text-xl tracking-tight text-white">
                  VR<span className="font-normal">boost</span>
                </span>
                <span className="block text-[8px] font-bold uppercase tracking-[0.4em] text-landing-muted">Agency</span>
              </Link>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-landing-muted">Solution</p>
              <ul className="mt-4 space-y-2.5 text-sm text-landing-dim">
                <li><Link href="/projects" className="transition-colors hover:text-white">Home Staging</Link></li>
                <li><Link href="/hub" className="transition-colors hover:text-white">Hub &amp; Avatar</Link></li>
                <li><Link href="/catalog" className="transition-colors hover:text-white">Furniture Catalog</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-landing-muted">Industries</p>
              <ul className="mt-4 space-y-2.5 text-sm text-landing-dim">
                <li>Furniture</li>
                <li>Real Estate</li>
                <li>Property Development</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-landing-muted">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-landing-dim">
                <li><a href="mailto:hello@vrboost.agency" className="inline-flex items-center gap-2 transition-colors hover:text-white"><Mail className="h-4 w-4" /> hello@vrboost.agency</a></li>
                <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white"><Linkedin className="h-4 w-4" /> LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-landing-borderDef pt-6 text-xs text-landing-dim">
            VR Boost Agency — mini-MVP demo
          </div>
        </div>
      </footer>
    </div>
  );
}
