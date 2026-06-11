"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Share2,
  Video,
  Maximize2,
  Ruler,
  DoorOpen,
  Palette,
  CalendarDays,
  Check,
  Copy,
} from "lucide-react";
import donnees from "@/lib/data/donnees.json";
import BadgeStatut from "@/components/ui/BadgeStatut";
import type { Projet, ArticleMobilier } from "@/lib/types";

/**
 * PAGE 3 du brief — Détail projet / preview + Hub & Avatar.
 * Visite 3D embarquée (Matterport), style + ambiances sélectionnées,
 * bouton "Share" et simulation "Join Hub & Avatar".
 */

// Démo Matterport publique — visite 3D réelle pour un rendu crédible.
const MATTERPORT_DEMO = "https://my.matterport.com/show/?m=SxQL3iGyoDo";

export default function PageDetailProjet({
  params,
}: {
  params: { id: string };
}) {
  const projet = (donnees.projets as Projet[]).find((p) => p.id === params.id);
  const [copied, setCopied] = useState(false);

  if (!projet) notFound();

  // Quelques meubles "sélectionnés" pour ce projet (mock depuis le catalogue).
  const ambiance = (donnees.articles as ArticleMobilier[]).slice(0, 4);

  async function handleShare() {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://vr-boost.app/projets/${params.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard indisponible — on affiche le toast quand même */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  const details = [
    { icone: Ruler, label: "Surface", valeur: `${projet.surface} m²` },
    { icone: Palette, label: "Style", valeur: projet.style },
    { icone: DoorOpen, label: "Rooms", valeur: `${projet.pieces.length} rooms` },
    {
      icone: CalendarDays,
      label: "Created",
      valeur: new Date(projet.creeLe).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    },
  ];

  return (
    <div>
      {/* Back link */}
      <Link
        href="/projets"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ardoise transition-colors hover:text-encre"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to visits
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold">
              {projet.client}, {projet.typeBien}
            </h1>
            <BadgeStatut statut={projet.statut} />
          </div>
          <p className="mt-1 text-sm text-ardoise">{projet.adresse}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleShare} className="btn-blanc">
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
            {copied ? "Link copied" : "Share project"}
          </button>
          <Link href="/hub" className="btn-bleu">
            <Video className="h-4 w-4" />
            Join Hub &amp; Avatar visit
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* 3D viewer */}
        <div className="lg:col-span-2">
          <div className="carte overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-champ">
                  <Maximize2 className="h-3.5 w-3.5 text-encre" />
                </span>
                <p className="text-sm font-bold">3D Virtual Tour</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Live preview
              </span>
            </div>

            <div className="relative aspect-video w-full bg-encre">
              <iframe
                src={MATTERPORT_DEMO}
                title={`3D tour — ${projet.client}`}
                className="absolute inset-0 h-full w-full"
                allow="fullscreen; xr-spatial-tracking"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <p className="px-4 py-2.5 text-xs text-brume">
              Simulated Matterport tour · drag to look around, scroll to zoom.
            </p>
          </div>

          {/* Selected furniture / ambiance */}
          <div className="carte mt-5 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Selected furniture</h2>
              <Link
                href="/catalogue"
                className="text-xs font-semibold text-accent hover:underline"
              >
                Browse catalogue
              </Link>
            </div>
            <p className="mt-0.5 text-xs text-ardoise">
              Pieces staged for the {projet.style} ambiance.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ambiance.map((art) => (
                <div key={art.id} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-champ">
                    <Image
                      src={art.image}
                      alt={art.nom}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 200px"
                    />
                  </div>
                  <p className="mt-2 truncate text-sm font-semibold">
                    {art.nom}
                  </p>
                  <div className="mt-1 flex gap-1">
                    {art.couleurs.map((c) => (
                      <span
                        key={c}
                        className="h-3 w-3 rounded-full border border-black/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar — details + assignees */}
        <div className="space-y-5">
          {/* Cover */}
          <div className="carte overflow-hidden p-0">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={projet.image}
                alt={`${projet.client} — ${projet.typeBien}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>

          {/* Details */}
          <div className="carte p-5">
            <h2 className="text-base font-bold">Project details</h2>
            <dl className="mt-4 space-y-3">
              {details.map((d) => (
                <div key={d.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-champ">
                    <d.icone className="h-4 w-4 text-encre" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-ardoise">{d.label}</dt>
                    <dd className="truncate text-sm font-semibold">
                      {d.valeur}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="my-4 h-px bg-gray-100" />

            <p className="text-xs text-ardoise">Rooms scanned</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {projet.pieces.map((piece) => (
                <span
                  key={piece}
                  className="rounded-full bg-champ px-3 py-1 text-xs font-semibold text-encre"
                >
                  {piece}
                </span>
              ))}
            </div>
          </div>

          {/* Team */}
          {projet.assignes && projet.assignes.length > 0 && (
            <div className="carte p-5">
              <h2 className="text-base font-bold">Assigned team</h2>
              <div className="mt-3 flex -space-x-2">
                {projet.assignes.map((av, i) => (
                  <span
                    key={i}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${av.couleur}`}
                  >
                    {av.initiale}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Matterport link */}
          <div className="carte p-5">
            <h2 className="text-base font-bold">Source scan</h2>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-champ px-3 py-2.5">
              <p className="min-w-0 flex-1 truncate text-xs text-ardoise">
                {projet.lienMatterport}
              </p>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Copy link"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-ardoise transition-colors hover:bg-white hover:text-encre"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-encre px-4 py-2.5 text-sm font-semibold text-white shadow-panneau">
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-green-400" />
            Project link copied to clipboard
          </span>
        </div>
      )}
    </div>
  );
}
