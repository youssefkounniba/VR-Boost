"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Video, Armchair, Wrench, UserRound, Users, Plus, X } from "lucide-react";

const navigation = [
  { nom: "Dashboard", href: "/dashboard", icone: LayoutGrid },
  { nom: "Virtual visits", href: "/projets", icone: Video },
  { nom: "Furniture Catalog", href: "/catalogue", icone: Armchair },
  { nom: "Staging", href: "/staging", icone: Wrench },
  { nom: "Hub & Avatar", href: "/hub", icone: UserRound, badge: 3 },
  { nom: "Team", href: "/team", icone: Users },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

function NavLinks({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const actif =
          pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
              actif
                ? "bg-gray-800 text-white"
                : "text-ardoise hover:bg-white/50 hover:text-encre"
            }`}
          >
            <item.icone className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span className="flex-1">{item.nom}</span>
            {item.badge ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function CtaCard({ onClose }: { onClose?: () => void }) {
  return (
    <div className="carte mt-auto p-4 text-center">
      <p className="text-xs font-semibold leading-relaxed text-ardoise">
        Creating or adding new virtual visits couldn&apos;t be easier
      </p>
      <Link
        href="/projets/nouveau"
        onClick={onClose}
        className="btn-noir mt-3 w-full text-xs"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        New visit
      </Link>
    </div>
  );
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="panneau hidden w-56 shrink-0 flex-col p-3 lg:flex">
        <NavLinks pathname={pathname} />
        <CtaCard />
      </aside>

      {/* Mobile backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile drawer */}
      <aside
        className={`panneau fixed inset-y-0 left-0 z-50 flex w-72 flex-col p-3 transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between px-1">
          <span className="text-base font-extrabold tracking-tight">
            VR<span className="font-normal">boost</span>
          </span>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-encre shadow-carte transition-colors hover:bg-champ"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <NavLinks pathname={pathname} onClose={onClose} />
        <CtaCard onClose={onClose} />
      </aside>
    </>
  );
}
