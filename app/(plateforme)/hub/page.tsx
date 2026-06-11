import { CalendarClock, Plus } from "lucide-react";
import donnees from "@/lib/data/donnees.json";

/** Réunions virtuelles Hub & Avatar — onglets À venir / Passées / En direct / Annulées. */
export default function PageHub() {
  const reunions = donnees.reunions;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl bg-white/60 p-1 text-sm font-semibold">
          <span className="rounded-lg bg-white px-4 py-1.5 shadow-carte">À venir</span>
          <span className="px-4 py-1.5 text-ardoise">Passées</span>
          <span className="px-4 py-1.5 text-ardoise">En direct</span>
          <span className="px-4 py-1.5 text-ardoise">Annulées</span>
        </div>
        <button type="button" className="btn-noir">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Nouvelle réunion
        </button>
      </div>

      <div className="carte mt-6 flex items-center gap-3 p-8 text-sm text-brume">
        <CalendarClock className="h-5 w-5" />
        {reunions.length} réunions simulées chargées — liste détaillée à
        développer ensemble (cartes date / bien / invité / actions).
      </div>
    </div>
  );
}
