<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Neal Bliki: 100 Websites in 30 Days

React + Vite site for Neal Frazier's public build log, knowledge wiki, offers, and contact pages.

## Stack

- React 19
- Vite 6
- TypeScript
- React Router
- Tailwind CSS 4
- Netlify deploy target

## Routes

- `/` Dashboard
- `/wiki` Wiki index
- `/wiki/:id` Wiki node
- `/blog` Blog index
- `/blog/:id` Blog post
- `/offerings` Services/offers
- `/contact` Contact page

## Local Development

Prerequisites:

- Node.js 20+
- npm 10+

Install and run:

```bash
npm install
npm run dev
```

Default dev server: `http://localhost:3000`

## Build and Preview

```bash
npm run build
npm run preview
```

## Useful Scripts

- `npm run lint` TypeScript type-check (`tsc --noEmit`)
- `npm run clean` Remove `dist/`
- `npm run prerender:manifest` Generate route metadata manifest
- `npm run images:generate` Generate placeholder textures (Python)
- `npm run images:optimize` Optimize images with ffmpeg

## Deployment

Netlify config is in `netlify.toml`.

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect configured: `/* -> /index.html`
- Canonical domain redirect configured to `100websitesin30days.nealfrazier.tech`
