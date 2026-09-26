# Joshua Kirby - Portfolio

Personal portfolio showcasing AI/ML projects. Built with Next.js and deployed as a static site on Cloudflare Workers.

## Tech Stack

- Next.js + React + TypeScript
- Tailwind CSS + shadcn/ui
- Cloudflare Workers Static Assets

## Features

- **100% SSG** - All pages pre-rendered at build time
- **Markdown case studies** - Custom React components embedded in markdown

## Development

```bash
pnpm install
pnpm dev
```

Run all checks:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
pnpm deploy:dry-run
```

Deploy the static export with `pnpm deploy`.
