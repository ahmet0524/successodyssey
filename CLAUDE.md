
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
git -c http.sslVerify=false push origin main   # Push (SSL bypass required)
```

No test suite is configured. TypeScript checking is strict (extends `astro/tsconfigs/strict`).

---

## Architecture

**Success Odyssey Hub** is an Astro 5 static site — a content marketing blog focused on personal development, productivity, and success philosophy. Deployed to Netlify.

### Key directories

- `src/pages/` — All routes. `blog/` contains individual `.astro` blog post files. Top-level files are main pages (index, about, products, contact, etc.).
- `src/layouts/Layout.astro` — Master layout used by older blog posts. Handles all SEO, Schema.org JSON-LD, Open Graph, Twitter Cards, breadcrumbs, Google Tag Manager, and AdSense. Pass `type="article"` for blog posts.
- `src/layouts/BaseLayout.astro` — Used by newer blog posts (Day 97+). Simpler layout with explicit ad placement.
- `src/components/` — Reusable Astro components. `blog/` subdirectory has blog-specific components.
- `src/styles/main.scss` — Single stylesheet with CSS custom properties for the design system.
- `netlify/functions/` — Serverless functions. `subscribe.js` handles newsletter signup (Mailchimp API).

### Blog components (import from `../../components/blog/`)

- **ContentBox** — Callout boxes. Props: `type` (`'info' | 'highlight' | 'tip' | 'quote' | 'warning'`)
- **StepsList** — Numbered action steps with gradient badges. Props: `steps` array of `{title, description}`
- **ContentGrid** — Multi-column layout. Props: `columns` (2 | 3)
- **ComparisonTable**, **ImageWithCaption**, **CodeBlock** — Structured comparisons, captioned images, code

### SEO conventions

- Canonical URLs always passed explicitly as full URL
- Trailing slash policy: **never** (except homepage)
- `astro.config.mjs` site is `https://successodysseyhub.com`
- FAQPage JSON-LD: exactly **3 questions** per post (new posts)

---

## 200-Day Content Plan

### Google AdSense

- **Publisher ID:** `ca-pub-7229511013815291`
- **REKLAM 1** (after ToC): Display — `data-ad-slot="4827765044"` `data-ad-format="auto"` `data-full-width-responsive="true"`
- **REKLAM 2** (middle): In-Article Fluid — `data-ad-slot="2952775705"` `data-ad-layout="in-article"` `data-ad-format="fluid"`
- **REKLAM 3** (before conclusion): Display — `data-ad-slot="4827765044"` `data-ad-format="auto"` `data-full-width-responsive="true"`

### Hero Image Rotation (new posts, `/images/` folder)

| Day % 3 | Image |
|---------|-------|
| 1 | `/images/card1a.jpg` |
| 2 | `/images/card2a.jpg` |
| 0 | `/images/card3a.jpg` |

### New Post Template (Day 97+)

All posts from Day 97 use `BaseLayout` with this exact structure:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ContentBox from '../../components/blog/ContentBox.astro';
import StepsList from '../../components/blog/StepsList.astro';

const title = "...";
const description = "...";
const keywords = "kw1, kw2, ...";  // 12-15 keywords
const publishDate = "YYYY-MM-DD";
const canonicalUrl = "https://successodysseyhub.com/blog/slug";
const imageUrl = "/images/cardXa.jpg";  // Day%3 rotation

const faqSchema = { /* exactly 3 questions */ };
---
<BaseLayout title description keywords canonicalUrl imageUrl>
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
  <article class="blog-post">
    <header>...</header>
    <nav class="table-of-contents">...</nav>
    <!-- REKLAM 1 (display, slot 4827765044) -->
    <section id="...">...</section>
    <!-- REKLAM 2 (fluid in-article, slot 2952775705) -->
    <section id="how-to-apply"><StepsList steps={[...]} /></section>
    <section id="misconceptions"><ContentBox type="warning">...</ContentBox></section>
    <!-- REKLAM 3 (display, slot 4827765044) -->
    <section id="conclusion">...</section>
    <ContentBox type="tip">CTA</ContentBox>
    <section class="author-bio">...</section>
    <section class="related-articles">3 internal links</section>
    <section class="external-resources">2-3 external links</section>
    <section class="book-recommendations">affiliate links</section>
  </article>
</BaseLayout>
```

### Affiliate Links

```
https://amzn.to/atomichabits       → Atomic Habits – James Clear
https://amzn.to/thinkgrowrich      → Think and Grow Rich – Napoleon Hill
https://amzn.to/7habits            → The 7 Habits of Highly Effective People – Stephen Covey
https://amzn.to/charliesalmanack   → Poor Charlie's Almanack – Charlie Munger
https://amzn.to/greatmentalmodels  → The Great Mental Models Vol.1 – Shane Parrish
```

### blog.astro allBlogPosts Array

- **Index 0 = Featured post** (shows "Latest" badge). Always insert newest post at the TOP.
- Old/deleted posts must be removed from the array. Never leave broken links.

---

## Plan Dışı Dosyalar (Original Site Content — NOT Part of the 200-Day Plan)

These files were created before the 200-day plan and are ORIGINAL SITE CONTENT. Do NOT overwrite them, do not assign them day numbers, do not treat them as plan posts. They remain on the site as evergreen content.

| File | Title / Note |
|------|-------------|
| `ai-amplified-mental-models.astro` | AI + Mental Models — original content |
| `assumption-wealth.astro` | Neville Goddard / manifestation — original content |
| `best-productivity-tools-2025.astro` | Tool listicle — original content |
| `dopamine-digital-age.astro` | Neuroscience / dopamine — original content |
| `extreme-mindset-neuroscience.astro` | Neuroscience / obsession — original content |
| `habits-discipline-momentum.astro` | Habits overview — original content |
| `happiness-philosophy.astro` | Earl Nightingale / happiness — original content |
| `mental-models.astro` | Generic mental models overview — original content |
| `mental-models-relationships.astro` | Older duplicate of `mental-models-for-relationships.astro` |
| `overcoming-resistance.astro` | Resilience / Steven Pressfield — original content |
| `rethinking-success.astro` | Philosophy of success — original content |
| `stoicism.astro` | Stoicism overview — original content |
| `success-philosophy.astro` | Success philosophy — original content |
| `synchronicity.astro` | Jung / spiritual psychology — original content |
| `vision-to-reality.astro` | Execution philosophy — original content |

---

## 200-Day Content Schedule

### ✅ Completed Days

| Day | Slug | Status |
|-----|------|--------|
| 1 | `mental-models-for-success` | ✅ |
| 2 | `first-principles-thinking` | ✅ |
| 3 | `inversion-mental-model` | ✅ |
| 4 | `second-order-thinking` | ✅ |
| 5 | `circle-of-competence` | ✅ |
| 6 | `pareto-principle-80-20` | ✅ |
| 7 | `occams-razor-explained` | ✅ |
| 8 | `compounding-mental-model` | ✅ |
| 9 | `opportunity-cost-thinking` | ✅ |
| 10 | `feynman-technique` | ✅ |
| 11 | `regret-minimization` | ✅ |
| 12 | `confirmation-bias` | ✅ |
| 13 | `survivorship-bias` | ✅ |
| 14 | `hanlon-razor` | ✅ |
| 15 | `map-territory` | ✅ |
| 16 | `skin-in-the-game` | ✅ |
| 17 | `eisenhower-matrix` | ✅ |
| 18 | `mental-models-investing` | ✅ |
| 19 | `mental-models-business` | ✅ |
| 20 | `charlie-munger-mental-models` | ✅ |
| 21 | `mental-models-for-relationships` | ✅ |
| 22 | `build-mental-model-library` | ✅ |
| 23 | `psychology-of-success-science` | ✅ |
| 24 | `growth-mindset-vs-fixed` | ✅ |
| 25 | `grit-persistence` | ✅ |
| 26 | `impostor-syndrome` | ✅ |
| 27 | `psychology-of-goals` | ✅ |
| 28 | `mindset-billionaires` | ✅ |
| 29 | `scarcity-vs-abundance` | ✅ |
| 30 | `emotional-intelligence-success` | ✅ |
| 31 | `cognitive-biases-success` | ✅ |
| 32 | `flow-state-productivity` | ✅ |
| 33 | `psychology-procrastination` | ✅ |
| 34 | `locus-of-control` | ✅ |
| 35 | `identity-based-success` | ✅ |
| 36 | `visualization-success` | ✅ |
| 37 | `psychology-money-success` | ✅ |
| 38 | `self-efficacy-success` | ✅ |
| 39 | `psychology-of-success` | ✅ |
| 40 | `psychology-high-achievers` | ✅ |
| 41 | `resilience-psychology` | ✅ |
| 42 | `fear-of-failure-success` | ✅ |
| 43 | `discipline-beats-motivation` | ✅ |
| 44 | `intrinsic-motivation` | ✅ |
| 45 | `self-control-science` | ✅ |
| 46 | `delayed-gratification` | ✅ |
| 47 | `how-successful-people-think` | ✅ |
| 48 | `atomic-habits-summary` | ✅ |
| 49 | `habit-loop-explained` | ✅ |
| 50 | `psychology-habits-change` | ✅ |
| 51 | `morning-routine-successful-people` | ✅ |
| 52 | `deep-work-strategy` | ✅ |
| 53 | `time-blocking-method` | ✅ |
| 54 | `5am-club-habit` | ✅ |
| 55 | `habit-stacking` | ✅ |
| 56 | `keystone-habits` | ✅ |
| 57 | `1-percent-better` | ✅ |
| 58 | `consistency-over-intensity` | ✅ |
| 59 | `energy-management-productivity` | ✅ |
| 60 | `productivity-systems-comparison` | ✅ |
| 61 | `single-tasking-vs-multitasking` | ✅ |
| 62 | `journaling-for-success` | ✅ |
| 63 | `reading-habits-successful` | ✅ |
| 64 | `exercise-mental-performance` | ✅ |
| 65 | `sleep-optimization` | ✅ |
| 66 | `digital-minimalism-productivity` | ✅ |
| 67 | `saying-no-productivity` | ✅ |
| 68 | `90-day-goal-setting` | ✅ |
| 69 | `weekly-review-system` | ✅ |
| 70 | `distraction-free-work` | ✅ |
| 71 | `evening-routine` | ✅ |
| 72 | `batching-tasks` | ✅ |
| 73 | `monthly-review-system` | ✅ |
| 74 | `tracking-progress` | ✅ |
| 75 | `identity-change-habits` | ✅ |
| 76 | `environment-design-habits` | ✅ |
| 77 | `accountability-systems` | ✅ |
| 78 | `decision-fatigue` | ✅ |
| 79 | `decision-making-framework` | ✅ |
| 80 | `reversible-vs-irreversible` | ✅ |
| 81 | `how-billionaires-decide` | ✅ |
| 82 | `10-10-10-rule` | ✅ |
| 83 | `decision-journal` | ✅ |
| 84 | `pre-mortem-technique` | ✅ |
| 85 | `strategic-thinking-skills` | ✅ |
| 86 | `thinking-clearly-uncertainty` | ✅ |
| 87 | `probabilistic-thinking` | ✅ |
| 88 | `psychology-of-success` | ✅ (see Day 39) |
| 89 | `mental-models-for-relationships` | ✅ (see Day 21) |
| 90 | `intuition-vs-analysis` | ✅ |
| 91 | `sunk-cost-fallacy` | ✅ |
| 92 | `bayesian-thinking` | ✅ |
| 93 | — | pending |
| 94 | — | pending |
| 95 | — | pending |
| 96 | — | pending |
| 97 | `avoid-cognitive-biases` | ✅ |
| 98 | — | pending |
| 99 | — | pending |
| 100 | — | pending |
| 101 | `risk-assessment-life` | ✅ |
| 102 | — | pending |
| 103 | `critical-thinking-skills` | ✅ |
| 104 | `thinking-in-bets` | ✅ |
| 105 | `sunk-cost-fallacy` | ✅ (may be Day 91) |
| 106 | `lateral-thinking` | ✅ |
| 107 | `systems-thinking` | ✅ |
| 108 | `devil-advocate-thinking` | ✅ |
| 109 | `steel-man-argument` | ✅ |
| 110 | `long-term-thinking` | ✅ |
| 111 | `bayesian-thinking` | ✅ (may be Day 92) |

### ⏳ Pending Days (Not Yet Created)

| Day | Slug | Image |
|-----|------|-------|
| 112 | `decision-making-under-pressure` | card1a (112%3=1) |
| 113 | *(per plan)* | card2a |
| 114 | *(per plan)* | card3a |
| 115 | *(per plan)* | card1a |
| … | … | … |
| 200 | *(per plan)* | — |

> **Note:** Exact day numbers for Days 93–100 and 102 are uncertain — share the plan document to fill these in precisely.

---

## Netlify Configuration

`netlify.toml` enforces HTTP→HTTPS redirects, 1 year immutable cache for `_assets/`. Node version pinned to 18.

## Environment Variables

`.env` holds Mailchimp credentials:
- `MAILCHIMP_API_KEY`
- `MAILCHIMP_LIST_ID`
- `MAILCHIMP_SERVER_PREFIX`
