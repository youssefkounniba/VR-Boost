import { notFound } from "next/navigation";
import { Share2, Users } from "lucide-react";
import donnees from "@/lib/data/donnees.json";
import BadgeStatut from "@/components/ui/BadgeStatut";
import type { Projet } from "@/lib/types";

/**
 * PAGE 3 du brief — Détail projet / preview + Hub & Avatar.
 * À construire ensemble : zone iframe de visite 3D simulée, style et
 * ambiances sélectionnées, bouton "Partager le projet" et simulation
 * "Rejoindre la visite Hub & Avatar".
 */
export default function PageDetailProjet({ params }: { params: { id: string } }) {
  const projet = (donnees.projets as Projet[]).find((p) => p.id === params.id);
  if (!projet) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">
            {projet.client}, {projet.typeBien}
          </h1>
          <p className="mt-1 text-sm text-ardoise">{projet.adresse}</p>
          <div className="mt-2"><BadgeStatut statut={projet.statut} /></div>
        </div>
        <div className="flex gap-3">
          <button type="button" className="btn-blanc">
            <Share2 className="h-4 w-4" />
            Partager le projet
          </button>
          <button type="button" className="btn-bleu">
            <Users className="h-4 w-4" />
            Rejoindre la visite Hub &amp; Avatar
          </button>
        </div>
      </div>

      {/* Zone visite 3D simulée — iframe / mockup à intégrer ensemble */}
      <div className="carte mt-6 flex aspect-video items-center justify-center text-sm text-brume">
        Visite 3D simulée (iframe Matterport) — à développer.
      </div>
    </div>
  );
}
