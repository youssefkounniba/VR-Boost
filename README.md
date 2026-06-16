# vr boost agency — Virtual Visits Platform

A mini-MVP for the vr boost agency virtual home-staging platform. Allows agents to manage 3D virtual visits, schedule Hub & Avatar meetings, and browse the furniture catalog — all from a single dashboard.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 — custom design tokens |
| Icons | lucide-react |
| Data | Static JSON seed (`lib/data/data.json`); projects mirrored to `localStorage` via a React context store — no backend |
| Fonts | Lato (display) + Roboto (body) — Google Fonts |

---

## Why This Stack

This is a front-end-only MVP, so the stack was chosen to **prove the experience fast** while leaving a clean path to a real backend later. The choices are deliberate, not defaults:

- **Next.js 14 (App Router)** — one codebase serves both the marketing landing page and the authenticated platform. **Route groups** (`app/(platform)/`) let the in-app pages share a single shell (header + sidebar) while the landing page stays standalone, with no extra routing library. **Server Components by default** keep pages light (only interactive islands opt into `"use client"`), and it's the industry-standard React meta-framework — easy to staff and a direct upgrade path to API routes / server actions when a backend is added.
- **TypeScript (strict)** — compile-time safety at no runtime cost. With no backend and no test suite, the strict type-checker via `npm run build` is the project's main safety net, and `lib/types.ts` is the single source of truth for the domain model.
- **Tailwind CSS 3 + custom design tokens** — build a consistent, on-brand UI quickly without per-component CSS. Tokens and reusable component classes (see the Design System section) keep the look enforced rather than hand-rolled.
- **lucide-react** — lightweight, tree-shakeable SVG icons that match the clean aesthetic, with no icon-font bloat.
- **Static JSON + `localStorage` (no backend)** — the goal is validating the UX, not infrastructure. Seeding from `data.json` and mirroring projects to `localStorage` makes the demo feel real (visits persist across reloads) without standing up a database — and it's trivial to swap the store for a real API later.

**Trade-offs / what production would add:** a real backend + database, authentication, automated tests, and persistence for the actions that are currently mocked (invites, scheduling, sharing). The stack was scoped intentionally for an MVP — see **Known Limitations**.

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
│   ├── layout.tsx                  # Root layout — Lato + Roboto fonts, metadata
│   ├── globals.css                 # Tailwind base + component classes
│   ├── page.tsx                    # Landing page (/)
│   └── (platform)/                 # Route group — shared shell (header + sidebar)
│       ├── layout.tsx
│       ├── dashboard/page.tsx      # Dashboard
│       ├── projects/
│       │   ├── page.tsx            # Virtual visits table (search + filter + delete)
│       │   ├── new/page.tsx        # New visit form (3 steps + style picker) → creates a project
│       │   └── [id]/page.tsx       # Visit detail — 3D tour, Hub & Avatar, edit + delete
│       ├── hub/page.tsx            # Hub & Avatar (avatar → camera → room)
│       ├── catalog/page.tsx        # Furniture catalog
│       ├── staging/page.tsx        # Staging editor + gallery (search + filter)
│       ├── schedule/page.tsx       # Meeting schedule
│       └── team/page.tsx           # Team management
├── components/
│   ├── layout/
│   │   ├── PlatformShell.tsx       # Outer shell — ProjectsProvider + header + sidebar + main + chat
│   │   ├── Header.tsx              # Top bar — logo, mail, notifications, user, Appearance modal
│   │   └── Sidebar.tsx             # Nav sidebar — desktop inline / mobile drawer
│   └── ui/
│       ├── StatusBadge.tsx         # Status pill badge
│       ├── ManagePlanModal.tsx     # Subscription plans modal
│       ├── EditProjectModal.tsx    # Edit a visit's fields (update)
│       ├── ConfirmDialog.tsx       # Reusable confirm popup (used for delete)
│       ├── AppearanceModal.tsx     # Brand logo / colors / font / theme settings
│       └── ChatWidget.tsx          # Floating bottom-right chat widget
└── lib/
    ├── types.ts                    # TypeScript types + status label/color maps
    ├── store/projects-store.tsx    # Client CRUD store (React context + localStorage)
    └── data/data.json              # Seed data — projects, meetings, team, furniture
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Landing page — product overview |
| `/dashboard` | Dashboard — stats + latest visits |
| `/projects` | Virtual visits table — search, status/type filter, edit + delete |
| `/projects/new` | New visit form — 3 steps + staging-style picker; **creates** a project |
| `/projects/[id]` | Visit detail — embedded 3D tour, selected furniture, Share, **Edit**, **Delete** + Join Hub & Avatar |
| `/hub` | Hub & Avatar — avatar picker → camera setup → virtual room |
| `/catalog` | Furniture catalog — category grid |
| `/staging` | Staging editor — gallery (search + filter) + room canvas + furniture panel |
| `/schedule` | Meeting schedule — tabs + availability modal |
| `/team` | Team management — roles + invite modal |

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
| `ink` | `#16181D` | Headings, primary text |
| `muted` | `#5C6470` | Secondary text |
| `faint` | `#9AA1AC` | Captions, icons |
| `panel` | `rgba(255,255,255,0.45)` | Frosted glass panels |
| `card` | `#FFFFFF` | Cards |
| `field` | `#F3F5FA` | Inputs, icon backgrounds |
| `action` | `#111111` | Primary black button |
| `accent` | `#2D7FF9` | Blue button, links |
| `accent-soft` | `#E3EEFE` | Blue badge background |

### Buttons

| Class | Variant | Default bg | Hover | Disabled |
|---|---|---|---|---|
| `.btn-black` | Primary | `#111111` black | `gray-800` | `gray-200` bg, `gray-400` text |
| `.btn-blue` | Secondary | `#2D7FF9` blue | `blue-600` | `blue-100` bg, `blue-300` text |
| `.btn-white` | Tertiary | white + border | `field` | `gray-300` border, `gray-400` text |
| `.btn-alternative` | Alternative | `white/70` borderless | `white` | `gray-400` text |

All variants support `disabled` and `focus-visible` outline, and accept an optional leading lucide icon as a child.

### Input Fields

```html
<!-- Default -->
<input class="field" placeholder="Search..." />

<!-- Error state -->
<input class="field field-error" />

<!-- Success state -->
<input class="field field-ok" />
```

| Class | Border color | Use case |
|---|---|---|
| `.field` | transparent → `accent` on focus | Default |
| `.field-error` | `red-500` | Validation error |
| `.field-ok` | `green-500` | Valid input |

### Component Classes

| Class | Description |
|---|---|
| `.panel` | Frosted glass container — `rounded-panel bg-white shadow-card` |
| `.card` | White card — `rounded-card bg-card shadow-card` |
| `.btn-black` | Primary black button |
| `.btn-blue` | Secondary blue button |
| `.btn-white` | Tertiary white bordered button |
| `.btn-alternative` | Alternative borderless button |
| `.field` | Text input field |
| `.field-error` | Error state modifier for inputs |
| `.field-ok` | Success state modifier for inputs |

### Status Badges (`StatusBadge`)

| Status key | Label | Color |
|---|---|---|
| `not_started` | Not Started | grey — `bg-gray-100 text-gray-500` |
| `pending` | Pending | amber — `bg-amber-50 text-amber-600` |
| `scanning` | Scanning | blue — `bg-blue-50 text-blue-600` |
| `in_progress` | In Progress | purple — `bg-purple-50 text-purple-600` |
| `completed` | Completed | green — `bg-green-50 text-green-600` |

---

## Navigation (Sidebar)

| Label | Route | Icon | Badge |
|---|---|---|---|
| Dashboard | `/dashboard` | LayoutGrid | — |
| Virtual visits | `/projects` | Video | — |
| Furniture Catalog | `/catalog` | Armchair | — |
| Staging | `/staging` | Wand2 | — |
| Hub & Avatar | `/hub` | UserRound | — |
| Schedule | `/schedule` | CalendarDays | 3 |
| Team | `/team` | Users | — |

A "Manage your plan" button at the bottom of the sidebar opens the subscription modal (`ManagePlanModal`).

Active item: `bg-gray-800 text-white` (dark pill). Below `lg`: collapses into a slide-in drawer with a hamburger toggle in the header.

---

## Data Model

### `Project`

```ts
{
  id: string
  client: string
  propertyType: "Apartment" | "House" | "Villa" | "Office"
  address: string
  rooms: string[]              // e.g. ["Living Room", "Bedroom", "Kitchen"]
  surface: number              // m²
  style: StagingStyle          // "Contemporary Chic" | "Scandinavian" | ...
  status: VisitStatus          // "not_started" | "pending" | "scanning" | "in_progress" | "completed"
  matterportLink: string       // simulated URL
  image: string                // Unsplash URL
  createdAt: string            // ISO date
  assignees?: { initial: string; color: string }[]
}
```

### `Meeting`

```ts
{
  id: string
  projectId: string
  date: string                 // ISO date
  startTime: string            // "HH:MM"
  endTime: string
  guest: {
    name: string
    email: string
    initial: string
    color: string              // Tailwind bg class
  }
  status: "upcoming" | "past" | "live" | "canceled"
  propertyType?: string
  address?: string
  rooms?: string[]
}
```

Other entities: `TeamMember`, `FurnitureCategory`, `FurnitureItem` (see `lib/types.ts`).

---

## State Management — Projects CRUD

Since there is no backend, projects are managed by a small client-side store:

- **`lib/store/projects-store.tsx`** — a React context (`ProjectsProvider` + `useProjects()` hook) seeded from `data.json` and mirrored to `localStorage` (`vrboost.projects.v1`).
- `ProjectsProvider` wraps every authenticated page (mounted in `PlatformShell`), so the list, detail, and forms share one source of truth.
- API: `projects`, `addProject`, `updateProject`, `deleteProject`, `getProject`, plus a `ready` flag (true once hydrated from storage).

| Operation | Where | How |
|---|---|---|
| **Create** | `/projects/new` | Wizard maps the form → `addProject(...)`, then redirects to the new visit |
| **Read** | `/projects`, `/projects/[id]` | Read from the store; list supports search + status/type filter |
| **Update** | `/projects/[id]` → Edit | `EditProjectModal` patches fields via `updateProject(id, patch)` |
| **Delete** | list row menu or detail page | `ConfirmDialog` → `deleteProject(id)` (detail page redirects to the list) |

All mutations persist to `localStorage`, so they survive a reload (per-browser).

---

## Current State

| Feature | Status |
|---|---|
| Landing page | Done |
| Dashboard — stats + latest visits | Done |
| Virtual visits table | Done |
| Project CRUD (create / read / update / delete) | Done — via `useProjects` store |
| New visit form (3 steps + style picker) | Done — creates a project |
| Visit detail — 3D tour, furniture, Share, Edit, Delete, Join Hub & Avatar | Done |
| Hub & Avatar flow | Done |
| Furniture catalog | Done |
| Staging editor + gallery | Done |
| Schedule + availability modal | Done |
| Team management + invite modal | Done |
| Subscription plans modal | Done |
| Appearance settings modal | Done — visual mock (not applied to live theme) |
| Floating chat widget | Done — mock conversation |
| Search & filters (projects + staging) | Done — search + status/type filter, mobile-safe |
| Authentication / payment / AI staging | Not implemented (out of scope) |
| Project persistence | Created / edited / deleted visits persist in `localStorage` |
| Backend | Not implemented (static JSON seed, client-side store) |

---

## Known Limitations

- Data is seeded from static JSON (`data.json`). **Projects** are the only entity with real persistence: creating, editing, or deleting a visit is mirrored to `localStorage` (`vrboost.projects.v1`) via the `useProjects` store, so it survives a reload. There is no real backend, so this is per-browser only and clearing storage resets to the seed.
- Other actions (inviting a team member, scheduling a meeting, etc.) are still mock — they navigate or update local state without persisting.
- The 3D viewer embeds a public Matterport demo tour for realism; it is not wired to each project's own scan (no real Matterport integration, per the brief).
- Project & staging search/filters are functional (search + status/type filter); a few remaining tab interactions elsewhere are still visual only.
- The **Appearance** modal (logo, colors, font, theme, domain) is a visual mock — selections are not persisted or applied to the live theme.
- The floating **chat widget** is a mock conversation with a canned auto-reply — no messaging backend.
- "Share project" copies the page URL to the clipboard (no real share backend).
- Collaborator avatars are mock data attached per project in `data.json`.
