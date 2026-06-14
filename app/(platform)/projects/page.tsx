"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Plus,
  MapPin,
  MoreHorizontal,
  Pencil,
  Archive,
  Trash2,
  X,
} from "lucide-react";
import { useProjects } from "@/lib/store/projects-store";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EditProjectModal from "@/components/ui/EditProjectModal";
import type { VisitStatus, Project } from "@/lib/types";
import { STATUS_LABELS, STATUS_COLORS, STATUS_DOT } from "@/lib/types";

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

export default function ProjectsPage() {
  const { projects, deleteProject, updateProject } = useProjects();

  const [editProject, setEditProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<VisitStatus[]>([]);
  const [typeFilter, setTypeFilter] = useState<Project["propertyType"][]>([]);
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (filterRef.current && !filterRef.current.contains(target)) {
        setFilterOpen(false);
      }
      // Leave the row menu alone when the click is its toggle or inside the
      // open menu — those are handled by their own onClick. (stopPropagation
      // can't help here: React's delegated listener shares the document node
      // with this one, so it would still fire.)
      if (
        !target.closest("[data-action-toggle]") &&
        !target.closest("[data-action-menu]")
      ) {
        setMenuOpen(null);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      if (p.archived) return false;
      const matchesSearch =
        !q ||
        p.client.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.id.includes(q);
      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(p.status);
      const matchesType =
        typeFilter.length === 0 || typeFilter.includes(p.propertyType);
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [projects, search, statusFilter, typeFilter]);

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

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative flex-1 basis-64">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            className="field pl-11"
            placeholder="Search by client, address or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        {/* Filter popover */}
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
              className="absolute right-0 top-full z-30 mt-2 w-64 rounded-xl bg-white p-4 shadow-panel"
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

        <Link href="/projects/new" className="btn-black">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          + New visit
        </Link>
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

      {/* Table */}
      <div className="card mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
            <tr className="border-b border-gray-100">
              <th className="w-10 p-4">
                <input type="checkbox" className="h-4 w-4 rounded" />
              </th>
              <th className="p-4 text-left font-semibold text-muted">ID</th>
              <th className="p-4 text-left font-semibold text-muted">
                Property
              </th>
              <th className="p-4 text-left font-semibold text-muted">Status</th>
              <th className="p-4 text-left font-semibold text-muted">
                Assigned
              </th>
              <th className="w-12 p-4" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b border-gray-50 transition-colors hover:bg-field/50"
              >
                <td className="p-4">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                </td>
                <td className="p-4 font-semibold text-muted">{p.id}</td>
                <td className="p-4">
                  <Link
                    href={`/projects/${p.id}`}
                    className="flex items-center gap-3"
                  >
                    <div className="relative h-14 w-[72px] shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80">
                          <svg
                            className="h-3 w-3 text-ink"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M6 3l7 5-7 5V3z" />
                          </svg>
                        </span>
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-ink">
                        {p.client}, {p.propertyType}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {p.address}
                      </p>
                      <p className="mt-0.5 text-xs text-faint">
                        {p.rooms.join(", ")}
                      </p>
                    </div>
                  </Link>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[p.status]}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[p.status]}`}
                    />
                    {STATUS_LABELS[p.status]}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex -space-x-2">
                    {(p.assignees ?? []).map((av, i) => (
                      <span
                        key={i}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white ${av.color}`}
                      >
                        {av.initial}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <button
                    type="button"
                    data-action-toggle
                    onClick={(e) => {
                      if (menuOpen === p.id) {
                        setMenuOpen(null);
                        return;
                      }
                      // Anchor a fixed-position menu to the button so it isn't
                      // clipped by the table's scroll container.
                      const r = e.currentTarget.getBoundingClientRect();
                      const menuH = 96;
                      const top =
                        r.bottom + 4 + menuH > window.innerHeight
                          ? r.top - menuH - 4
                          : r.bottom + 4;
                      setMenuPos({ top, left: Math.max(8, r.right - 160) });
                      setMenuOpen(p.id);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-field"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {menuOpen === p.id && menuPos && (
                    <div
                      data-action-menu
                      style={{
                        position: "fixed",
                        top: menuPos.top,
                        left: menuPos.left,
                      }}
                      className="z-50 w-40 rounded-xl bg-white py-1 shadow-panel"
                    >
                      <button
                        onClick={() => {
                          setEditProject(p);
                          setMenuOpen(null);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-field"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit details
                      </button>
                      <button
                        onClick={() => {
                          updateProject(p.id, { archived: true });
                          setMenuOpen(null);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-field"
                      >
                        <Archive className="h-3.5 w-3.5" />
                        Archive
                      </button>
                      <button
                        onClick={() => {
                          setPendingDelete(p);
                          setMenuOpen(null);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-12 text-center">
                  <p className="text-sm font-semibold text-ink">
                    No visits found
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {projects.length === 0
                      ? "Create your first virtual visit to get started."
                      : "Try adjusting your search or filters."}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete project"
        message={
          pendingDelete
            ? `Delete project ${pendingDelete.id} (${pendingDelete.client})? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete project"
        onConfirm={() => {
          if (pendingDelete) deleteProject(pendingDelete.id);
          setPendingDelete(null);
        }}
        onCancel={() => setPendingDelete(null)}
      />

      {/* Edit details */}
      {editProject && (
        <EditProjectModal
          project={editProject}
          open={editProject !== null}
          onClose={() => setEditProject(null)}
        />
      )}
    </div>
  );
}
