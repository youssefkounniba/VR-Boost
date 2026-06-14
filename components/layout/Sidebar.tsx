"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Video,
  Armchair,
  Wand2,
  UserRound,
  CalendarDays,
  Users,
  X,
  Zap,
} from "lucide-react";
import ManagePlanModal from "@/components/ui/ManagePlanModal";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Virtual visits", href: "/projects", icon: Video },
  { name: "Furniture Catalog", href: "/catalog", icon: Armchair },
  { name: "Staging", href: "/staging", icon: Wand2 },
  { name: "Hub & Avatar", href: "/hub", icon: UserRound },
  { name: "Schedule", href: "/schedule", icon: CalendarDays, badge: 3 },
  { name: "Team", href: "/team", icon: Users },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

function NavLinks({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose?: () => void;
}) {
  return (
    <nav className="space-y-0.5">
      {navigation.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
              active
                ? "bg-gray-800 text-white"
                : "text-muted hover:bg-field hover:text-ink"
            }`}
          >
            <item.icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
            <span className="flex-1">{item.name}</span>
            {item.badge ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
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
  const [showPlan, setShowPlan] = useState(false);

  return (
    <>
      <div className="card mt-auto p-4 text-center">
        <p className="text-xs font-medium leading-relaxed text-muted">
          Upgrade to our Pro Plan and unlock your full potential today!
        </p>
        <button
          type="button"
          onClick={() => {
            onClose?.();
            setShowPlan(true);
          }}
          className="btn-black mt-3 w-full text-xs"
        >
          <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
          Manage your plan
        </button>
      </div>

      {showPlan && <ManagePlanModal onClose={() => setShowPlan(false)} />}
    </>
  );
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="panel hidden w-56 shrink-0 flex-col p-3 lg:flex">
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
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white p-3 shadow-panel transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between px-1">
          <span className="text-base font-extrabold tracking-tight">
            roche<span className="font-normal">bobois</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-field text-ink transition-colors hover:bg-gray-200"
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
