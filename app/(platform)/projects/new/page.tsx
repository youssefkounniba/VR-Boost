"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProjects } from "@/lib/store/projects-store";
import type { StagingStyle } from "@/lib/types";
import {
  Home,
  X,
  ScanLine,
  Link2,
  User,
  Phone,
  Mail,
  MapPin,
  Plus,
  Check,
} from "lucide-react";

type ScanMethod = "new" | "matterport";
type Step = 1 | 2 | 3;

const ROOMS = [
  "All",
  "Bedroom",
  "Kitchen",
  "Dining room",
  "Home Office",
  "Bathroom",
  "Living Room",
  "Yard",
  "Other",
];

const PROPERTY_TYPES = ["Apartment", "House", "Villa", "Office"];

const STYLES: { name: string; image: string }[] = [
  {
    name: "Contemporary Chic",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80",
  },
  {
    name: "Scandinavian",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80",
  },
  {
    name: "Minimalist",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80",
  },
  {
    name: "Industrial",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&q=80",
  },
];

const TEAM_MEMBERS = [
  { initial: "E", color: "bg-pink-500" },
  { initial: "D", color: "bg-gray-500" },
];

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject } = useProjects();
  const [step, setStep] = useState<Step>(1);
  const [scanMethod, setScanMethod] = useState<ScanMethod>("new");
  const [matterportUrl, setMatterportUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [selectedStyle, setSelectedStyle] = useState("Contemporary Chic");
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  function toggleRoom(room: string) {
    if (room === "All") {
      setSelectedRooms((prev) =>
        prev.length === ROOMS.length - 1 ? [] : ROOMS.slice(1)
      );
      return;
    }
    setSelectedRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  }

  const client = `${firstName} ${lastName}`.trim();
  const canCreate = client.length > 0 && address.trim().length > 0;

  function handleCreate() {
    if (!canCreate) return;
    const cover =
      STYLES.find((s) => s.name === selectedStyle)?.image ?? STYLES[0].image;
    const created = addProject({
      client,
      propertyType: propertyType as "Apartment" | "House" | "Villa" | "Office",
      address: address.trim(),
      rooms: selectedRooms,
      surface: 0,
      style: selectedStyle as StagingStyle,
      // A requested new scan is pending; an imported Matterport link is mid-scan.
      status: scanMethod === "matterport" ? "scanning" : "pending",
      matterportLink: scanMethod === "matterport" ? matterportUrl.trim() : "",
      image: cover,
      assignees: TEAM_MEMBERS.map((m) => ({
        initial: m.initial,
        color: m.color,
      })),
    });
    router.push(`/projects/${created.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl bg-white shadow-panel">
        {/* Header */}
        <div className="flex items-center gap-3 bg-ink px-6 py-4">
          <Home className="h-5 w-5 text-white" />
          <h2 className="text-base font-bold text-white">New virtual visit</h2>
          <button
            type="button"
            onClick={() => router.push("/projects")}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step 1 — Scan method */}
        {step === 1 && (
          <div className="p-6">
            <p className="mb-1 text-sm font-bold text-ink">Scan method:</p>
            <p className="mb-4 text-xs text-muted">
              Start by adding an existing 3D scan or let us automatically scan
              your home.
            </p>

            <div className="space-y-3">
              {[
                {
                  key: "new" as ScanMethod,
                  icon: ScanLine,
                  title: "New Scan",
                  desc: "Enter the client address, and we'll handle the scanning",
                },
                {
                  key: "matterport" as ScanMethod,
                  icon: Link2,
                  title: "Add Existing Matterport Scan",
                  desc: "Already have a Matterport scan? Paste your link below to use it instantly.",
                },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setScanMethod(opt.key)}
                  className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors ${
                    scanMethod === opt.key
                      ? "border-ink bg-field"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/10">
                    <opt.icon className="h-5 w-5 text-ink" />
                  </span>
                  <div>
                    <p className="font-bold text-ink">{opt.title}</p>
                    <p className="text-xs text-muted">{opt.desc}</p>
                  </div>
                  {scanMethod === opt.key && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>

            {scanMethod === "matterport" && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-ink">
                  Matterport Scan URL
                </p>
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  <input
                    type="url"
                    className="field border border-gray-200 pl-11"
                    placeholder="https://my.matterport.com/show/?m=..."
                    value={matterportUrl}
                    onChange={(e) => setMatterportUrl(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-blue"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Client details */}
        {step === 2 && (
          <div className="p-6">
            <p className="mb-4 text-sm font-bold text-ink">Client name</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { placeholder: "First name", value: firstName, set: setFirstName },
                { placeholder: "Last name", value: lastName, set: setLastName },
              ].map((f) => (
                <div key={f.placeholder} className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  <input
                    className="field border border-gray-200 pl-11"
                    placeholder={f.placeholder}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                  />
                </div>
              ))}
            </div>

            {[
              { label: "Phone number", icon: Phone, type: "tel", placeholder: "Phone number", value: phone, set: setPhone },
              { label: "Email address", icon: Mail, type: "email", placeholder: "Email Address", value: email, set: setEmail },
              { label: "Client address", icon: MapPin, type: "text", placeholder: "Address", value: address, set: setAddress },
            ].map((f) => (
              <div key={f.label}>
                <p className="mb-2 mt-4 text-sm font-bold text-ink">{f.label}</p>
                <div className="relative">
                  <f.icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  <input
                    type={f.type}
                    className="field border border-gray-200 pl-11"
                    placeholder={f.placeholder}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                  />
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="btn-white">
                Previous
              </button>
              <button type="button" onClick={() => setStep(3)} className="btn-blue">
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Property + Rooms + Members */}
        {step === 3 && (
          <div className="p-6">
            <p className="mb-1 text-sm font-bold text-ink">Type:</p>
            <p className="mb-2 text-xs text-muted">Select the property type:</p>
            <select
              className="field border border-gray-200"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <div className="my-4 h-px bg-gray-100" />

            <p className="mb-1 text-sm font-bold text-ink">Staging style:</p>
            <p className="mb-3 text-xs text-muted">
              Choose the interior style for this home staging
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STYLES.map((s) => {
                const active = selectedStyle === s.name;
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedStyle(s.name)}
                    className={`relative overflow-hidden rounded-xl border-2 text-left transition-all ${
                      active
                        ? "border-accent shadow-md"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                      {active && (
                        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                          <Check className="h-3 w-3 text-white" />
                        </span>
                      )}
                    </div>
                    <p
                      className={`px-2 py-1.5 text-xs font-semibold ${
                        active ? "text-accent" : "text-ink"
                      }`}
                    >
                      {s.name}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="my-4 h-px bg-gray-100" />

            <p className="mb-1 text-sm font-bold text-ink">Rooms:</p>
            <p className="mb-3 text-xs text-muted">
              Select the rooms that will be scanned
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {ROOMS.map((room) => {
                const checked =
                  room === "All"
                    ? selectedRooms.length === ROOMS.length - 1
                    : selectedRooms.includes(room);
                return (
                  <label
                    key={room}
                    className="flex cursor-pointer items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleRoom(room)}
                      className="h-4 w-4 rounded accent-accent"
                    />
                    <span
                      className={
                        checked ? "font-semibold text-accent" : "text-ink"
                      }
                    >
                      {room}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="my-4 h-px bg-gray-100" />

            <p className="mb-1 text-sm font-bold text-ink">Members</p>
            <p className="mb-3 text-xs text-muted">
              Assign this visit to a team member
            </p>
            <div className="flex items-center gap-2">
              {TEAM_MEMBERS.map((m, i) => (
                <span
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${m.color}`}
                >
                  {m.initial}
                </span>
              ))}
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-muted hover:border-gray-400"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setStep(2)} className="btn-white">
                Previous
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={!canCreate}
                title={
                  canCreate
                    ? undefined
                    : "Add the client name (step 2) and address to create"
                }
                className="btn-blue disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
