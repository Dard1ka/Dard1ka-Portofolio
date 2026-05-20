# Dardika — Portfolio

Premium, cinematic personal portfolio for **Dardika / Dard1ka** — AI Engineer, Full-Stack Developer, Creative Technologist.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Deploy-ready for Vercel.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production server

## Project structure

```
app/                # Next.js App Router (layout, page, globals)
components/         # UI components (Hero, Projects, ProjectShowcase, ...)
data/projects.ts    # Typed project data — edit here to add projects
public/             # Static assets (portrait, project images, demo video)
```

To add or edit projects, modify [`data/projects.ts`](data/projects.ts).

## Deploy

Push the repo to GitHub and import it on [Vercel](https://vercel.com). No additional configuration required.
