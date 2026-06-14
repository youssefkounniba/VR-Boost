import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Video,
  Sofa,
  CalendarDays,
  MapPin,
  MoreHorizontal,
  ExternalLink,
  Play,
} from "lucide-react";
import data from "@/lib/data/data.json";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Project } from "@/lib/types";

const stats = [
  { label: "Active virtual visits", value: 12, icon: Video },
  { label: "Approved Visits", value: 2, icon: CheckCircle2 },
  { label: "Furniture catalog", value: 654, icon: Sofa },
  { label: "Upcoming meetings", value: 12, icon: CalendarDays },
];

export default function DashboardPage() {
  const projects = data.projects as Project[];

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Welcome Back !</h1>
      <p className="mt-1 text-sm text-muted">
        Let&apos;s make your customers&apos; dream homes a reality, one 3D
        visualization at a time.
      </p>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-start justify-between">
              <p className="text-sm font-semibold text-muted">{s.label}</p>
              <ExternalLink className="h-4 w-4 shrink-0 text-faint" strokeWidth={1.8} />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-field">
                <s.icon className="h-5 w-5 text-ink" strokeWidth={1.8} />
              </span>
              <span className="text-[2rem] font-extrabold leading-none">
                {s.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Latest visits */}
      <h2 className="mt-8 text-xl font-extrabold">My latest Visits</h2>
      <div className="mt-4 space-y-3">
        {projects.slice(0, 3).map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="card flex items-center gap-4 p-3 transition-shadow hover:shadow-panel"
          >
            {/* Thumbnail */}
            <div className="relative h-[70px] w-[88px] shrink-0 overflow-hidden rounded-xl">
              <Image
                src={p.image}
                alt=""
                fill
                className="object-cover"
                sizes="88px"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
                  <Play className="ml-0.5 h-4 w-4 text-ink" fill="currentColor" />
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-extrabold">
                {p.client}, {p.propertyType}
              </p>
              <p className="mt-0.5 flex items-center gap-1 truncate text-sm text-muted">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {p.address}
              </p>
              <p className="mt-0.5 text-xs text-faint">
                {p.rooms.join(", ")}
              </p>
            </div>

            {/* Status badge */}
            <StatusBadge status={p.status} />

            {/* Assignees */}
            <div className="hidden shrink-0 -space-x-2 sm:flex">
              {(p.assignees ?? []).map((av, i) => (
                <span
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white ${av.color}`}
                >
                  {av.initial}
                </span>
              ))}
            </div>

            <MoreHorizontal className="h-5 w-5 shrink-0 text-faint" />
          </Link>
        ))}
      </div>
    </div>
  );
}
