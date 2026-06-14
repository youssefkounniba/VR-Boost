"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "The solution", href: "#solution" },
  { label: "Who it's for", href: "#audience" },
  { label: "How it works", href: "#process" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-landing-line bg-landing-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link href="/" className="leading-none">
          <span className="font-display text-xl tracking-tight text-landing-ink">
            VR<span className="font-normal">boost</span>
          </span>
          <span className="block text-[8px] font-bold uppercase tracking-[0.4em] text-landing-ctaBlue">
            Agency
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-landing-body md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-landing-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          href="/dashboard"
          className="rounded-full bg-landing-ctaBlue px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-landing-ctaHover"
        >
          Open the platform
        </Link>
      </div>
    </header>
  );
}
