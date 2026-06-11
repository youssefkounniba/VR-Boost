"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, MapPin, X } from "lucide-react";
import donnees from "@/lib/data/donnees.json";
import type { Reunion } from "@/lib/types";

type Tab = "a_venir" | "passee" | "en_direct" | "annulee";

const TABS: { key: Tab; label: string }[] = [
  { key: "a_venir", label: "Upcoming" },
  { key: "passee", label: "Past" },
  { key: "en_direct", label: "Live" },
  { key: "annulee", label: "Canceled" },
];

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

function formatDateLabel(isoDate: string) {
  const d = new Date(isoDate);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (sameDay(d, today)) return `Today  ${MONTHS[d.getMonth()]} ${d.getDate()},${d.getFullYear()}`;
  if (sameDay(d, tomorrow)) return `Tomorrow  ${MONTHS[d.getMonth()]} ${d.getDate()},${d.getFullYear()}`;
  return `${MONTHS[d.getMonth()]} ${d.getDate()},${d.getFullYear()}`;
}

function groupByDate(reunions: Reunion[]) {
  const groups: Record<string, Reunion[]> = {};
  for (const r of reunions) {
    if (!groups[r.date]) groups[r.date] = [];
    groups[r.date].push(r);
  }
  return groups;
}

type AvailabilityDay = {
  day: string;
  enabled: boolean;
  from: string;
  to: string;
};

const defaultAvailability: AvailabilityDay[] = [
  { day: "Monday", enabled: true, from: "09:00 AM", to: "05:00 PM" },
  { day: "Tuesday", enabled: true, from: "09:00 AM", to: "05:00 PM" },
  { day: "Wednesday", enabled: true, from: "09:00 AM", to: "05:00 PM" },
  { day: "Thursday", enabled: false, from: "09:00 AM", to: "05:00 PM" },
  { day: "Friday", enabled: true, from: "09:00 AM", to: "05:00 PM" },
  { day: "Saturday", enabled: false, from: "09:00 AM", to: "05:00 PM" },
  { day: "Sunday", enabled: false, from: "09:00 AM", to: "05:00 PM" },
];

export default function PageSchedule() {
  const [tab, setTab] = useState<Tab>("a_venir");
  const [showAvailability, setShowAvailability] = useState(false);
  const [availability, setAvailability] = useState(defaultAvailability);

  const reunions = donnees.reunions as Reunion[];
  const filtered = reunions.filter((r) => r.statut === tab);
  const groups = groupByDate(filtered);
  const sortedDates = Object.keys(groups).sort();

  function toggleDay(index: number) {
    setAvailability((prev) =>
      prev.map((d, i) => (i === index ? { ...d, enabled: !d.enabled } : d))
    );
  }

  return (
    <div>
      {/* Tabs + Availability */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-xl bg-white p-1 text-sm font-semibold shadow-carte">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-lg px-4 py-1.5 transition-colors ${
                tab === t.key
                  ? "bg-champ text-encre shadow-sm"
                  : "text-ardoise hover:text-encre"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowAvailability(true)}
          className="btn-noir gap-2"
        >
          <Clock className="h-4 w-4" />
          Availability
        </button>
      </div>

      {/* Meeting groups */}
      <div className="mt-5 space-y-6">
        {sortedDates.length === 0 && (
          <div className="carte p-10 text-center text-sm text-brume">
            No meetings in this category.
          </div>
        )}

        {sortedDates.map((date) => (
          <div key={date}>
            <p className="mb-3 text-sm font-bold text-ardoise">
              {formatDateLabel(date).split("  ")[0]}{" "}
              <span className="font-normal">
                {formatDateLabel(date).split("  ")[1]}
              </span>
            </p>
            <div className="space-y-3">
              {groups[date].map((r) => (
                <MeetingCard key={r.id} reunion={r} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Availability modal */}
      {showAvailability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-panneau">
            <div className="flex items-center gap-3 rounded-t-2xl bg-encre px-6 py-4">
              <Clock className="h-5 w-5 text-white" />
              <h2 className="text-base font-bold text-white">
                Adjust working hours
              </h2>
              <button
                type="button"
                onClick={() => setShowAvailability(false)}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {availability.map((item, i) => (
                <div key={item.day} className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => toggleDay(i)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      item.enabled ? "bg-encre" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        item.enabled ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                  <span className="w-24 text-sm font-semibold text-encre">
                    {item.day}
                  </span>
                  {item.enabled ? (
                    <div className="flex flex-1 items-center gap-2">
                      <span className="flex-1 rounded-xl border border-gray-200 px-3 py-1.5 text-center text-sm">
                        from {item.from}
                      </span>
                      <span className="text-ardoise">-</span>
                      <span className="flex-1 rounded-xl border border-gray-200 px-3 py-1.5 text-center text-sm">
                        to {item.to}
                      </span>
                    </div>
                  ) : (
                    <span className="flex-1 rounded-xl bg-champ px-3 py-1.5 text-center text-sm text-brume">
                      Not available
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <button
                type="button"
                onClick={() => setShowAvailability(false)}
                className="btn-noir w-full"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MeetingCard({ reunion }: { reunion: Reunion }) {
  const d = new Date(reunion.date);
  const month = MONTHS[d.getMonth()];
  const day = d.getDate();

  return (
    <div className="carte flex flex-wrap items-center gap-4 p-4">
      {/* Date */}
      <div className="flex w-16 shrink-0 flex-col items-center">
        <p className="text-xs font-semibold uppercase text-ardoise">{month}</p>
        <p className="text-3xl font-extrabold leading-none text-encre">{day}</p>
        <p className="mt-1 text-xs text-ardoise">
          {reunion.heureDebut} - {reunion.heureFin}
        </p>
      </div>

      {/* Thumbnail */}
      {reunion.image && (
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={reunion.image}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80">
              <svg className="h-3 w-3 text-encre" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 3l7 5-7 5V3z" />
              </svg>
            </span>
          </span>
        </div>
      )}

      {/* Property info */}
      <div className="min-w-0 flex-1">
        <p className="font-bold text-encre">
          {reunion.invite.nom}, {reunion.typeBien}
        </p>
        {reunion.adresse && (
          <p className="mt-0.5 flex items-center gap-1 text-xs text-ardoise">
            <MapPin className="h-3 w-3 shrink-0" />
            {reunion.adresse}
          </p>
        )}
        {reunion.pieces && (
          <p className="mt-0.5 text-xs text-brume">
            {reunion.pieces.join(", ")}
          </p>
        )}
      </div>

      {/* Invite */}
      <div className="hidden shrink-0 items-center gap-3 sm:flex">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${reunion.invite.couleur}`}
        >
          {reunion.invite.initiale}
        </span>
        <div>
          <p className="text-sm font-semibold text-encre">
            {reunion.invite.nom}
          </p>
          <p className="text-xs text-ardoise">{reunion.invite.email}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-wrap gap-2">
        <button
          type="button"
          className="rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-encre transition-colors hover:bg-champ"
        >
          Reschedule
        </button>
        <button type="button" className="btn-noir text-xs">
          Join meeting
        </button>
      </div>
    </div>
  );
}
