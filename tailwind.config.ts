import type { Config } from "tailwindcss";

/**
 * Tokens extraits du prototype Figma (thème clair, dégradé bleu-lavande,
 * panneaux translucides, boutons noirs en pilule, accent bleu).
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Texte
        encre: "#16181D", // titres / texte principal
        ardoise: "#5C6470", // texte secondaire
        brume: "#9AA1AC", // labels discrets

        // Surfaces
        panneau: "rgba(255,255,255,0.45)", // grands conteneurs translucides
        carte: "#FFFFFF", // cartes
        champ: "#F3F5FA", // inputs / lignes de tableau

        // Actions
        action: "#111111", // bouton principal noir (pilule)
        accent: {
          DEFAULT: "#2D7FF9", // bleu (Rejoindre, liens)
          doux: "#E3EEFE",
        },

        // Statuts (badges du prototype)
        statut: {
          attente: "#6B7280", // Non commencé
          encours: "#F59E0B", // En attente
          scan: "#3B82F6", // Numérisation
          termine: "#22C55E", // Terminé
          annule: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        panneau: "1.5rem", // 24px — grands conteneurs
        carte: "1rem", // 16px — cartes
      },
      boxShadow: {
        carte: "0 2px 12px rgba(22, 24, 29, 0.06)",
        panneau: "0 8px 40px rgba(22, 24, 29, 0.08)",
      },
      backgroundImage: {
        scene: "none",
      },
      backgroundColor: {
        app: "#DEDEDE",
        content: "#EBEBEB",
      },
    },
  },
  plugins: [],
};

export default config;
