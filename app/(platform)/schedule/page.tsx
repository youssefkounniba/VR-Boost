"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, MapPin, X } from "lucide-react";
import data from "@/lib/data/data.json";
import type { Meeting } from "@/lib/types";

type Tab = "upcoming" | "past" | "live" | "canceled";

const TABS: { key: Tab; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "live", label: "Live" },
  { key: "canceled", label: "Canceled" },
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

function groupByDate(meetings: Meeting[]) {
  const groups: Record<string, Meeting[]> = {};
  for (const m of meetings) {
    if (!groups[m.date]) groups[m.date] = [];
    groups[m.date].push(m);
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

export default function SchedulePage() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [showAvailability, setShowAvailability] = useState(false);
  const [availability, setAvailability] = useState(defaultAvailability);

  const meetings = data.meetings as Meeting[];
  const filtered = meetings.filter((m) => m.status === tab);
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
        <div className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-white p-1 text-sm font-semibold shadow-card">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 rounded-lg px-3 py-1.5 transition-colors sm:px-4 ${
                tab === t.key
                  ? "bg-field text-ink shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowAvailability(true)}
          className="btn-black gap-2"
        >
          <Clock className="h-4 w-4" />
          Availability
        </button>
      </div>

      {/* Meeting groups */}
      <div className="mt-5 space-y-6">
        {sortedDates.length === 0 && (
          <div className="card p-10 text-center text-sm text-faint">
            No meetings in this category.
          </div>
        )}

        {sortedDates.map((date) => (
          <div key={date}>
            <p className="mb-3 text-sm font-bold text-muted">
              {formatDateLabel(date).split("  ")[0]}{" "}
              <span className="font-normal">
                {formatDateLabel(date).split("  ")[1]}
              </span>
            </p>
            <div className="space-y-3">
              {groups[date].map((m) => (
                <MeetingCard key={m.id} meeting={m} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Availability modal */}
      {showAvailability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-panel">
            <div className="flex items-center gap-3 rounded-t-2xl bg-ink px-4 py-4 sm:px-6">
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
            <div className="space-y-4 p-4 sm:p-6">
              {availability.map((item, i) => (
                <div
                  key={item.day}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2"
                >
                  <button
                    type="button"
                    onClick={() => toggleDay(i)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                      item.enabled ? "bg-ink" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        item.enabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="w-20 text-sm font-semibold text-ink sm:w-24">
                    {item.day}
                  </span>
                  {item.enabled ? (
                    <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-1">
                      <span className="flex-1 rounded-xl border border-gray-200 px-3 py-1.5 text-center text-sm">
                        from {item.from}
                      </span>
                      <span className="text-muted">-</span>
                      <span className="flex-1 rounded-xl border border-gray-200 px-3 py-1.5 text-center text-sm">
                        to {item.to}
                      </span>
                    </div>
                  ) : (
                    <span className="w-full rounded-xl bg-field px-3 py-1.5 text-center text-sm text-faint sm:w-auto sm:flex-1">
                      Not available
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 pb-4 sm:px-6 sm:pb-6">
              <button
                type="button"
                onClick={() => setShowAvailability(false)}
                className="btn-black w-full"
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

function MeetingCard({ meeting }: { meeting: Meeting }) {
  const d = new Date(meeting.date);
  const month = MONTHS[d.getMonth()];
  const day = d.getDate();

  return (
    <div className="card flex flex-wrap items-center gap-3 p-4 sm:gap-4">
      {/* Date */}
      <div className="flex w-14 shrink-0 flex-col items-center sm:w-16">
        <p className="text-xs font-semibold uppercase text-muted">{month}</p>
        <p className="text-2xl font-extrabold leading-none text-ink sm:text-3xl">
          {day}
        </p>
        <p className="mt-1 text-[11px] text-muted sm:text-xs">
          {meeting.startTime} - {meeting.endTime}
        </p>
      </div>

      {/* Thumbnail (hidden on the smallest screens to give the info room) */}
      {meeting.image && (
        <div className="relative hidden h-16 w-20 shrink-0 overflow-hidden rounded-xl sm:block">
          <Image
            src={meeting.image}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80">
              <svg className="h-3 w-3 text-ink" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 3l7 5-7 5V3z" />
              </svg>
            </span>
          </span>
        </div>
      )}

      {/* Property info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-ink">
          {meeting.guest.name}, {meeting.propertyType}
        </p>
        {meeting.address && (
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{meeting.address}</span>
          </p>
        )}
        {meeting.rooms && (
          <p className="mt-0.5 truncate text-xs text-faint">
            {meeting.rooms.join(", ")}
          </p>
        )}
      </div>

      {/* Guest */}
      <div className="hidden shrink-0 items-center gap-3 lg:flex">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${meeting.guest.color}`}
        >
          {meeting.guest.initial}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">
            {meeting.guest.name}
          </p>
          <p className="text-xs text-muted">{meeting.guest.email}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:shrink-0">
        <button
          type="button"
          className="w-full rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-field sm:w-auto"
        >
          Reschedule
        </button>
        <button
          type="button"
          className="btn-black col-span-2 w-full text-xs sm:col-span-1 sm:w-auto"
        >
          Join meeting
        </button>
      </div>
    </div>
  );
}
