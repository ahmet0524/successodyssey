# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

No test suite is configured. TypeScript checking is strict (extends `astro/tsconfigs/strict`).

## Architecture

**Success Odyssey Hub** is an Astro 5 static site — a content marketing blog focused on personal development, productivity, and success philosophy. Deployed to Netlify.

### Key directories

- `src/pages/` — All routes. `blog/` contains ~102 individual `.astro` blog post files. Top-level files are main pages (index, about, products, contact, etc.).
- `src/layouts/Layout.astro` — Master layout used by nearly every page. Handles all SEO, Schema.org JSON-LD, Open Graph, Twitter Cards, breadcrumbs, Google Tag Manager, and AdSense. Pass `type="article"` for blog posts, `type="product"` for product pages.
- `src/components/` — Reusable Astro components. `blog/` subdirectory has blog-specific components (CodeBlock, ComparisonTable, etc.). `Newsletter.astro` integrates with Mailchimp via a Netlify Function.
- `src/styles/main.scss` — Single stylesheet with CSS custom properties for the design system. Colors: primary `#667EEA`, secondary `#764BA2`, accent `#F59E0B`. Supports `prefers-color-scheme: dark`.
- `netlify/functions/` — Serverless functions. `subscribe.js` handles newsletter signup (Mailchimp API).

### Blog post pattern

Every blog post in `src/pages/blog/` follows this structure:

```astro
---
// Required frontmatter
const datePublished = "YYYY-MM-DD";
const dateModified  = "YYYY-MM-DD";
const author        = "Ahmet Ozlu";
const title         = "...";
const description   = "...";   // ~155 chars for meta
const keywords      = "...";
const readingTime   = "X min read";
---
<Layout type="article" title={title} description={description} ...>
  <article itemscope itemtype="https://schema.org/Article">
    ...
  </article>
</Layout>
```

Use semantic HTML5 (`article`, `header`, `time`, `figure`) with microdata attributes throughout.

### SEO conventions

- Trailing slash policy: **never** (enforced in `astro.config.mjs` and Netlify redirects). Only the homepage uses a trailing slash.
- Canonical URLs are constructed and passed explicitly to `Layout.astro`.
- Every blog page includes `dateModified` — bump this whenever content changes.
- `astro.config.mjs` site is `https://successodysseyhub.com`.

### Netlify configuration

`netlify.toml` enforces HTTP→HTTPS redirects, sets cache headers (1 hour HTML, 1 year assets), and configures security headers. Node version is pinned to 18.

### Environment variables

`.env` holds Mailchimp credentials (`MAILCHIMP_API_KEY`, `LIST_ID`, `SERVER_PREFIX`) consumed by the Netlify Function. These are also set in the Netlify dashboard for production.
