"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Search,
  ChevronDown,
  RotateCcw,
  RotateCw,
  Trash2,
  Play,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import data from "@/lib/data/data.json";
import type { FurnitureItem } from "@/lib/types";

const ROOM_BG =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80";

export default function StagingPage() {
  const items = data.items as FurnitureItem[];
  const [search, setSearch] = useState("");
  const [selectedCat] = useState("All");
  const [placed, setPlaced] = useState<FurnitureItem | null>(items[0]);

  const filtered = items.filter(
    (a) =>
      (selectedCat === "All" || a.categoryId === "c-003") &&
      a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-140px)] min-h-[500px] flex-col overflow-hidden rounded-2xl bg-ink">
      {/* Top toolbar */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
        >
          ← Back to home
        </button>

        <div className="mx-3 h-6 w-px bg-white/10" />

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
          A
        </div>
        <span className="text-sm font-semibold text-white">Abdelali Hraich</span>

        <div className="mx-3 h-6 w-px bg-white/10" />

        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:text-white">
          <RotateCcw className="h-4 w-4" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:text-white">
          <RotateCw className="h-4 w-4" />
        </button>

        <div className="mx-2 h-6 w-px bg-white/10" />

        <div className="flex gap-1">
          {["●", "●", "●"].map((dot, i) => (
            <span
              key={i}
              className={`h-6 w-6 rounded-full border-2 ${
                i === 0
                  ? "border-gray-400 bg-gray-600"
                  : i === 1
                    ? "border-gray-300 bg-gray-400"
                    : "border-white bg-white"
              }`}
            />
          ))}
        </div>

        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:text-white">
          <Trash2 className="h-4 w-4" />
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button className="btn-blue text-sm">
            <Share2 className="h-4 w-4" />
            Publish
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20">
            <Play className="h-4 w-4" fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Main stage */}
      <div className="relative flex-1 overflow-hidden">
        {/* Room background */}
        <Image
          src={ROOM_BG}
          alt="Room"
          fill
          className="object-cover opacity-80"
          sizes="100vw"
          priority
        />

        {/* Cursor label */}
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 rounded bg-ink/80 px-2 py-1 text-xs text-white">
          Abdelali Hraich
        </div>

        {/* Placed furniture */}
        {placed && (
          <div className="absolute bottom-32 right-24 flex flex-col items-center">
            <div className="relative h-48 w-48">
              <Image
                src={placed.image}
                alt={placed.name}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="192px"
              />
            </div>
            {/* Transform gizmo lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute h-0.5 w-20 bg-green-400 rotate-90 origin-center" style={{ top: "50%", left: "50%" }} />
              <div className="absolute h-0.5 w-20 bg-red-400 origin-center" style={{ top: "50%", left: "50%" }} />
              <div className="absolute h-0.5 w-20 bg-blue-400 origin-center rotate-45" style={{ top: "50%", left: "50%" }} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom panel */}
      <div className="border-t border-white/10 bg-ink/95 px-4 py-3">
        <div className="mb-3 flex items-center gap-3">
          <label className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              className="w-full rounded-xl bg-white/10 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20">
            Select Category
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPlaced(item)}
              className={`relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                placed?.id === item.id
                  ? "border-white"
                  : "border-transparent hover:border-white/40"
              }`}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="112px"
              />
              <div className="absolute bottom-1 left-1 flex gap-0.5">
                {item.colors.map((c, i) => (
                  <span
                    key={i}
                    className="h-3 w-3 rounded-full border border-white/50"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <button className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded bg-black/50 text-white/70 hover:text-white">
                <MoreHorizontal className="h-3 w-3" />
              </button>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
