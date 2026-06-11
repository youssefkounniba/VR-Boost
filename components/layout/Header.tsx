"use client";

import Link from "next/link";
import { Mail, Bell, ChevronDown, Menu } from "lucide-react";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="panneau flex h-auto items-center justify-between px-4 py-4 sm:px-6 lg:h-[100px] lg:py-0">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={onMenuToggle}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-encre shadow-carte transition-colors hover:bg-champ lg:hidden"
        >
          <Menu className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>

        <Link href="/" className="leading-none">
          <span className="text-2xl tracking-tight">
            roche<span className="font-extrabold">bobois</span>
          </span>
          <span className="block text-[9px] font-semibold uppercase tracking-[0.35em] text-ardoise">
            Paris
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Messagerie"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-encre shadow-carte transition-colors hover:bg-champ"
        >
          <Mail className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-encre shadow-carte transition-colors hover:bg-champ"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            1
          </span>
        </button>

        <span className="mx-1 h-6 w-px bg-black/10" aria-hidden />

        <button type="button" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-encre text-sm font-bold text-white">
            M
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-bold leading-tight">Mehdi</span>
            <span className="block text-xs text-ardoise">Admin</span>
          </span>
          <ChevronDown className="h-4 w-4 text-ardoise" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
