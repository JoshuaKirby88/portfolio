# Agent Instructions (Portfolio Repo)

This repository is a personal portfolio built with **Next.js (App Router)** and deployed to **Cloudflare Workers** using **OpenNext**.

These instructions apply to the entire repo unless a more specific `AGENTS.md` exists in a subdirectory.

## Product Goals

- Keep the site **simple, professional, monochrome**, and intentionally **unstyled** (minimal decoration).
- Prefer clarity and content over effects.

## UI + Styling Rules

- Use **shadcn/ui** components for UI building blocks.
- **Do not** make one-off style tweaks at call sites (e.g. avoid sprinkling random Tailwind classes on each button instance).
- Customize appearance by editing the **underlying component files** (e.g. `components/ui/button.tsx`) so that global style changes happen in one place.
- Keep shadcn component APIs intact; only adjust their internal styling and tokens.
- Prefer theme tokens / design tokens (CSS variables) over hard-coded colors.
- Keep everything monochrome unless/until explicitly requested otherwise.

## Codebase Conventions

- Keep changes small and focused; avoid unrelated refactors.
- Favor server components by default; only use client components when needed.
- When adding new dependencies, justify why; prefer the lightest solution.

## Cloudflare / OpenNext Notes

- Deployment scripts live in `package.json` (`deploy`, `preview`, `upload`).
- Wrangler config is `wrangler.jsonc`; bindings should be added there and type-generated via `pnpm cf-typegen`.

## Always Update This File

If you (the agent) discover:

- a convention that should be followed going forward,
- a project decision (tooling, structure, styling, architecture),
- a recurring command/workflow,
- or anything that would prevent future re-discovery,

then **append or revise this `AGENTS.md`** to capture it.

Keep updates concise and practical. Do not add speculative rules.