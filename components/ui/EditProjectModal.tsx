"use client";

import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import { useProjects } from "@/lib/store/projects-store";
import type { Project, VisitStatus, StagingStyle } from "@/lib/types";
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

const STYLES: StagingStyle[] = [
  "Contemporary Chic",
  "Scandinavian",
  "Minimalist",
  "Industrial",
  "Bohemian",
];

const ROOMS = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Dining room",
  "Home Office",
  "Bathroom",
  "Yard",
  "Other",
];

export default function EditProjectModal({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) {
  const { updateProject } = useProjects();

  const [client, setClient] = useState(project.client);
  const [propertyType, setPropertyType] = useState(project.propertyType);
  const [address, setAddress] = useState(project.address);
  const [surface, setSurface] = useState(String(project.surface));
  const [style, setStyle] = useState<StagingStyle>(project.style);
  const [status, setStatus] = useState<VisitStatus>(project.status);
  const [matterportLink, setMatterportLink] = useState(project.matterportLink);
  const [rooms, setRooms] = useState<string[]>(project.rooms);

  // Re-sync the form whenever the modal is (re)opened for a project.
  useEffect(() => {
    if (!open) return;
    setClient(project.client);
    setPropertyType(project.propertyType);
    setAddress(project.address);
    setSurface(String(project.surface));
    setStyle(project.style);
    setStatus(project.status);
    setMatterportLink(project.matterportLink);
    setRooms(project.rooms);
  }, [open, project]);

  if (!open) return null;

  function toggleRoom(room: string) {
    setRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  }

  const canSave = client.trim().length > 0 && address.trim().length > 0;

  function handleSave() {
    if (!canSave) return;
    updateProject(project.id, {
      client: client.trim(),
      propertyType,
      address: address.trim(),
      surface: Number(surface) || 0,
      style,
      status,
      matterportLink: matterportLink.trim(),
      rooms,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-panel"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center gap-3 bg-ink px-6 py-4">
          <h2 className="text-base font-bold text-white">Edit project</h2>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          {/* Client */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">
              Client name
            </label>
            <input
              className="field border border-gray-200"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Client name"
            />
          </div>

          {/* Address */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">
              Address
            </label>
            <input
              className="field border border-gray-200"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Property type */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-ink">
                Property type
              </label>
              <select
                className="field border border-gray-200"
                value={propertyType}
                onChange={(e) =>
                  setPropertyType(e.target.value as Project["propertyType"])
                }
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Surface */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-ink">
                Surface (m²)
              </label>
              <input
                type="number"
                min={0}
                className="field border border-gray-200"
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                placeholder="0"
              />
            </div>

            {/* Style */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-ink">
                Staging style
              </label>
              <select
                className="field border border-gray-200"
                value={style}
                onChange={(e) => setStyle(e.target.value as StagingStyle)}
              >
                {STYLES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-ink">
                Status
              </label>
              <select
                className="field border border-gray-200"
                value={status}
                onChange={(e) => setStatus(e.target.value as VisitStatus)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Matterport link */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">
              Matterport / 3D tour link
            </label>
            <input
              type="url"
              className="field border border-gray-200"
              value={matterportLink}
              onChange={(e) => setMatterportLink(e.target.value)}
              placeholder="https://my.matterport.com/show/?m=..."
            />
          </div>

          {/* Rooms */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">
              Rooms
            </label>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {ROOMS.map((room) => (
                <label
                  key={room}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={rooms.includes(room)}
                    onChange={() => toggleRoom(room)}
                    className="h-4 w-4 rounded accent-accent"
                  />
                  <span className={rooms.includes(room) ? "font-semibold text-accent" : "text-ink"}>
                    {room}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
          <button type="button" onClick={onClose} className="btn-white">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="btn-blue gap-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
