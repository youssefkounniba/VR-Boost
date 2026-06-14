# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build (also the only way to type-check the whole project)
npm run start   # serve the production build
npm run lint    # next lint (ESLint)
```

There is no test runner — the project has no tests. Type errors surface via `npm run build` (tsconfig is `strict`, `noEmit`).

## Big Picture

A front-end-only MVP for "rochebobois", a virtual home-staging platform for real-estate agents (3D virtual visits, Hub & Avatar meetings, furniture catalog). **There is no backend.** All data is seeded from `lib/data/data.json` and imported statically; nothing persists. Actions like "create visit", "invite member", or "share" are mocked — they navigate or copy a URL but never write data.

- **Next.js 14 App Router**, TypeScript, Tailwind CSS 3, `lucide-react` icons. No state library, no data fetching layer.
- **Path alias:** `@/*` maps to the repo root (e.g. `@/components/...`, `@/lib/...`).
- **Language:** everything — identifiers, types, JSON keys, and UI copy — is in **English**. (The project was originally part-French; that has been fully converted. If you find any lingering French token or key, treat it as a bug to fix.)

### Layout architecture

Every authenticated page lives under the `app/(platform)/` route group. That group's `layout.tsx` wraps children in `PlatformShell` (`components/layout/`), which renders `Header` + `Sidebar` + `<main>` and owns the mobile sidebar open/close state via `useState`. The landing page `app/page.tsx` is outside the group and has no shell. To add a new in-app page, drop a folder under `app/(platform)/` — it inherits the shell automatically. Add its nav entry in `Sidebar.tsx`.

### Domain model

`lib/types.ts` is the single source of truth for types and status maps — prefer it over the README's tables, which can lag behind. Core entities: `Project` (a virtual visit), `Meeting`, `TeamMember`, `FurnitureCategory`, `FurnitureItem`. The status enum (`VisitStatus`: `not_started | pending | scanning | in_progress | completed`) comes with three parallel `Record` maps — `STATUS_LABELS` (display label), `STATUS_COLORS` (badge bg/text classes), `STATUS_DOT` (dot color). When adding a status, update all three or `StatusBadge` will break.

## Design system

Do **not** hand-roll styling — reuse the design tokens and component classes.

- **Tokens** (colors, radii, shadows, fonts) are defined in `tailwind.config.ts`: `ink` (heading text), `muted`/`faint` (secondary/caption), `field` (input bg), `action` (black btn), `accent` (blue), plus `panel`/`card` radii & shadows. Font is Lato (`font-sans`).
- **Component utility classes** are defined with `@layer components` in `app/globals.css`. Use these instead of re-applying utilities:
  - Containers: `.panel` (frosted panel), `.card` (white card)
  - Buttons: `.btn-black` (primary), `.btn-blue` (secondary), `.btn-white` (bordered), `.btn-alternative`. All include hover/disabled/focus states and accept a leading lucide icon as a child.
  - Inputs: `.field`, with `.field-error` / `.field-ok` state modifiers.
- Status pills go through the `StatusBadge` component, not raw classes.

Interactive pages need `"use client"` (the shell and most pages are client components).
