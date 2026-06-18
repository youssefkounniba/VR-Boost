<img width="1440" height="808" alt="First page" src="https://github.com/user-attachments/assets/7fd34807-5b09-4d53-8f34-bfe63eace0b7" />
<img width="1440" height="808" alt="second page" src="https://github.com/user-attachments/assets/10a2695b-a9a1-4f08-8e38-752644041a96" />
<img width="1440" height="808" alt="third page" src="https://github.com/user-attachments/assets/7dde21d6-7db2-4b81-b497-64b70e557e9c" />



# Roche Bobois - Virtual Visits SaaS Platform

A highly optimized, glassmorphic SaaS platform MVP tailored for managing 3D virtual visits, staging projects, and virtual meetings. Built with a focus on premium aesthetics and interactive 3D visualizations.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS (`globals.css`) with Custom Glassmorphism System |
| Icons | `lucide-react` |
| 3D Visualization | `three.js`, `@react-three/fiber`, `@react-three/drei` |
| Fonts | Inter (Google Fonts) |

---

## Key Features

1. **Premium Glassmorphic Design**: A sophisticated blue-to-pink gradient background (`#71a1ff` to `#f0cbde`) with frosted glass UI components, delivering a true luxury B2B SaaS feel.
2. **Interactive 3D Room Viewer**: The project details page features a completely interactive 3D room built natively in React. Users can drag, rotate, and explore a simulated 3D interior staging environment complete with dynamic lighting and an interactive transform gizmo.
3. **Optimized Vanilla CSS Architecture**: Removed heavy utility frameworks like Tailwind in favor of a single, highly tuned `globals.css` that provides absolute control over glass effects, shadows, and flexbox layouts.
4. **Clean Project Structure**: Stripped away unnecessary marketing landing pages and unused directories to focus solely on the core platform experience.

---

## Project Structure

```text
vr-boost-agency/
├── app/
│   ├── layout.tsx                  # Root layout — Shell (Header + Sidebar)
│   ├── globals.css                 # Vanilla CSS Glassmorphism Design System
│   ├── page.tsx                    # Auto-redirects to /dashboard
│   ├── Sidebar.tsx                 # Client-side dynamic navigation sidebar
│   ├── dashboard/page.tsx          # Dashboard (KPIs + latest visits)
│   ├── projects/
│   │   ├── page.tsx                # Virtual visits list + search + filters
│   │   ├── new/page.tsx            # New visit wizard + styling selector
│   │   └── detail/
│   │       ├── page.tsx            # Staging detail view
│   │       └── Room3D.tsx          # Interactive React Three Fiber 3D Scene
│   ├── catalog/page.tsx            # Furniture catalog gallery
│   ├── meetings/page.tsx           # Virtual meeting schedule
│   └── team/page.tsx               # Team member management
├── public/                         # Static images and assets
└── next.config.mjs                 # Next.js configuration
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Design System (`globals.css`)

The UI is driven entirely by custom CSS variables and frosted glass utilities:
- **`--bg-gradient`**: The core Roche Bobois gradient background.
- **`--glass-bg`**: White backdrop with 40% opacity.
- **`--glass-border`**: Semi-transparent white border to catch the light.
- **`--glass-shadow`**: Soft, diffuse drop shadow for elevation.
- **Backdrop Filters**: Heavy use of `backdrop-filter: blur(12px)` for the frosted effect.

Reusable layout utilities (`.layout-container`, `.card-panel`, `.btn-primary`, `.style-card`) guarantee consistency across all new features.

---

## Known Limitations & Next Steps

- **Static Frontend MVP**: The current implementation is a static UI shell. There is no active backend, database, or API layer.
- **State Management**: Form inputs (like "Generate Preview") currently do not persist data. A lightweight state manager like Zustand or a real backend integration is needed next.
- **Responsive Design**: The current glassmorphism design is highly optimized for desktop/tablet SaaS usage. Mobile responsiveness could be improved in future iterations.
