"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Share2,
  Video,
  Maximize2,
  Ruler,
  DoorOpen,
  Palette,
  CalendarDays,
  Check,
  Copy,
  Pencil,
  Trash2,
} from "lucide-react";
import data from "@/lib/data/data.json";
import StatusBadge from "@/components/ui/StatusBadge";
import EditProjectModal from "@/components/ui/EditProjectModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useProjects } from "@/lib/store/projects-store";
import type { FurnitureItem } from "@/lib/types";

/**
 * Project detail / preview + Hub & Avatar.
 * Embedded 3D tour (Matterport), selected style + staged furniture,
 * "Share" button and a simulated "Join Hub & Avatar" action.
 */

// Public Matterport demo — a real 3D tour for a credible render.
const MATTERPORT_DEMO = "https://my.matterport.com/show/?m=SxQL3iGyoDo";

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { getProject, deleteProject, ready } = useProjects();
  const project = getProject(params.id);
  const [copied, setCopied] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // While redirecting after a delete the project is already gone — render
  // nothing instead of falling through to notFound().
  if (deleting) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted">
        Deleting…
      </div>
    );
  }

  // Wait for the store to hydrate from localStorage before deciding a freshly
  // created project doesn't exist.
  if (!ready && !project) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted">
        Loading project…
      </div>
    );
  }

  if (!project) notFound();

  // A few "selected" furniture pieces for this project (mock from the catalog).
  const stagedItems = (data.items as FurnitureItem[]).slice(0, 4);

  function confirmDelete() {
    if (!project) return;
    setConfirmOpen(false);
    setDeleting(true);
    deleteProject(project.id);
    router.push("/projects");
  }

  async function handleShare() {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://vr-boost.app/projects/${params.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard unavailable — show the toast anyway */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  const details = [
    { icon: Ruler, label: "Surface", value: `${project.surface} m²` },
    { icon: Palette, label: "Style", value: project.style },
    { icon: DoorOpen, label: "Rooms", value: `${project.rooms.length} rooms` },
    {
      icon: CalendarDays,
      label: "Created",
      value: new Date(project.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    },
  ];

  return (
    <div>
      {/* Back link */}
      <Link
        href="/projects"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to visits
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="text-xl font-extrabold sm:text-2xl">
              {project.client}, {project.propertyType}
            </h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-1 text-sm text-muted">{project.address}</p>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:flex-wrap">
          <button
            type="button"
            onClick={handleShare}
            className="btn-white col-span-2 w-full sm:w-auto"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
            {copied ? "Link copied" : "Share project"}
          </button>
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="btn-white w-full sm:w-auto"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="btn-white w-full text-red-500 hover:bg-red-50 sm:w-auto"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
          <Link href="/hub" className="btn-blue col-span-2 w-full sm:w-auto">
            <Video className="h-4 w-4" />
            Join Hub &amp; Avatar visit
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* 3D viewer */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-field">
                  <Maximize2 className="h-3.5 w-3.5 text-ink" />
                </span>
                <p className="text-sm font-bold">3D Virtual Tour</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Live preview
              </span>
            </div>

            <div className="relative aspect-video w-full bg-ink">
              <iframe
                src={MATTERPORT_DEMO}
                title={`3D tour — ${project.client}`}
                className="absolute inset-0 h-full w-full"
                allow="fullscreen; xr-spatial-tracking"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <p className="px-4 py-2.5 text-xs text-faint">
              Simulated Matterport tour · drag to look around, scroll to zoom.
            </p>
          </div>

          {/* Selected furniture */}
          <div className="card mt-5 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Selected furniture</h2>
              <Link
                href="/catalog"
                className="text-xs font-semibold text-accent hover:underline"
              >
                Browse catalog
              </Link>
            </div>
            <p className="mt-0.5 text-xs text-muted">
              Pieces staged for the {project.style} style.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stagedItems.map((item) => (
                <div key={item.id} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-field">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 200px"
                    />
                  </div>
                  <p className="mt-2 truncate text-sm font-semibold">
                    {item.name}
                  </p>
                  <div className="mt-1 flex gap-1">
                    {item.colors.map((c) => (
                      <span
                        key={c}
                        className="h-3 w-3 rounded-full border border-black/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar — details + assignees */}
        <div className="space-y-5">
          {/* Cover */}
          <div className="card overflow-hidden p-0">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={project.image}
                alt={`${project.client} — ${project.propertyType}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>

          {/* Details */}
          <div className="card p-5">
            <h2 className="text-base font-bold">Project details</h2>
            <dl className="mt-4 space-y-3">
              {details.map((d) => (
                <div key={d.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-field">
                    <d.icon className="h-4 w-4 text-ink" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-muted">{d.label}</dt>
                    <dd className="truncate text-sm font-semibold">
                      {d.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="my-4 h-px bg-gray-100" />

            <p className="text-xs text-muted">Rooms scanned</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.rooms.map((room) => (
                <span
                  key={room}
                  className="rounded-full bg-field px-3 py-1 text-xs font-semibold text-ink"
                >
                  {room}
                </span>
              ))}
            </div>
          </div>

          {/* Team */}
          {project.assignees && project.assignees.length > 0 && (
            <div className="card p-5">
              <h2 className="text-base font-bold">Assigned team</h2>
              <div className="mt-3 flex -space-x-2">
                {project.assignees.map((av, i) => (
                  <span
                    key={i}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${av.color}`}
                  >
                    {av.initial}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Matterport link */}
          <div className="card p-5">
            <h2 className="text-base font-bold">Source scan</h2>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-field px-3 py-2.5">
              <p className="min-w-0 flex-1 truncate text-xs text-muted">
                {project.matterportLink}
              </p>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Copy link"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white hover:text-ink"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <EditProjectModal
        project={project}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete project"
        message={`Delete project ${project.id} (${project.client})? This action cannot be undone.`}
        confirmLabel="Delete project"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-panel">
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-green-400" />
            Project link copied to clipboard
          </span>
        </div>
      )}
    </div>
  );
}
