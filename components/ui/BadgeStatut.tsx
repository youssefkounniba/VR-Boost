import { COULEURS_STATUT, LIBELLES_STATUT, StatutVisite } from "@/lib/types";

export default function BadgeStatut({ statut }: { statut: StatutVisite }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${COULEURS_STATUT[statut]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {LIBELLES_STATUT[statut]}
    </span>
  );
}
