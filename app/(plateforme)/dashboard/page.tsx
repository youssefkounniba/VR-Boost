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
import donnees from "@/lib/data/donnees.json";
import BadgeStatut from "@/components/ui/BadgeStatut";
import type { Projet } from "@/lib/types";

const stats = [
  { label: "Active virtual visits", valeur: 12, icone: Video },
  { label: "Approved Visits", valeur: 2, icone: CheckCircle2 },
  { label: "Furniture catalog", valeur: 654, icone: Sofa },
  { label: "Upcoming meetings", valeur: 12, icone: CalendarDays },
];

export default function PageDashboard() {
  const projets = donnees.projets as Projet[];

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Welcome Back !</h1>
      <p className="mt-1 text-sm text-ardoise">
        Let&apos;s make your customers&apos; dream homes a reality, one 3D
        visualization at a time.
      </p>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="carte p-5">
            <div className="flex items-start justify-between">
              <p className="text-sm font-semibold text-ardoise">{s.label}</p>
              <ExternalLink className="h-4 w-4 shrink-0 text-brume" strokeWidth={1.8} />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-champ">
                <s.icone className="h-5 w-5 text-encre" strokeWidth={1.8} />
              </span>
              <span className="text-[2rem] font-extrabold leading-none">
                {s.valeur}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Latest visits */}
      <h2 className="mt-8 text-xl font-extrabold">My latest Visits</h2>
      <div className="mt-4 space-y-3">
        {projets.slice(0, 3).map((p) => (
          <Link
            key={p.id}
            href={`/projets/${p.id}`}
            className="carte flex items-center gap-4 p-3 transition-shadow hover:shadow-panneau"
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
                  <Play className="ml-0.5 h-4 w-4 text-encre" fill="currentColor" />
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-extrabold">
                {p.client}, {p.typeBien}
              </p>
              <p className="mt-0.5 flex items-center gap-1 truncate text-sm text-ardoise">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {p.adresse}
              </p>
              <p className="mt-0.5 text-xs text-brume">
                {p.pieces.join(", ")}
              </p>
            </div>

            {/* Status badge */}
            <BadgeStatut statut={p.statut} />

            {/* Assignees */}
            <div className="hidden shrink-0 -space-x-2 sm:flex">
              {(p.assignes ?? []).map((av, i) => (
                <span
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white ${av.couleur}`}
                >
                  {av.initiale}
                </span>
              ))}
            </div>

            <MoreHorizontal className="h-5 w-5 shrink-0 text-brume" />
          </Link>
        ))}
      </div>
    </div>
  );
}
