import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, Plus, MapPin, Play } from "lucide-react";
import donnees from "@/lib/data/donnees.json";
import type { Projet } from "@/lib/types";

/** Grille des visites virtuelles, fidèle à l'écran "Staging" du prototype. */
export default function PageProjets() {
  const projets = donnees.projets as Projet[];

  return (
    <div>
      {/* Barre de recherche + actions */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative flex-1 basis-64">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brume" />
          <input className="champ-saisie pl-11" placeholder="Rechercher..." />
        </label>
        <button type="button" className="btn-blanc">
          <SlidersHorizontal className="h-4 w-4" />
          Filtrer
        </button>
        <Link href="/projets/nouveau" className="btn-noir">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Nouvelle visite
        </Link>
      </div>

      {/* Grille de projets */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projets.map((p) => (
          <Link key={p.id} href={`/projets/${p.id}`} className="carte group overflow-hidden">
            <div className="relative">
              <Image
                src={p.image}
                alt={`${p.typeBien} — ${p.client}`}
                width={400}
                height={260}
                className="h-44 w-full object-cover"
              />
              <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/60 backdrop-blur transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6 text-encre" fill="currentColor" />
              </span>
            </div>
            <div className="p-4">
              <p className="font-extrabold">{p.client}, {p.typeBien}</p>
              <p className="mt-1 flex items-start gap-1 text-sm text-ardoise">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {p.adresse}
              </p>
              <p className="mt-1.5 text-xs text-brume">{p.pieces.join(", ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
