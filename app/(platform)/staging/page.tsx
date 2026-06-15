"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  RotateCcw,
  RotateCw,
  Trash2,
  Play,
  Share2,
  MoreHorizontal,
  ArrowLeft,
  MapPin,
  SlidersHorizontal,
  Plus,
  MessageCircle,
  Hand,
  X,
} from "lucide-react";
import data from "@/lib/data/data.json";
import type {
  FurnitureItem,
  FurnitureCategory,
  Project,
  VisitStatus,
} from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";

const STATUSES: VisitStatus[] = [
  "not_started",
  "pending",
  "scanning",
  "in_progress",
  "completed",
];

const TYPES: Project["propertyType"][] = [
  "Apartment",
  "House",
  "Villa",
  "Office",
];

// Two distinct empty rooms so v1 / v2 read as different scenes.
const ROOM_V1 =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80";
const ROOM_V2 =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80";

type View = "gallery" | "v1" | "v2";

type Transform = {
  pos: [string, string, string];
  rot: [string, string, string];
  scale: [string, string, string];
};

const DEFAULT_TRANSFORM: Transform = {
  pos: ["2.928937", "0.238937", "2.2239887"],
  rot: ["2.928937", "0.238937", "2.2239887"],
  scale: ["2.928937", "0.238937", "2.2239887"],
};

export default function StagingPage() {
  const items = data.items as FurnitureItem[];
  const categories = data.categories as FurnitureCategory[];
  const projects = data.projects as Project[];

  const [view, setView] = useState<View>("gallery");
  const [search, setSearch] = useState("");
  const [gallerySearch, setGallerySearch] = useState("");
  const [categoryId, setCategoryId] = useState<string>("all");
  const [placed, setPlaced] = useState<FurnitureItem | null>(null);
  const [transform, setTransform] = useState<Transform>(DEFAULT_TRANSFORM);

  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<VisitStatus[]>([]);
  const [typeFilter, setTypeFilter] = useState<Project["propertyType"][]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const filtered = items.filter(
    (a) =>
      (categoryId === "all" || a.categoryId === categoryId) &&
      a.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeFilters = statusFilter.length + typeFilter.length;

  function toggleStatus(s: VisitStatus) {
    setStatusFilter((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }
  function toggleType(t: Project["propertyType"]) {
    setTypeFilter((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }
  function clearFilters() {
    setStatusFilter([]);
    setTypeFilter([]);
  }

  const galleryProjects = projects.filter((p) => {
    const matchesSearch = `${p.client} ${p.propertyType} ${p.address}`
      .toLowerCase()
      .includes(gallerySearch.toLowerCase());
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(p.status);
    const matchesType =
      typeFilter.length === 0 || typeFilter.includes(p.propertyType);
    return matchesSearch && matchesStatus && matchesType;
  });

  function openEditor() {
    if (!placed) setPlaced(items[0]);
    setView("v1");
  }

  // ----------------------------------------------------------------- Gallery
  if (view === "gallery") {
    return (
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative flex-1 basis-64">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              className="field pl-11"
              placeholder="Search..."
              value={gallerySearch}
              onChange={(e) => setGallerySearch(e.target.value)}
            />
          </label>

          <div className="relative" ref={filterRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFilterOpen((o) => !o);
              }}
              className="btn-white gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {activeFilters > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white">
                  {activeFilters}
                </span>
              )}
            </button>

            {filterOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 top-full z-30 mt-2 w-64 max-w-[calc(100vw-2.5rem)] rounded-xl bg-white p-4 shadow-panel sm:left-auto sm:right-0"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-ink">Filters</p>
                  {activeFilters > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs font-semibold text-accent hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <p className="mb-2 mt-3 text-xs font-semibold text-muted">
                  Status
                </p>
                <div className="space-y-1.5">
                  {STATUSES.map((s) => (
                    <label
                      key={s}
                      className="flex cursor-pointer items-center gap-2 text-sm text-ink"
                    >
                      <input
                        type="checkbox"
                        checked={statusFilter.includes(s)}
                        onChange={() => toggleStatus(s)}
                        className="h-4 w-4 rounded accent-accent"
                      />
                      {STATUS_LABELS[s]}
                    </label>
                  ))}
                </div>

                <p className="mb-2 mt-4 text-xs font-semibold text-muted">
                  Property type
                </p>
                <div className="space-y-1.5">
                  {TYPES.map((t) => (
                    <label
                      key={t}
                      className="flex cursor-pointer items-center gap-2 text-sm text-ink"
                    >
                      <input
                        type="checkbox"
                        checked={typeFilter.includes(t)}
                        onChange={() => toggleType(t)}
                        className="h-4 w-4 rounded accent-accent"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilters > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {statusFilter.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleStatus(s)}
                className="inline-flex items-center gap-1 rounded-full bg-field px-3 py-1 text-xs font-semibold text-ink hover:bg-gray-200"
              >
                {STATUS_LABELS[s]}
                <X className="h-3 w-3" />
              </button>
            ))}
            {typeFilter.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggleType(t)}
                className="inline-flex items-center gap-1 rounded-full bg-field px-3 py-1 text-xs font-semibold text-ink hover:bg-gray-200"
              >
                {t}
                <X className="h-3 w-3" />
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {galleryProjects.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={openEditor}
              className="group card overflow-hidden p-0 text-left transition-shadow hover:shadow-panel"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={p.image}
                  alt={`${p.client} — ${p.propertyType}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 50vw, 280px"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-transform group-hover:scale-105">
                    <Play className="ml-0.5 h-5 w-5 text-ink" fill="currentColor" />
                  </span>
                </span>
              </div>
              <div className="p-3">
                <p className="truncate font-bold text-ink">
                  {p.client}, {p.propertyType}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">{p.address}</span>
                </p>
                <p className="mt-0.5 truncate text-xs text-faint">
                  {p.rooms.join(", ")}
                </p>
              </div>
            </button>
          ))}

          {galleryProjects.length === 0 && (
            <div className="col-span-full py-16 text-center text-sm text-muted">
              No visits match your search or filters.
            </div>
          )}
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------ Editor
  const isV2 = view === "v2";

  return (
    <div className="flex h-full min-h-[560px] flex-col overflow-hidden rounded-2xl bg-ink">
      {/* Top toolbar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        {isV2 ? (
          <>
            <button
              type="button"
              onClick={() => setView("v1")}
              aria-label="Add furniture"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-blue-600"
            >
              <Plus className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <Divider />
            <ToolButton aria-label="Comments">
              <MessageCircle className="h-4 w-4" />
            </ToolButton>
            <ToolButton aria-label="Pan">
              <Hand className="h-4 w-4" />
            </ToolButton>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setView("gallery")}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </button>
            <Divider />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
              A
            </div>
            <span className="hidden text-sm font-semibold text-white sm:block">
              Abdelali Hraich
            </span>
          </>
        )}

        <Divider />

        <ToolButton aria-label="Undo">
          <RotateCcw className="h-4 w-4" />
        </ToolButton>
        <ToolButton aria-label="Redo">
          <RotateCw className="h-4 w-4" />
        </ToolButton>

        <Divider />

        <span className="text-sm font-semibold text-white/80">100%</span>

        <Divider />

        <div className="flex gap-1.5">
          {["bg-gray-600", "bg-gray-400", "bg-white"].map((c, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Tone ${i + 1}`}
              className={`h-6 w-6 rounded-full border-2 border-white/40 ${c}`}
            />
          ))}
        </div>

        <ToolButton aria-label="Delete" className="text-red-400 hover:text-red-300">
          <Trash2 className="h-4 w-4" />
        </ToolButton>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" className="btn-blue text-sm">
            <Share2 className="h-4 w-4" />
            Publish
          </button>
          <button
            type="button"
            aria-label="Preview"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <Play className="h-4 w-4" fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Main stage */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          key={isV2 ? "v2" : "v1"}
          src={isV2 ? ROOM_V2 : ROOM_V1}
          alt="Room"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Collaborator cursor label */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 flex -translate-x-1/2 items-center gap-1.5">
          <span className="h-2 w-2 rotate-45 bg-white" />
          <span className="rounded-md bg-ink/90 px-2 py-1 text-xs font-medium text-white">
            Abdelali Hraich
          </span>
        </div>

        {/* Placed furniture + transform gizmo */}
        {placed && (
          <div
            className={`absolute ${
              isV2 ? "bottom-24 left-1/2 -translate-x-1/2" : "bottom-32 right-24"
            }`}
          >
            <div className="relative h-52 w-52">
              <Image
                src={placed.image}
                alt={placed.name}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="208px"
              />
              <Gizmo />
            </div>
          </div>
        )}

        {/* v2 — transform panel */}
        {isV2 && (
          <div className="absolute right-5 top-5 w-72 rounded-2xl bg-white/95 p-5 shadow-panel backdrop-blur">
            <h3 className="text-base font-bold text-ink">Transform:</h3>
            <p className="mt-1 text-xs text-muted">
              Adjust the position, rotation, and scale of the object.
            </p>
            <div className="my-3 h-px bg-gray-100" />
            <TransformRow
              label="Position"
              values={transform.pos}
              onChange={(i, v) =>
                setTransform((t) => ({ ...t, pos: replace(t.pos, i, v) }))
              }
            />
            <TransformRow
              label="Rotation"
              values={transform.rot}
              onChange={(i, v) =>
                setTransform((t) => ({ ...t, rot: replace(t.rot, i, v) }))
              }
            />
            <TransformRow
              label="Scale"
              values={transform.scale}
              onChange={(i, v) =>
                setTransform((t) => ({ ...t, scale: replace(t.scale, i, v) }))
              }
            />
          </div>
        )}
      </div>

      {/* v1 — furniture picker */}
      {!isV2 && (
        <div className="border-t border-white/10 bg-ink/95 px-4 py-3">
          <div className="mb-3 flex items-center gap-3">
            <label className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                className="w-full rounded-xl bg-white/10 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <div className="relative">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="appearance-none rounded-xl bg-white/10 py-2 pl-3 pr-9 text-sm font-semibold text-white focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                <option value="all" className="text-ink">
                  Select Category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="text-ink">
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`group relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                  placed?.id === item.id
                    ? "border-white"
                    : "border-transparent hover:border-white/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setPlaced(item);
                    setTransform(DEFAULT_TRANSFORM);
                    setView("v2");
                  }}
                  className="absolute inset-0"
                  aria-label={`Place ${item.name}`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </button>
                <div className="pointer-events-none absolute bottom-1 left-1 flex gap-0.5">
                  {item.colors.map((c, i) => (
                    <span
                      key={i}
                      className="h-3 w-3 rounded-full border border-white/50"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded bg-black/50 text-white/70">
                  <MoreHorizontal className="h-3 w-3" />
                </span>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="py-8 text-sm text-white/50">
                No furniture matches your search.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ helpers */

function replace(
  arr: [string, string, string],
  i: number,
  v: string
): [string, string, string] {
  const next = [...arr] as [string, string, string];
  next[i] = v;
  return next;
}

function Divider() {
  return <div className="mx-2 h-6 w-px bg-white/10" />;
}

function ToolButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

function Gizmo() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-end justify-center">
      <div className="relative h-16 w-16">
        {/* up (green) */}
        <span className="absolute bottom-1/2 left-1/2 h-12 w-0.5 -translate-x-1/2 bg-green-400" />
        {/* base ring */}
        <span className="absolute bottom-0 left-1/2 h-6 w-16 -translate-x-1/2 rounded-[50%] border-2 border-black/50" />
        {/* x (red) / z (blue) */}
        <span className="absolute bottom-2 left-1/2 h-0.5 w-14 -translate-x-1/2 -rotate-12 bg-red-400" />
        <span className="absolute bottom-2 left-1/2 h-0.5 w-14 -translate-x-1/2 rotate-12 bg-blue-400" />
      </div>
    </div>
  );
}

function TransformRow({
  label,
  values,
  onChange,
}: {
  label: string;
  values: [string, string, string];
  onChange: (index: number, value: string) => void;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-1.5 text-sm font-semibold text-ink">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {(["X", "Y", "Z"] as const).map((axis, i) => (
          <label key={axis} className="block">
            <span className="mb-1 block text-[11px] text-muted">{axis}</span>
            <input
              value={values[i]}
              onChange={(e) => onChange(i, e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-xs text-muted focus:border-accent focus:outline-none"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
