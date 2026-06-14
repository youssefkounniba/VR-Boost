import type { Config } from "tailwindcss";

/**
 * Design tokens from the Figma prototype (light theme, frosted panels,
 * black pill buttons, blue accent).
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Text
        ink: "#16181D", // headings / primary text
        muted: "#5C6470", // secondary text
        faint: "#9AA1AC", // subtle labels

        // Surfaces
        panel: "rgba(255,255,255,0.45)", // large translucent containers
        card: "#FFFFFF", // cards
        field: "#F3F5FA", // inputs / table rows

        // Actions
        action: "#111111", // primary black button (pill)
        accent: {
          DEFAULT: "#2D7FF9", // blue (join, links)
          soft: "#E3EEFE",
        },

        // Status (badges)
        status: {
          pending: "#6B7280", // Not Started
          progress: "#F59E0B", // Pending
          scan: "#3B82F6", // Scanning
          done: "#22C55E", // Completed
          canceled: "#EF4444",
        },

        // Landing page — brand palette (vrboostagency.com).
        // Scoped under `landing` so it never collides with the platform tokens.
        landing: {
          // Light theme (white site)
          paper: "#FFFFFF", // page background
          mist: "#F4F6FB", // alternating section background
          cloud: "#EEF2FB", // soft tinted panels
          ink: "#0F172A", // headings, primary text
          body: "#475569", // body text
          line: "#E2E8F0", // card borders, dividers
          lineHov: "#CBD5E1", // hover borders
          // Accents
          ctaBlue: "#4361EE", // primary buttons, links
          ctaHover: "#3A56D4", // button hover
          violet: "#7C3AED", // accent highlights
          teal: "#14B8A6", // angular accent
          lime: "#84CC16", // angular accent
          // Dark bands (CTA bands + footer)
          abyss: "#070815",
          deepNavy: "#0C0C20",
          surface: "#13132D",
          blanc: "#FFFFFF",
          clair: "#E2E8F0",
          muted: "#94A3B8",
          dim: "#64748B",
          borderDef: "#1E293B",
          success: "#22C55E",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        display: ["var(--font-lato)", "sans-serif"], // Lato — headings, display
        sans: ["var(--font-roboto)", "sans-serif"], // Roboto — body, labels, buttons
      },
      borderRadius: {
        panel: "1.5rem", // 24px — large containers
        card: "1rem", // 16px — cards
      },
      boxShadow: {
        card: "0 2px 12px rgba(22, 24, 29, 0.06)",
        panel: "0 8px 40px rgba(22, 24, 29, 0.08)",
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
