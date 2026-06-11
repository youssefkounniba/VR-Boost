"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Plus,
  MapPin,
  MoreHorizontal,
  Edit,
  Archive,
  Trash2,
} from "lucide-react";
import donnees from "@/lib/data/donnees.json";
import type { Projet } from "@/lib/types";
import { LIBELLES_STATUT, COULEURS_STATUT, POINT_STATUT } from "@/lib/types";

export default function PageProjets() {
  const projets = donnees.projets as Projet[];
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = projets.filter(
    (p) =>
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.adresse.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative flex-1 basis-64">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brume" />
          <input
            className="champ-saisie pl-11"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="button" className="btn-blanc gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>
        <Link href="/projets/nouveau" className="btn-noir">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          + New visit
        </Link>
      </div>

      {/* Table */}
      <div className="carte mt-5 overflow-hidden">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="w-10 p-4">
                <input type="checkbox" className="h-4 w-4 rounded" />
              </th>
              <th className="p-4 text-left font-semibold text-ardoise">ID</th>
              <th className="p-4 text-left font-semibold text-ardoise">
                Property
              </th>
              <th className="p-4 text-left font-semibold text-ardoise">
                Status
              </th>
              <th className="p-4 text-left font-semibold text-ardoise">
                Assigned
              </th>
              <th className="w-12 p-4" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b border-gray-50 transition-colors hover:bg-champ/50"
              >
                <td className="p-4">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                </td>
                <td className="p-4 font-semibold text-ardoise">{p.id}</td>
                <td className="p-4">
                  <Link
                    href={`/projets/${p.id}`}
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
                            className="h-3 w-3 text-encre"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M6 3l7 5-7 5V3z" />
                          </svg>
                        </span>
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-encre">
                        {p.client}, {p.typeBien}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-ardoise">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {p.adresse}
                      </p>
                      <p className="mt-0.5 text-xs text-brume">
                        {p.pieces.join(", ")}
                      </p>
                    </div>
                  </Link>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${COULEURS_STATUT[p.statut]}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${POINT_STATUT[p.statut]}`}
                    />
                    {LIBELLES_STATUT[p.statut]}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex -space-x-2">
                    {(p.assignes ?? []).map((av, i) => (
                      <span
                        key={i}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white ${av.couleur}`}
                      >
                        {av.initiale}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="relative p-4">
                  <button
                    type="button"
                    onClick={() =>
                      setMenuOpen(menuOpen === p.id ? null : p.id)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ardoise transition-colors hover:bg-champ"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {menuOpen === p.id && (
                    <div className="absolute right-4 top-full z-20 mt-1 w-40 rounded-xl bg-white py-1 shadow-panneau">
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-encre hover:bg-champ">
                        <Edit className="h-3.5 w-3.5" />
                        Edit details
                      </button>
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-encre hover:bg-champ">
                        <Archive className="h-3.5 w-3.5" />
                        Archive
                      </button>
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
