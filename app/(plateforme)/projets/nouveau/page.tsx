"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    name: "Contemporain chic",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80",
  },
  {
    name: "Scandinave",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80",
  },
  {
    name: "Minimaliste",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80",
  },
  {
    name: "Industriel",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&q=80",
  },
];

const TEAM_MEMBERS = [
  { initiale: "E", couleur: "bg-pink-500" },
  { initiale: "D", couleur: "bg-gray-500" },
];

export default function PageNouveauProjet() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [scanMethod, setScanMethod] = useState<ScanMethod>("new");
  const [matterportUrl, setMatterportUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [selectedStyle, setSelectedStyle] = useState("Contemporain chic");
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

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl bg-white shadow-panneau">
        {/* Header */}
        <div className="flex items-center gap-3 bg-encre px-6 py-4">
          <Home className="h-5 w-5 text-white" />
          <h2 className="text-base font-bold text-white">New virtual visit</h2>
          <button
            type="button"
            onClick={() => router.push("/projets")}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step 1 — Scan method */}
        {step === 1 && (
          <div className="p-6">
            <p className="mb-1 text-sm font-bold text-encre">Scan method:</p>
            <p className="mb-4 text-xs text-ardoise">
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
                      ? "border-encre bg-champ"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-encre/10">
                    <opt.icon className="h-5 w-5 text-encre" />
                  </span>
                  <div>
                    <p className="font-bold text-encre">{opt.title}</p>
                    <p className="text-xs text-ardoise">{opt.desc}</p>
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
                <p className="mb-2 text-sm font-semibold text-encre">
                  Matterport Scan URL
                </p>
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brume" />
                  <input
                    type="url"
                    className="champ-saisie border border-gray-200 pl-11"
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
                className="btn-bleu"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Client details */}
        {step === 2 && (
          <div className="p-6">
            <p className="mb-4 text-sm font-bold text-encre">Client name</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { placeholder: "First name", value: firstName, set: setFirstName },
                { placeholder: "Last name", value: lastName, set: setLastName },
              ].map((f) => (
                <div key={f.placeholder} className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brume" />
                  <input
                    className="champ-saisie border border-gray-200 pl-11"
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
                <p className="mb-2 mt-4 text-sm font-bold text-encre">{f.label}</p>
                <div className="relative">
                  <f.icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brume" />
                  <input
                    type={f.type}
                    className="champ-saisie border border-gray-200 pl-11"
                    placeholder={f.placeholder}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                  />
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="btn-blanc">
                Previous
              </button>
              <button type="button" onClick={() => setStep(3)} className="btn-bleu">
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Property + Rooms + Members */}
        {step === 3 && (
          <div className="p-6">
            <p className="mb-1 text-sm font-bold text-encre">Type:</p>
            <p className="mb-2 text-xs text-ardoise">Select the property type:</p>
            <select
              className="champ-saisie border border-gray-200"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <div className="my-4 h-px bg-gray-100" />

            <p className="mb-1 text-sm font-bold text-encre">Staging style:</p>
            <p className="mb-3 text-xs text-ardoise">
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
                        active ? "text-accent" : "text-encre"
                      }`}
                    >
                      {s.name}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="my-4 h-px bg-gray-100" />

            <p className="mb-1 text-sm font-bold text-encre">Rooms:</p>
            <p className="mb-3 text-xs text-ardoise">
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
                        checked ? "font-semibold text-accent" : "text-encre"
                      }
                    >
                      {room}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="my-4 h-px bg-gray-100" />

            <p className="mb-1 text-sm font-bold text-encre">Members</p>
            <p className="mb-3 text-xs text-ardoise">
              Assign this visit to a team member
            </p>
            <div className="flex items-center gap-2">
              {TEAM_MEMBERS.map((m, i) => (
                <span
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${m.couleur}`}
                >
                  {m.initiale}
                </span>
              ))}
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-ardoise hover:border-gray-400"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setStep(2)} className="btn-blanc">
                Previous
              </button>
              <button
                type="button"
                onClick={() => router.push("/projets")}
                className="btn-bleu"
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
