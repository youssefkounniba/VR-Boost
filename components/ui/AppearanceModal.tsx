"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Palette, X, Plus, Save, Check } from "lucide-react";

const FONTS = ["Poppins", "Lato", "Roboto", "Inter", "Montserrat", "Open Sans"];

const THEMES: {
  id: string;
  gradient: string;
  primary: string;
  secondary: string;
}[] = [
  {
    id: "sunset",
    gradient: "linear-gradient(140deg,#7C3AED 0%,#9333EA 40%,#C2410C 100%)",
    primary: "#7C3AED",
    secondary: "#C2410C",
  },
  {
    id: "sage",
    gradient: "linear-gradient(140deg,#A7E0C8 0%,#7FC8A4 100%)",
    primary: "#10B981",
    secondary: "#065F46",
  },
  {
    id: "peach",
    gradient: "linear-gradient(140deg,#F8D3A8 0%,#F0B07C 100%)",
    primary: "#F59E0B",
    secondary: "#9A3412",
  },
  {
    id: "slate",
    gradient: "linear-gradient(140deg,#B8C2DA 0%,#9FB0CE 100%)",
    primary: "#4361EE",
    secondary: "#1E293B",
  },
];

export default function AppearanceModal({ onClose }: { onClose: () => void }) {
  const [logo, setLogo] = useState<string | null>(null);
  const [primary, setPrimary] = useState("#F8D114");
  const [secondary, setSecondary] = useState("#05348C");
  const [font, setFont] = useState("Poppins");
  const [theme, setTheme] = useState("slate");
  const [domain, setDomain] = useState("");
  const [saved, setSaved] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  }

  function selectTheme(t: (typeof THEMES)[number]) {
    setTheme(t.id);
    setPrimary(t.primary);
    setSecondary(t.secondary);
  }

  function handleSave() {
    // No backend — simulate persistence with a brief confirmation.
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 900);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-panel"
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-ink px-6 py-4">
          <Palette className="h-5 w-5 text-white" />
          <h2 className="text-lg font-bold text-white">Appearance</h2>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-[#F4F5F7] p-6">
          {/* Brand Logo */}
          <p className="text-sm font-bold text-ink">Brand Logo</p>
          <p className="mb-3 text-sm text-muted">Upload your logo (optional):</p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white px-6 py-10 text-center transition-colors hover:border-accent"
          >
            {logo ? (
              <span className="relative h-20 w-40">
                <Image
                  src={logo}
                  alt="Logo preview"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </span>
            ) : (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-muted">
                  <Plus className="h-5 w-5" />
                </span>
                <p className="text-sm text-muted">
                  Drag and drop or{" "}
                  <span className="font-semibold text-accent underline">
                    click to select an image
                  </span>
                </p>
                <p className="text-xs text-faint">
                  Supported formats: PNG, JPG, SVG. Max size: 10 MB.
                </p>
              </>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />

          {/* Colors + font */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-bold text-ink">Primary color</p>
              <p className="mb-2 text-xs text-muted">Select your color:</p>
              <ColorField value={primary} onChange={setPrimary} />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Secondary color</p>
              <p className="mb-2 text-xs text-muted">Select your color:</p>
              <ColorField value={secondary} onChange={setSecondary} />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Font Style</p>
              <p className="mb-2 text-xs text-muted">Select font:</p>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="field border border-gray-200 bg-white"
              >
                {FONTS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="my-6 h-px bg-gray-200" />

          {/* Color themes */}
          <p className="text-sm font-bold text-ink">Color themes</p>
          <p className="mb-3 text-xs text-muted">
            Select from the premade themes:
          </p>
          <div className="flex flex-wrap gap-4">
            {THEMES.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Theme ${t.id}`}
                  onClick={() => selectTheme(t)}
                  className={`relative h-16 w-16 rounded-full transition-transform hover:scale-105 ${
                    active ? "ring-2 ring-accent ring-offset-2" : ""
                  }`}
                  style={{ background: t.gradient }}
                >
                  {active && (
                    <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="my-6 h-px bg-gray-200" />

          {/* Website Domain */}
          <p className="text-sm font-bold text-ink">Website Domain</p>
          <p className="mb-2 text-xs text-muted">Enter your domain name:</p>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Example : example.com"
            className="field border border-gray-200 bg-white"
          />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-white px-6 py-4">
          <button
            type="button"
            onClick={handleSave}
            className="btn-black w-full justify-center gap-2"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ColorField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
      <span
        className="h-7 w-7 shrink-0 rounded-md border border-black/10"
        style={{ backgroundColor: value }}
      />
      <span className="text-sm font-semibold text-ink">
        {value.toUpperCase()}
      </span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
      />
    </label>
  );
}
