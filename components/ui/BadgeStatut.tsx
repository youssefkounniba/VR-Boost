import { COULEURS_STATUT, LIBELLES_STATUT, POINT_STATUT, StatutVisite } from "@/lib/types";

export default function BadgeStatut({ statut }: { statut: StatutVisite }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${COULEURS_STATUT[statut]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${POINT_STATUT[statut]}`} aria-hidden />
      {LIBELLES_STATUT[statut]}
    </span>
  );
}
