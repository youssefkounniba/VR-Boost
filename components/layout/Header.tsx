"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Bell, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import AppearanceModal from "@/components/ui/AppearanceModal";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAppearance, setShowAppearance] = useState(false);
  const router = useRouter();

  return (
    <header className="panel flex h-[72px] items-center justify-between px-5 sm:px-7">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-field lg:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={1.8} />
        </button>

        <Link href="/dashboard" className="leading-none">
          <span className="text-[22px] tracking-tight text-ink">
            roche<span className="font-extrabold">bobois</span>
          </span>
          <span className="block text-[8px] font-semibold uppercase tracking-[0.4em] text-muted">
            Paris
          </span>
        </Link>
      </div>

      <div className="relative flex items-center gap-2">
        <button
          type="button"
          aria-label="Messages"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-field"
        >
          <Mail className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-field"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            1
          </span>
        </button>

        <button
          type="button"
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-field"
        >
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-ink text-sm font-bold text-white">
            A
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-bold leading-tight">Abdelali H.</span>
            <span className="block text-xs text-muted">Admin</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted" strokeWidth={2} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl bg-white py-2 shadow-panel">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-xs font-semibold text-muted">Account</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                  A
                </span>
                <div>
                  <p className="text-sm font-bold">Abdelali Hraich</p>
                  <p className="text-xs text-muted">Abduux.ta@gmail.com</p>
                </div>
              </div>
              <button className="btn-black mt-3 w-full text-xs">
                Manage subscription
              </button>
            </div>
            <div className="border-b border-gray-100 px-2 py-2">
              <p className="px-2 py-1 text-xs font-semibold text-muted">IKEA Maroc</p>
              {["Statistics", "Appearance", "Settings"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === "Appearance") {
                      setDropdownOpen(false);
                      setShowAppearance(true);
                    }
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink hover:bg-field"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="px-2 py-2">
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink hover:bg-field">
                Help ↗
              </button>
              <button
                onClick={() => { setDropdownOpen(false); router.push("/"); }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>

      {showAppearance && (
        <AppearanceModal onClose={() => setShowAppearance(false)} />
      )}
    </header>
  );
}
