# rochebobois — Virtual Visits Platform

A mini-MVP for the rochebobois Paris virtual home-staging platform. Allows agents to manage 3D virtual visits, schedule Hub & Avatar meetings, and browse the furniture catalogue — all from a single dashboard.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 — custom design tokens |
| Icons | lucide-react |
| Data | Static JSON (`lib/data/donnees.json`) — no backend |
| Font | Lato (Google Fonts) — weights 300 / 400 / 700 / 900 |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```bash
npm run build   # production build
npm run lint    # ESLint
```

---

## Project Structure

```
vr-boost-agency/
├── app/
│   ├── layout.tsx                  # Root layout — Lato font, metadata
│   ├── globals.css                 # Tailwind base + component classes
│   ├── page.tsx                    # Landing page (/)
│   └── (plateforme)/               # Route group — shared shell (header + sidebar)
│       ├── layout.tsx
│       ├── dashboard/page.tsx      # Dashboard
│       ├── projets/
│       │   ├── page.tsx            # Virtual visits table
│       │   ├── nouveau/page.tsx    # New visit form (3 steps + style picker)
│       │   └── [id]/page.tsx       # Visit detail — 3D tour + Hub & Avatar
│       ├── hub/page.tsx            # Hub & Avatar (avatar → camera → room)
│       ├── catalogue/page.tsx      # Furniture catalogue
│       ├── staging/page.tsx        # Staging editor
│       ├── schedule/page.tsx       # Meeting schedule
│       └── team/page.tsx           # Team management
├── components/
│   ├── layout/
│   │   ├── PlatformeShell.tsx      # Outer shell — header + sidebar + main
│   │   ├── Header.tsx              # Top bar — logo, mail, notifications, user
│   │   └── Sidebar.tsx             # Nav sidebar — desktop inline / mobile drawer
│   └── ui/
│       ├── BadgeStatut.tsx         # Status pill badge
│       └── ManagePlanModal.tsx     # Subscription plans modal
└── lib/
    ├── types.ts                    # TypeScript types + status label/color maps
    └── data/donnees.json           # Seed data — projects & meetings
```

---

## Routes

| Route | Page | Brief mapping |
|---|---|---|
| `/` | Landing page — product overview | **Page 1** |
| `/dashboard` | Dashboard — stats + latest visits | — |
| `/projets` | Virtual visits table (search, status, assignees) | — |
| `/projets/nouveau` | New visit form — 3 steps + staging-style picker | **Page 2** |
| `/projets/[id]` | Visit detail — embedded 3D tour, selected furniture, Share + Join Hub & Avatar | **Page 3** |
| `/hub` | Hub & Avatar — avatar picker → camera setup → virtual room | — |
| `/catalogue` | Furniture catalogue — category grid | — |
| `/staging` | Staging editor — room canvas + furniture panel | — |
| `/schedule` | Meeting schedule — tabs + availability modal | — |
| `/team` | Team management — roles + invite modal | — |

---

## Layout Dimensions (Figma spec)

| Component | Width | Height |
|---|---|---|
| Container | max 1689px | — |
| Header | full width | 100px |
| Sidebar | 224px (`w-56`) | 775px |
| Main content | 1433px (`flex-1`) | 775px |
| Gap (sidebar → main) | 32px (`gap-8`) | — |

Responsive behaviour:

| Breakpoint | Header | Sidebar | Stat cards | Visit avatars |
|---|---|---|---|---|
| `< sm` (< 640px) | auto height | hamburger → drawer | 1 column | hidden |
| `sm` (640px+) | auto height | hamburger → drawer | 2 columns | visible |
| `lg` (1024px+) | 100px fixed | inline 224px | 2 columns | visible |
| `xl` (1280px+) | 100px fixed | inline 224px | 4 columns | visible |

---

## Design System

Design tokens live in `tailwind.config.ts`. Component utilities live in `globals.css`.

### Typography (Lato)

| Level | Size |
|---|---|
| H1 | 32–48px (`text-4xl` / `text-5xl`) |
| H2 | 32px (`text-4xl`) |
| H3 | 20px (`text-xl`) |
| H4 | 18px (`text-lg`) |
| H5 | 16px (`text-base`) |
| H6 | 14px (`text-sm`) |
| H7 | 12px (`text-xs`) |

### Colors

| Token | Value | Usage |
|---|---|---|
| `encre` | `#16181D` | Headings, primary text |
| `ardoise` | `#5C6470` | Secondary text |
| `brume` | `#9AA1AC` | Captions, icons |
| `panneau` | `rgba(255,255,255,0.45)` | Frosted glass panels |
| `carte` | `#FFFFFF` | Cards |
| `champ` | `#F3F5FA` | Inputs, icon backgrounds |
| `action` | `#111111` | Primary black button |
| `accent` | `#2D7FF9` | Blue button, links |
| `accent-doux` | `#E3EEFE` | Blue badge background |

### Background

Full-page gradient, fixed to viewport:
```
120deg — #A9C2F2 → #C0C3F0 → #D9CDEA → #EFD8DC
```

### Buttons

| Class | Variant | Default bg | Hover | Disabled |
|---|---|---|---|---|
| `.btn-noir` | Primary | `#111111` black | `gray-800` | `gray-200` bg, `gray-400` text |
| `.btn-bleu` | Secondary | `#2D7FF9` blue | `blue-600` | `blue-100` bg, `blue-300` text |
| `.btn-blanc` | Tertiary | white + border | `champ` | `gray-300` border, `gray-400` text |
| `.btn-alternative` | Alternative | `white/70` borderless | `white` | `gray-400` text |

All variants support `disabled` pseudo-class and `focus-visible` outline.  
All support an optional leading icon — just place a lucide icon as a child.

### Input Fields

```html
<!-- Default -->
<input class="champ-saisie" placeholder="Search..." />

<!-- Error state -->
<input class="champ-saisie champ-error" />

<!-- Success state -->
<input class="champ-saisie champ-ok" />
```

| Class | Border color | Use case |
|---|---|---|
| `.champ-saisie` | transparent → `accent` on focus | Default |
| `.champ-error` | `red-500` | Validation error |
| `.champ-ok` | `green-500` | Valid input |

### Component Classes

| Class | Description |
|---|---|
| `.panneau` | Frosted glass container — `bg-panneau backdrop-blur-md` |
| `.carte` | White card — `bg-white rounded-carte shadow-carte` |
| `.btn-noir` | Primary black button |
| `.btn-bleu` | Secondary blue button |
| `.btn-blanc` | Tertiary white bordered button |
| `.btn-alternative` | Alternative borderless button |
| `.champ-saisie` | Text input field |
| `.champ-error` | Error state modifier for inputs |
| `.champ-ok` | Success state modifier for inputs |

### Status Badges (`BadgeStatut`)

| Status key | Label | Color |
|---|---|---|
| `non_commence` | Not Started | grey — `bg-champ text-ardoise` |
| `en_attente` | Pending | amber — `bg-amber-50 text-statut-encours` |
| `numerisation` | Scanning | blue — `bg-accent-doux text-statut-scan` |
| `termine` | Completed | green — `bg-green-50 text-statut-termine` |

---

## Navigation (Sidebar)

| Label | Route | Icon | Badge |
|---|---|---|---|
| Dashboard | `/dashboard` | LayoutGrid | — |
| Virtual visits | `/projets` | Video | — |
| Furniture Catalog | `/catalogue` | Armchair | — |
| Staging | `/staging` | Wand2 | — |
| Hub & Avatar | `/hub` | UserRound | — |
| Schedule | `/schedule` | CalendarDays | 3 |
| Team | `/team` | Users | — |

A "Manage your plan" button at the bottom of the sidebar opens the subscription modal (`ManagePlanModal`).

Active item: `bg-gray-800 text-white` (dark pill).  
Below `lg`: collapses into a slide-in drawer with a hamburger toggle in the header.

---

## Data Model

### `Projet`

```ts
{
  id: string
  client: string
  typeBien: "Appartement" | "Maison" | "Villa" | "Plateau de bureaux"
  adresse: string
  pieces: string[]         // e.g. ["Salon", "Chambre", "Cuisine"]
  surface: number          // m²
  style: StyleAmenagement
  statut: StatutVisite
  lienMatterport: string   // simulated URL
  image: string            // Unsplash URL
  creeLe: string           // ISO date
}
```

### `Reunion`

```ts
{
  id: string
  projetId: string
  date: string             // ISO date
  heureDebut: string       // "HH:MM"
  heureFin: string
  invite: {
    nom: string
    email: string
    initiale: string
    couleur: string        // Tailwind bg class
  }
  statut: "a_venir" | "passee" | "en_direct" | "annulee"
}
```

---

## Current State

| Feature | Status |
|---|---|
| Landing page | Done |
| Dashboard — stats + latest visits | Done |
| Virtual visits table | Done |
| New visit form (3 steps + style picker) | Done |
| Visit detail — embedded 3D tour, furniture, Share, Join Hub & Avatar | Done |
| Hub & Avatar flow | Done |
| Furniture catalogue | Done |
| Staging editor | Done |
| Schedule + availability modal | Done |
| Team management + invite modal | Done |
| Subscription plans modal | Done |
| Search & filters | Partial — visit search is live; some filters visual only |
| Authentication | Not implemented (out of scope) |
| Backend / persistence | Not implemented (static JSON) |

---

## Known Limitations

- All data is static (`donnees.json`). Nothing persists between sessions — creating a visit, inviting a member, etc. routes back without saving.
- The 3D viewer embeds a public Matterport demo tour for realism; it is not wired to each project's own scan (no real Matterport integration, per the brief).
- Some filter and tab interactions are visual only; visit search is functional.
- "Share project" copies the page URL to the clipboard (no real share backend).
- Collaborator avatars are mock data attached per project in `donnees.json`.
