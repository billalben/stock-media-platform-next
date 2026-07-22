<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Setup

- **Package manager**: `pnpm` (not npm/yarn). The lockfile is `pnpm-lock.yaml`.
- **Env**: Copy `.env.local.example` to `.env.local` and set `PEXELS_API_KEY` (the app won't work without it).

## Commands

| Command | Does |
|---------|------|
| `pnpm dev` | Start dev server (localhost:3000) |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint (`eslint .`) |

There is no test suite, typecheck script, or formatter configured.

## Architecture

- **Next.js 16 App Router** with React 19, TypeScript strict mode, Tailwind CSS v4.
- Path alias: `@/*` → project root (`./*`).
- `lib/pexels.ts` — server-side Pexels API client. Server components import and call these directly (they run on the server).
- `app/api/*/route.ts` — client-side proxy routes. Client components fetch these instead of calling Pexels directly.
- `app/(detail)/` — route group (parens don't affect URL). Its `layout.tsx` wraps detail pages with `data-detail-page=""`, which via CSS removes the sidebar margin on XL screens. The Header component detects detail paths via regex and renders `null`.
- `stock-media-platform-main/` — legacy reference. Excluded from lint and git. Do not modify.

## Styling (Tailwind CSS v4)

- No `tailwind.config.*` file. All theme tokens are defined in `globals.css` via `@theme inline { … }`.
- **Important**: The `@theme inline` block maps CSS custom properties (e.g. `--color-primary: var(--_primary)`) to Tailwind utilities, so classes like `bg-primary`, `text-on-surface`, `border-outline-variant` work.
- Custom utility classes (`.icon-btn`, `.card`, `.btn-primary`, `.banner-card`, etc.) are defined with `@layer components { … }` in `globals.css`.
- Dark mode uses `data-theme="dark"` attribute (not Tailwind's `dark:` variant). Three themes exist: `.primary`, `.secondary`, `.tertiary` for banner cards.

## Conventions

- Server components fetch data at the top level via `lib/pexels.ts` (look at `app/page.tsx` for the pattern: call API in an inner async function, handle errors in the parent).
- Client components must start with `"use client"` and interact with `app/api/` routes for data fetching.
- Client state (favorites, search history) is persisted in `localStorage`/`sessionStorage` via custom hooks in `hooks/`.
- Theme is managed by `context/ThemeProvider.tsx` — reads sessionStorage + system preference, applies `data-theme` attribute.
- Icons come from `lucide-react`.
- Images use `next/image` (remote patterns configured for `images.pexels.com` and `*.pexels.com`).
- API route params are `Promise<{ id: string }>` (Next.js 16 convention — must `await params`).
