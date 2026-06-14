"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Plus, UserCircle2, X } from "lucide-react";
import data from "@/lib/data/data.json";
import type { TeamMember } from "@/lib/types";

const ROLES = ["Admin", "Designer", "Sales", "Support"] as const;

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(
    data.team as TeamMember[]
  );
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  function updateRole(id: string, role: TeamMember["role"]) {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role } : m))
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative flex-1 basis-64">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            className="field pl-11"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="button" className="btn-white gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>
        <button
          type="button"
          onClick={() => setShowInvite(true)}
          className="btn-black"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          + Invite
        </button>
      </div>

      {/* Member list */}
      <div className="card mt-5 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-field/30"
            >
              {/* Avatar */}
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${m.color}`}
              >
                {m.initial}
              </span>

              {/* Name + email */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-bold text-ink">{m.name}</p>
                  {m.role === "Admin" && (
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-bold text-purple-600">
                      Admin
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-muted">{m.email}</p>
              </div>

              {/* Joined date */}
              <p className="hidden shrink-0 text-sm text-muted sm:block">
                Joined on {formatDate(m.joinedAt)}
              </p>

              {/* Role dropdown */}
              <div className="relative shrink-0">
                <select
                  value={m.role}
                  onChange={(e) =>
                    updateRole(m.id, e.target.value as TeamMember["role"])
                  }
                  className="appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2 pr-8 text-sm font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted">
                  ▾
                </span>
              </div>

              {/* Profile button */}
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-field"
              >
                <UserCircle2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-panel">
            <div className="flex items-center gap-3 rounded-t-2xl bg-ink px-6 py-4">
              <Plus className="h-5 w-5 text-white" />
              <h2 className="text-base font-bold text-white">
                Invite Team Members
              </h2>
              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  className="field flex-1 border border-gray-200"
                  placeholder="Email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <button type="button" className="btn-black shrink-0">
                  Share
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-field px-4 py-3 text-sm">
                <span className="text-muted">🔗</span>
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Send invitation link
                  </p>
                  <button className="text-xs font-medium text-accent hover:underline">
                    Create link
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold text-ink">
                  Join requests{" "}
                  <span className="ml-1 font-normal text-muted">3</span>
                </p>
                {[
                  {
                    name: "Sophia Martinez",
                    email: "sophia.martinez@example.com",
                    initial: "S",
                    color: "bg-pink-500",
                  },
                  {
                    name: "Emily Johnson",
                    email: "emily.johnson@example.com",
                    initial: "E",
                    color: "bg-cyan-500",
                  },
                  {
                    name: "David Kim",
                    email: "Abduux.ta@gmail.com",
                    initial: "D",
                    color: "bg-gray-500",
                  },
                ].map((req) => (
                  <div
                    key={req.email}
                    className="flex items-center gap-3 py-2.5"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${req.color}`}
                    >
                      {req.initial}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink">
                        {req.name}
                      </p>
                      <p className="text-xs text-muted">{req.email}</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                      Pending request
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
