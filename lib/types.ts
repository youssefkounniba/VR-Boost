export type StatutVisite =
  | "non_commence"
  | "en_attente"
  | "numerisation"
  | "en_cours"
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
  pieces: string[];
  surface: number;
  style: StyleAmenagement;
  statut: StatutVisite;
  lienMatterport: string;
  image: string;
  creeLe: string;
  assignes?: { initiale: string; couleur: string }[];
}

export interface Reunion {
  id: string;
  projetId: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  invite: { nom: string; email: string; initiale: string; couleur: string };
  statut: "a_venir" | "passee" | "en_direct" | "annulee";
  image?: string;
  typeBien?: string;
  adresse?: string;
  pieces?: string[];
}

export interface MembreEquipe {
  id: string;
  nom: string;
  email: string;
  role: "Admin" | "Designer" | "Sales" | "Support";
  initiale: string;
  couleur: string;
  rejointLe: string;
}

export interface CategorieMobilier {
  id: string;
  nom: string;
  items: number;
  image: string;
}

export interface ArticleMobilier {
  id: string;
  nom: string;
  categorieId: string;
  couleurs: string[];
  image: string;
}

export const LIBELLES_STATUT: Record<StatutVisite, string> = {
  non_commence: "Not Started",
  en_attente: "Pending",
  numerisation: "Scanning",
  en_cours: "In Progress",
  termine: "Completed",
};

export const COULEURS_STATUT: Record<StatutVisite, string> = {
  non_commence: "bg-gray-100 text-gray-500",
  en_attente: "bg-amber-50 text-amber-600",
  numerisation: "bg-blue-50 text-blue-600",
  en_cours: "bg-purple-50 text-purple-600",
  termine: "bg-green-50 text-green-600",
};

export const POINT_STATUT: Record<StatutVisite, string> = {
  non_commence: "bg-gray-400",
  en_attente: "bg-amber-500",
  numerisation: "bg-blue-500",
  en_cours: "bg-purple-500",
  termine: "bg-green-500",
};
