export type StatutVisite =
  | "non_commence"
  | "en_attente"
  | "numerisation"
  | "termine";

export type StyleAmenagement =
  | "Contemporain chic"
  | "Scandinave"
  | "Minimaliste"
  | "Industriel"
  | "Bohème";

export interface Projet {
  id: string;
  client: string;
  typeBien: "Appartement" | "Maison" | "Villa" | "Plateau de bureaux";
  adresse: string;
  pieces: string[]; // ex. ["Salon", "Chambre", "Cuisine"]
  surface: number; // m²
  style: StyleAmenagement;
  statut: StatutVisite;
  lienMatterport: string; // lien simulé
  image: string;
  creeLe: string; // ISO date
}

export interface Reunion {
  id: string;
  projetId: string;
  date: string; // ISO date
  heureDebut: string;
  heureFin: string;
  invite: { nom: string; email: string; initiale: string; couleur: string };
  statut: "a_venir" | "passee" | "en_direct" | "annulee";
}

export const LIBELLES_STATUT: Record<StatutVisite, string> = {
  non_commence: "Not Started",
  en_attente: "Pending",
  numerisation: "Scanning",
  termine: "Completed",
};

export const COULEURS_STATUT: Record<StatutVisite, string> = {
  non_commence: "bg-champ text-ardoise",
  en_attente: "bg-amber-50 text-statut-encours",
  numerisation: "bg-accent-doux text-statut-scan",
  termine: "bg-green-50 text-statut-termine",
};
