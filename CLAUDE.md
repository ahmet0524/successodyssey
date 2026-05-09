
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
- `src/components/` — Reusable Astro components. `blog/` subdirectory has blog-specific components (ContentBox, ContentGrid, StepsList, ComparisonTable, etc.). Root-level `Newsletter.astro` integrates with Mailchimp via a Netlify Function.
- `src/styles/main.scss` — Single stylesheet with CSS custom properties for the design system. Colors: primary `#667EEA`, secondary `#764BA2`, accent `#F59E0B`. Supports `prefers-color-scheme: dark`.
- `netlify/functions/` — Serverless functions. `subscribe.js` handles newsletter signup (Mailchimp API) at `/.netlify/functions/subscribe`.

### Blog post pattern

Every blog post in `src/pages/blog/` follows this structure:

```astro
---
import Layout from "../../layouts/Layout.astro";
import { Image } from 'astro:assets';
import heroImage from "../../assets/your-image.webp";
// import blog components as needed

const datePublished = "YYYY-MM-DDT00:00:00Z";
const dateModified  = "YYYY-MM-DDT00:00:00Z";
const author        = "Success Odyssey Hub";
const pageTitle     = "...";
const pageDescription = "...";   // ~155 chars for meta
const pageKeywords  = "...";
const readingTime   = 10;        // integer minutes, no "min read" suffix
---
<Layout
  type="article"
  title={pageTitle}
  description={pageDescription}
  keywords={pageKeywords}
  image={heroImage}
  datePublished={datePublished}
  dateModified={dateModified}
  author={author}
  canonicalUrl="https://successodysseyhub.com/blog/your-slug"
>
  <!-- Optional: FAQPage JSON-LD or image preload in slot="head" -->
  <article itemscope itemtype="https://schema.org/Article">
    ...
  </article>
</Layout>
```

Note the variable naming convention: `pageTitle`/`pageDescription`/`pageKeywords` (with `page` prefix) are used as local variable names and passed to the `title`/`description`/`keywords` Layout props.

Use semantic HTML5 (`article`, `header`, `time`, `figure`) with microdata attributes throughout. Hero images should use `fetchpriority="high"` and `loading="eager"`; card/body images use `loading="lazy"`.

### Blog components

Available in `src/components/blog/`:

- **ContentBox** — Callout boxes. Props: `type` (`'info' | 'highlight' | 'tip' | 'quote' | 'warning'`), `title`. Use for key takeaways, warnings, or highlighted concepts.
- **ContentGrid** — Multi-column layout. Props: `columns` (2 | 3), `gap` (`'sm' | 'md' | 'lg'`). Wraps ContentBox components side-by-side; collapses to 1-col on mobile.
- **StepsList** — Numbered action steps with gradient badges. Props: `title` (default: "Action Steps").
- **Newsletter** — Inline email signup form (Mailchimp). No props required; embed mid-article for engagement.
- **ComparisonTable**, **ImageWithCaption**, **CodeBlock** — For structured comparisons, captioned images, and code samples respectively.

### Layout.astro props

Key props beyond `title`, `description`, `keywords`, `type`:

| Prop | Usage |
|---|---|
| `canonicalUrl` | Always pass explicitly as the full URL |
| `datePublished` / `dateModified` | ISO timestamp strings (`"YYYY-MM-DDT00:00:00Z"`) |
| `author` | Defaults to `"Success Odyssey Hub"` |
| `image` | Accepts Astro image imports, absolute URLs, or asset paths |
| `wordCount` | Optional integer for article schema |
| `articleSection` | Defaults to `"Personal Development"` |
| `noindex` | Set `true` to exclude from search engines |
| `price`, `currency`, `availability`, `category` | Product pages only |

Extra `<head>` content (FAQPage JSON-LD, preload hints) is injected via `slot="head"`.

### SEO conventions

- Trailing slash policy: **never** (enforced in `astro.config.mjs` and Netlify redirects). Only the homepage uses a trailing slash.
- Canonical URLs are constructed and passed explicitly to `Layout.astro`.
- Every blog page includes `dateModified` — bump this whenever content changes.
- `astro.config.mjs` site is `https://successodysseyhub.com`.
- Sitemap priorities: homepage 1.0 (daily), product pages 0.9 (weekly), blog posts 0.8 (monthly).
- FAQPage JSON-LD is injected via `slot="head"` on most blog posts for rich results.

### Netlify configuration

`netlify.toml` enforces HTTP→HTTPS redirects, sets cache headers (1 hour HTML / 1 day CDN, 1 year immutable for `_assets/`), and configures security headers. Node version is pinned to 18.

### Environment variables

`.env` holds Mailchimp credentials consumed by the Netlify Function:
- `MAILCHIMP_API_KEY`
- `MAILCHIMP_LIST_ID`
- `MAILCHIMP_SERVER_PREFIX` (e.g. `us10`)

These are also set in the Netlify dashboard for production. Subscriptions use `status: "pending"` (double opt-in).
